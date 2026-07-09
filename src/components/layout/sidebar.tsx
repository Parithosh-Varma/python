"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Code2,
  Blocks,
  GraduationCap,
  StickyNote,
  Search,
  Trophy,
  Sparkles,
  Zap,
  Flame,
  BarChart3,
  Shield,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Curriculum", href: "/curriculum" },
  { icon: Route, label: "Roadmap", href: "/roadmap" },
  { icon: Code2, label: "Playground", href: "/playground" },
  { icon: Blocks, label: "Projects", href: "/projects" },
  { icon: GraduationCap, label: "Quizzes", href: "/quiz" },
  { icon: StickyNote, label: "Notes", href: "/notes" },
  { icon: Trophy, label: "Achievements", href: "/leaderboard" },
  { icon: Sparkles, label: "AI Tutor", href: "/ai-tutor" },
  { icon: BarChart3, label: "Statistics", href: "/statistics" },
  { icon: Shield, label: "Certificates", href: "/certificates" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen, user } = useStore()

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-0 z-40 h-screen border-r bg-background/80 backdrop-blur-xl"
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                PyMaster
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col p-3 gap-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-purple-400 border border-purple-500/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive && "text-purple-400")} />
                    {item.label}
                    {item.label === "AI Tutor" && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-500">
                        <Sparkles className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex items-center gap-3 rounded-xl bg-accent/30 p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xs">
                  {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">Level {Math.floor(Math.sqrt((user?.xp || 0) / 100)) + 1}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="font-medium">{user?.xp || 0}</span>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
