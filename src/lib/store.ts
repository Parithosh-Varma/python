import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, UserProgress, Note, Activity, Achievement } from "@/types"

interface AppState {
  user: User | null
  progress: UserProgress | null
  notes: Note[]
  activities: Activity[]
  achievements: Achievement[]
  theme: "dark" | "light"
  sidebarOpen: boolean
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

      setUser: (user) => set({ user }),
      setProgress: (progress) => set({ progress }),

      setNotes: (notes) => set({ notes }),
      addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
      updateNote: (id, updated) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, ...updated } : n)),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      addActivity: (activity) =>
        set((state) => ({
          activities: [activity, ...state.activities].slice(0, 50),
        })),

      setAchievements: (achievements) => set({ achievements }),

      addXp: (amount, source) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: { ...state.user, xp: state.user.xp + amount },
              activities: [
                {
                  id: Math.random().toString(36).substring(2),
                  type: "lesson" as const,
                  description: `Earned ${amount} XP from ${source}`,
                  xp_gained: amount,
                  timestamp: new Date().toISOString(),
                } as Activity,
                ...state.activities,
              ].slice(0, 50),
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
          return {
            progress: {
              ...state.progress,
              quiz_scores: { ...state.progress.quiz_scores, [quizId]: score },
            },
          }
        }),

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
      }),
    }
  )
)
