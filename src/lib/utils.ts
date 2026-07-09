import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}m`
  return `${hours}h ${mins}m`
}

export function calculateLevel(xp: number): { level: number; currentLevelXp: number; nextLevelXp: number } {
  const level = Math.floor(Math.sqrt(xp / 100)) + 1
  const currentLevelXp = xp - (level - 1) ** 2 * 100
  const nextLevelXp = level ** 2 * 100 - (level - 1) ** 2 * 100
  return { level, currentLevelXp, nextLevelXp }
}

export function getProgressPercentage(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
