export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  xp: number
  level: number
  streak: number
  longest_streak: number
  total_hours: number
  completed_lessons: number
  completed_projects: number
  created_at: string
}

export interface Lesson {
  id: string
  topic_id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  order: number
  xp_reward: number
  estimated_time: number
  prerequisites: string[]
  learning_objectives: string[]
  theory: TheorySection[]
  quiz: QuizQuestion[]
  flashcards: Flashcard[]
  common_mistakes: CommonMistake[]
  interview_questions: InterviewQuestion[]
  practice_problems: PracticeProblem[]
  challenge_questions: ChallengeQuestion[]
  code_snippets: CodeSnippet[]
}

export interface TheorySection {
  id: string
  title: string
  content: string
  code_example?: string
  diagram?: string
}

export interface QuizQuestion {
  id: string
  type: "mcq" | "fill-blank" | "predict-output" | "debug"
  question: string
  code?: string
  options?: string[]
  correct_answer: string
  explanation: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface CommonMistake {
  mistake: string
  correction: string
  explanation: string
}

export interface InterviewQuestion {
  question: string
  answer: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  starter_code?: string
  solution: string
  hint?: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface ChallengeQuestion {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  xp_reward: number
}

export interface CodeSnippet {
  code: string
  language: string
  description?: string
}

export interface Topic {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced" | "software-engineering" | "specialization"
  icon: string
  order: number
  lessons: string[]
  total_lessons: number
  completed_lessons: number
  xp_reward: number
  prerequisites: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  category: string
  requirements: string[]
  architecture: string
  steps: ProjectStep[]
  hints: string[]
  solution: string
  stretch_goals: string[]
  xp_reward: number
  estimated_time: number
  prerequisites: string[]
}

export interface ProjectStep {
  order: number
  title: string
  description: string
  code?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xp_reward: number
  criteria: string
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  lesson_id?: string
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: string
  title: string
  description: string
  criteria: string[]
  issued_at?: string
}

export interface QuizAttempt {
  id: string
  quiz_id: string
  score: number
  total: number
  answers: Record<string, string>
  completed_at: string
}

export interface UserProgress {
  completed_lessons: string[]
  completed_projects: string[]
  quiz_scores: Record<string, number>
  xp_history: XpEntry[]
  study_streak: number
  last_study_date: string
}

export interface XpEntry {
  amount: number
  source: string
  timestamp: string
}

export interface Activity {
  id: string
  type: "lesson" | "project" | "quiz" | "achievement" | "streak"
  description: string
  xp_gained: number
  timestamp: string
}

export interface RoadmapNode {
  id: string
  topic_id: string
  title: string
  status: "locked" | "unlocked" | "in-progress" | "completed"
  dependencies: string[]
  xp_reward: number
  position: { x: number; y: number }
}
