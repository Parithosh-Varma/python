-- Python Master Academy - Supabase/PostgreSQL Schema
-- Run this in the Supabase SQL Editor

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_hours REAL DEFAULT 0,
  completed_lessons INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- LESSONS
-- ============================================
CREATE TABLE topics (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('beginner','intermediate','advanced','software-engineering','specialization')),
  icon TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER DEFAULT 0,
  prerequisites TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER DEFAULT 10,
  estimated_time INTEGER DEFAULT 10,
  prerequisites TEXT[] DEFAULT '{}',
  learning_objectives JSONB DEFAULT '[]',
  theory JSONB DEFAULT '[]',
  quiz JSONB DEFAULT '[]',
  flashcards JSONB DEFAULT '[]',
  common_mistakes JSONB DEFAULT '[]',
  interview_questions JSONB DEFAULT '[]',
  practice_problems JSONB DEFAULT '[]',
  challenge_questions JSONB DEFAULT '[]',
  code_snippets JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_topic ON lessons(topic_id);
CREATE INDEX idx_lessons_difficulty ON lessons(difficulty);
CREATE INDEX idx_lessons_sort ON lessons(topic_id, sort_order);

-- ============================================
-- USER PROGRESS
-- ============================================
CREATE TABLE user_lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score REAL,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_lesson_progress ON user_lesson_progress(user_id);

CREATE TABLE user_quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  answers JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_quiz ON user_quiz_attempts(user_id);

-- ============================================
-- XP & ACTIVITY
-- ============================================
CREATE TABLE xp_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  source_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_xp_user ON xp_transactions(user_id);
CREATE INDEX idx_xp_created ON xp_transactions(created_at);

CREATE TABLE activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('lesson','project','quiz','achievement','streak')),
  description TEXT,
  xp_gained INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_created ON activities(created_at DESC);

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  category TEXT,
  requirements JSONB DEFAULT '[]',
  architecture TEXT,
  steps JSONB DEFAULT '[]',
  hints JSONB DEFAULT '[]',
  solution TEXT,
  stretch_goals JSONB DEFAULT '[]',
  xp_reward INTEGER DEFAULT 50,
  estimated_time INTEGER DEFAULT 60,
  prerequisites TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_project_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, project_id)
);

-- ============================================
-- NOTES
-- ============================================
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled',
  content TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  lesson_id TEXT REFERENCES lessons(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notes_user ON notes(user_id);
CREATE INDEX idx_notes_tags ON notes USING GIN(tags);
CREATE INDEX idx_notes_search ON notes USING GIN(to_tsvector('english', title || ' ' || content));

-- ============================================
-- ACHIEVEMENTS
-- ============================================
CREATE TABLE achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  xp_reward INTEGER DEFAULT 0,
  criteria TEXT
);

CREATE TABLE user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================
-- DAILY STREAKS
-- ============================================
CREATE TABLE study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE INDEX idx_study_sessions_user ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_date ON study_sessions(date);

-- ============================================
-- LEADERBOARD (materialized view for performance)
-- ============================================
CREATE MATERIALIZED VIEW leaderboard_weekly AS
SELECT
  p.id,
  p.name,
  p.avatar_url,
  p.level,
  COALESCE(SUM(x.amount), 0) AS weekly_xp,
  ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(x.amount), 0) DESC) AS rank
FROM profiles p
LEFT JOIN xp_transactions x ON x.user_id = p.id
  AND x.created_at >= NOW() - INTERVAL '7 days'
GROUP BY p.id, p.name, p.avatar_url, p.level
ORDER BY weekly_xp DESC;

CREATE MATERIALIZED VIEW leaderboard_all_time AS
SELECT
  p.id,
  p.name,
  p.avatar_url,
  p.level,
  p.xp AS total_xp,
  ROW_NUMBER() OVER (ORDER BY p.xp DESC) AS rank
FROM profiles p
ORDER BY p.xp DESC;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own progress" ON user_lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_lesson_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_lesson_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own quiz attempts" ON user_quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts" ON user_quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own XP" ON xp_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own XP" ON xp_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own activities" ON activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read own projects" ON user_project_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own projects" ON user_project_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own notes" ON notes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can read own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own study sessions" ON study_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Public read access for reference data
CREATE POLICY "Anyone can read topics" ON topics FOR SELECT USING (TRUE);
CREATE POLICY "Anyone can read lessons" ON lessons FOR SELECT USING (TRUE);
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (TRUE);
CREATE POLICY "Anyone can read achievements" ON achievements FOR SELECT USING (TRUE);

-- Leaderboard views are accessible via the materialized view (no RLS on views)

-- ============================================
-- FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION add_xp(
  p_user_id UUID,
  p_amount INTEGER,
  p_source TEXT,
  p_source_id TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO xp_transactions (user_id, amount, source, source_id)
  VALUES (p_user_id, p_amount, p_source, p_source_id);

  UPDATE profiles
  SET
    xp = xp + p_amount,
    level = GREATEST(1, FLOOR(SQRT((xp + p_amount) / 100)) + 1),
    updated_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION complete_lesson(
  p_user_id UUID,
  p_lesson_id TEXT,
  p_time_spent INTEGER DEFAULT 0
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_lesson_progress (user_id, lesson_id, completed, time_spent, completed_at)
  VALUES (p_user_id, p_lesson_id, TRUE, p_time_spent, NOW())
  ON CONFLICT (user_id, lesson_id)
  DO UPDATE SET completed = TRUE, completed_at = NOW();

  UPDATE profiles
  SET completed_lessons = completed_lessons + 1, updated_at = NOW()
  WHERE id = p_user_id;

  PERFORM add_xp(p_user_id, 10, 'lesson', p_lesson_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_study DATE;
BEGIN
  SELECT MAX(date) INTO last_study
  FROM study_sessions
  WHERE user_id = NEW.user_id AND date != NEW.date;

  UPDATE profiles
  SET
    streak = CASE
      WHEN last_study IS NULL OR last_study = NEW.date - INTERVAL '1 day'
        THEN streak + 1
      WHEN last_study = NEW.date
        THEN streak
      ELSE 1
    END,
    longest_streak = GREATEST(
      longest_streak,
      CASE
        WHEN last_study IS NULL OR last_study = NEW.date - INTERVAL '1 day'
          THEN streak + 1
        ELSE 1
      END
    )
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_study_session_insert
  AFTER INSERT ON study_sessions
  FOR EACH ROW EXECUTE FUNCTION update_streak();

-- ============================================
-- REFRESH LEADERBOARD (scheduled via pg_cron or manual)
-- ============================================
CREATE OR REPLACE FUNCTION refresh_leaderboards()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_weekly;
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_all_time;
END;
$$ LANGUAGE plpgsql;
