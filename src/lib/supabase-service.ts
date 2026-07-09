import { supabase } from "./supabase"
import type { User, UserProgress, Note, Activity, Achievement, Project } from "@/types"

function sb() {
  if (!supabase) return null
  return supabase
}

// ==============================
// PROFILES
// ==============================
export async function getProfile(userId: string): Promise<User | null> {
  const client = sb()
  if (!client) return null
  const { data } = await client.from("profiles").select("*").eq("id", userId).single()
  return data as User | null
}

export async function upsertProfile(profile: Partial<User> & { id: string }): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("profiles").upsert(profile, { onConflict: "id" })
}

export async function updateProfile(userId: string, updates: Partial<User>): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("profiles").update(updates).eq("id", userId)
}

// ==============================
// LESSON PROGRESS
// ==============================
export async function getLessonProgress(userId: string): Promise<string[]> {
  const client = sb()
  if (!client) return []
  const { data } = await client
    .from("user_lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId)
    .eq("completed", true)
  return (data || []).map((r: any) => r.lesson_id)
}

export async function completeLesson(
  userId: string,
  lessonId: string,
  timeSpent = 0
): Promise<void> {
  const client = sb()
  if (!client) return
  const { error } = await client.rpc("complete_lesson", {
    p_user_id: userId,
    p_lesson_id: lessonId,
    p_time_spent: timeSpent,
  })
  if (error) {
    await client.from("user_lesson_progress").upsert(
      { user_id: userId, lesson_id: lessonId, completed: true, completed_at: new Date().toISOString(), time_spent: timeSpent },
      { onConflict: "user_id, lesson_id" }
    )
    await addXp(userId, 10, "lesson", lessonId)
  }
}

// ==============================
// PROJECT PROGRESS
// ==============================
export async function getProjectProgress(userId: string): Promise<string[]> {
  const client = sb()
  if (!client) return []
  const { data } = await client
    .from("user_project_progress")
    .select("project_id")
    .eq("user_id", userId)
    .eq("completed", true)
  return (data || []).map((r: any) => r.project_id)
}

export async function completeProject(userId: string, projectId: string): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("user_project_progress").upsert(
    { user_id: userId, project_id: projectId, completed: true, completed_at: new Date().toISOString() },
    { onConflict: "user_id, project_id" }
  )
  await addXp(userId, 50, "project", projectId)
}

// ==============================
// QUIZ ATTEMPTS
// ==============================
export async function getQuizScores(userId: string): Promise<Record<string, number>> {
  const client = sb()
  if (!client) return {}
  const { data } = await client
    .from("user_quiz_attempts")
    .select("quiz_id, score")
    .eq("user_id", userId)
  const scores: Record<string, number> = {}
  for (const row of data || []) {
    if (!scores[row.quiz_id] || row.score > scores[row.quiz_id]) {
      scores[row.quiz_id] = row.score
    }
  }
  return scores
}

export async function saveQuizAttempt(
  userId: string,
  quizId: string,
  score: number,
  total: number,
  answers: Record<string, string>
): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("user_quiz_attempts").insert({
    user_id: userId,
    quiz_id: quizId,
    score,
    total,
    answers,
  })
}

// ==============================
// XP
// ==============================
export async function addXp(
  userId: string,
  amount: number,
  source: string,
  sourceId?: string
): Promise<void> {
  const client = sb()
  if (!client) return
  const { error } = await client.rpc("add_xp", {
    p_user_id: userId,
    p_amount: amount,
    p_source: source,
    p_source_id: sourceId || null,
  })
  if (error) {
    await client.from("xp_transactions").insert({
      user_id: userId,
      amount,
      source,
      source_id: sourceId,
    })
    const { data: profile } = await client
      .from("profiles")
      .select("xp")
      .eq("id", userId)
      .single()
    const currentXp = (profile as any)?.xp || 0
    await client.from("profiles").update({
      xp: currentXp + amount,
      level: Math.max(1, Math.floor(Math.sqrt((currentXp + amount) / 100)) + 1),
      updated_at: new Date().toISOString(),
    }).eq("id", userId)
  }
}

export async function getTotalXp(userId: string): Promise<number> {
  const client = sb()
  if (!client) return 0
  const { data } = await client
    .from("profiles")
    .select("xp")
    .eq("id", userId)
    .single()
  return (data as any)?.xp || 0
}

// ==============================
// ACTIVITIES
// ==============================
export async function getActivities(userId: string): Promise<Activity[]> {
  const client = sb()
  if (!client) return []
  const { data } = await client
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50)
  return ((data as any[]) || []).map((a) => ({
    id: a.id,
    type: a.type,
    description: a.description || "",
    xp_gained: a.xp_gained || 0,
    timestamp: a.created_at,
  }))
}

export async function addActivity(
  userId: string,
  type: Activity["type"],
  description: string,
  xpGained = 0
): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("activities").insert({
    user_id: userId,
    type,
    description,
    xp_gained: xpGained,
  })
}

