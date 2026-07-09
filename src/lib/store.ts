import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserProgress, Note, Activity, Achievement } from "@/types"
import * as db from "./supabase-service"

interface AppState {
  user: User | null
  progress: UserProgress | null
  notes: Note[]
  activities: Activity[]
  achievements: Achievement[]
  theme: "dark" | "light"
  sidebarOpen: boolean
  showOnboarding: boolean
  dismissOnboarding: () => void
  setUser: (user: User | null) => void
  setProgress: (progress: UserProgress | null) => void
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (id: string, note: Partial<Note>) => void
  deleteNote: (id: string) => void
  addActivity: (activity: Activity) => void
  setAchievements: (achievements: Achievement[]) => void
  addXp: (amount: number, source: string) => void
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  completeLesson: (lessonId: string) => void
  completeProject: (projectId: string) => void
  updateQuizScore: (quizId: string, score: number) => void
  getStreak: () => number
  getLevel: () => number
  getProgress: () => number
  syncFromSupabase: (userId: string) => Promise<void>
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      progress: null,
      notes: [],
      activities: [],
      achievements: [],
      theme: "dark",
      sidebarOpen: true,
      showOnboarding: true,

      dismissOnboarding: () => set({ showOnboarding: false }),

      setUser: (user) => set({ user }),
      setProgress: (progress) => set({ progress }),

      setNotes: (notes) => set({ notes }),

      addNote: (note) => {
        set((state) => ({ notes: [note, ...state.notes] }))
        const u = get().user
        if (u && !u.id.startsWith("demo_")) {
          db.addNote(u.id, note)
        }
      },

      updateNote: (id, updated) => {
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...updated } : n)),
        }))
        db.updateNote(id, updated)
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        }))
        db.deleteNote(id)
      },

      addActivity: (activity) => {
        set((state) => ({
          activities: [activity, ...state.activities].slice(0, 50),
        }))
        const u = get().user
        if (u && !u.id.startsWith("demo_")) {
          db.addActivity(u.id, activity.type, activity.description, activity.xp_gained)
        }
      },

      setAchievements: (achievements) => set({ achievements }),

      addXp: (amount, source) =>
        set((state) => {
          if (!state.user) return state
          const newXp = state.user.xp + amount
          const newLevel = Math.max(1, Math.floor(Math.sqrt(newXp / 100)) + 1)
          const activity: Activity = {
            id: Math.random().toString(36).substring(2),
            type: "lesson" as const,
            description: `Earned ${amount} XP from ${source}`,
            xp_gained: amount,
            timestamp: new Date().toISOString(),
          }
          const u = state.user
          if (!u.id.startsWith("demo_")) {
            db.addXp(u.id, amount, source)
          }
          return {
            user: { ...state.user, xp: newXp, level: newLevel },
            activities: [activity, ...state.activities].slice(0, 50),
          }
        }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      completeLesson: (lessonId) =>
        set((state) => {
          if (!state.progress) return state
          const completed = new Set(state.progress.completed_lessons)
          completed.add(lessonId)
          const u = state.user
          if (u && !u.id.startsWith("demo_")) {
            db.completeLesson(u.id, lessonId)
          }
          return {
            progress: {
              ...state.progress,
              completed_lessons: Array.from(completed),
            },
          }
        }),

      completeProject: (projectId) =>
        set((state) => {
          if (!state.progress) return state
          const completed = new Set(state.progress.completed_projects)
          completed.add(projectId)
          const u = state.user
          if (u && !u.id.startsWith("demo_")) {
            db.completeProject(u.id, projectId)
          }
          return {
            progress: {
              ...state.progress,
              completed_projects: Array.from(completed),
            },
          }
        }),

      updateQuizScore: (quizId, score) =>
        set((state) => {
          if (!state.progress) return state
          const u = state.user
          if (u && !u.id.startsWith("demo_")) {
            db.saveQuizAttempt(u.id, quizId, score, 10, {})
          }
          return {
            progress: {
              ...state.progress,
              quiz_scores: { ...state.progress.quiz_scores, [quizId]: score },
            },
          }
        }),

      syncFromSupabase: async (userId: string) => {
        const data = await db.loadUserData(userId)
        if (data.user) set({ user: data.user })
        if (data.progress) set({ progress: data.progress })
        set({
          notes: data.notes,
          activities: data.activities.slice(0, 50),
          achievements: data.achievements,
        })
      },

      getStreak: () => {
        const { progress } = get()
        return progress?.study_streak || 0
      },

      getLevel: () => {
        const { user } = get()
        if (!user) return 1
        return Math.floor(Math.sqrt(user.xp / 100)) + 1
      },

      getProgress: () => {
        const { progress } = get()
        if (!progress) return 0
        return Math.min(100, Math.round((progress.completed_lessons.length / 300) * 100))
      },
    }),
    {
      name: "python-master-academy",
      partialize: (state) => ({
        user: state.user,
        progress: state.progress,
        notes: state.notes,
        activities: state.activities,
        achievements: state.achievements,
        theme: state.theme,
        showOnboarding: state.showOnboarding,
      }),
    }
  )
)