// ==============================
// NOTES
// ==============================
export async function getNotes(userId: string): Promise<Note[]> {
  const client = sb()
  if (!client) return []
  const { data } = await client
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
  return ((data as any[]) || []).map((n) => ({
    id: n.id,
    title: n.title,
    content: n.content,
    tags: n.tags || [],
    lesson_id: n.lesson_id,
    created_at: n.created_at,
    updated_at: n.updated_at,
  }))
}

export async function addNote(userId: string, note: Omit<Note, "id"> & { id?: string }): Promise<string> {
  const client = sb()
  if (!client) return note.id || Math.random().toString(36).substring(2)
  const { data } = await client
    .from("notes")
    .insert({
      id: note.id,
      user_id: userId,
      title: note.title,
      content: note.content,
      tags: note.tags,
      lesson_id: note.lesson_id,
    })
    .select("id")
    .single()
  return (data as any)?.id || note.id || ""
}

export async function updateNote(noteId: string, updates: Partial<Note>): Promise<void> {
  const client = sb()
  if (!client) return
  await client
    .from("notes")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", noteId)
}

export async function deleteNote(noteId: string): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("notes").delete().eq("id", noteId)
}

// ==============================
// ACHIEVEMENTS
// ==============================
export async function getAchievements(userId: string): Promise<Achievement[]> {
  const client = sb()
  if (!client) return []
  const { data } = await client
    .from("user_achievements")
    .select("achievement_id, earned_at, achievements(*)")
    .eq("user_id", userId)
  return ((data as any[]) || []).map((r) => ({
    id: r.achievements?.id || r.achievement_id,
    title: r.achievements?.title || "",
    description: r.achievements?.description || "",
    icon: r.achievements?.icon || "award",
    xp_reward: r.achievements?.xp_reward || 0,
    criteria: r.achievements?.criteria || "",
    earned_at: r.earned_at,
  }))
}

// ==============================
// STUDY SESSIONS / STREAK
// ==============================
export async function getStudyStreak(userId: string): Promise<{ streak: number; lastDate: string | null }> {
  const client = sb()
  if (!client) return { streak: 0, lastDate: null }
  const { data: profile } = await client
    .from("profiles")
    .select("streak, updated_at")
    .eq("id", userId)
    .single()
  const p = profile as any
  return { streak: p?.streak || 0, lastDate: p?.updated_at || null }
}

export async function recordStudySession(
  userId: string,
  durationMinutes: number,
  xpEarned: number,
  lessonsCompleted: number
): Promise<void> {
  const client = sb()
  if (!client) return
  await client.from("study_sessions").upsert(
    {
      user_id: userId,
      date: new Date().toISOString().split("T")[0],
      duration_minutes: durationMinutes,
      xp_earned: xpEarned,
      lessons_completed: lessonsCompleted,
    },
    { onConflict: "user_id, date" }
  )
}

// ==============================
// LEADERBOARD
// ==============================
export interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  avatar_url?: string
  level: number
  xp: number
}

export async function getLeaderboard(period: "weekly" | "monthly" | "alltime"): Promise<LeaderboardEntry[]> {
  const client = sb()
  if (!client) return []

  if (period === "weekly") {
    const { data } = await client.from("leaderboard_weekly").select("*").limit(50)
    return ((data as any[]) || []).map((r) => ({
      rank: r.rank,
      id: r.id,
      name: r.name || "Anonymous",
      avatar_url: r.avatar_url,
      level: r.level,
      xp: r.weekly_xp,
    }))
  }

  const { data } = await client.from("leaderboard_all_time").select("*").limit(50)
  return ((data as any[]) || []).map((r) => ({
    rank: r.rank,
    id: r.id,
    name: r.name || "Anonymous",
    avatar_url: r.avatar_url,
    level: r.level,
    xp: period === "alltime" ? r.total_xp : r.xp,
  }))
}

// ==============================
// FULL USER DATA LOAD
// ==============================
export interface UserData {
  user: User | null
  progress: UserProgress | null
  notes: Note[]
  activities: Activity[]
  achievements: Achievement[]
}

export async function loadUserData(userId: string): Promise<UserData> {
  const [profile, completedLessons, completedProjects, quizScores, notes, activities, achievements, streakInfo] =
    await Promise.all([
      getProfile(userId),
      getLessonProgress(userId),
      getProjectProgress(userId),
      getQuizScores(userId),
      getNotes(userId),
      getActivities(userId),
      getAchievements(userId),
      getStudyStreak(userId),
    ])

  return {
    user: profile,
    progress: {
      completed_lessons: completedLessons,
      completed_projects: completedProjects,
      quiz_scores: quizScores,
      xp_history: [],
      study_streak: streakInfo.streak,
      last_study_date: streakInfo.lastDate || new Date().toISOString(),
    },
    notes,
    activities,
    achievements,
  }
}
