"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  PanelLeftOpen,
  PanelLeftClose,
  ChevronDown,
  X,
  LogOut,
  Zap,
} from "lucide-react"
import {
  IconSearch,
  IconSun,
  IconMoon,
  IconStreak,
  IconNotifications,
  IconUser,
  IconLeaderboard,
  IconCurriculum,
  IconSettings,
  IconCheck,
} from "@/components/icons"

const notifications = [
  { id: 1, title: "Level Up!", desc: "You reached level 5!", time: "2m ago", icon: IconCheck, color: "text-amber-400" },
  { id: 2, title: "Streak Saved", desc: "7-day streak maintained", time: "1h ago", icon: IconStreak, color: "text-orange-400" },
  { id: 3, title: "Achievement Unlocked", desc: "Completed 10 lessons", time: "3h ago", icon: IconCheck, color: "text-green-400" },
  { id: 4, title: "New Lesson Available", desc: "Advanced Decorators", time: "1d ago", icon: IconCurriculum, color: "text-blue-400" },
]

export function NavBar() {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme, user } = useStore()
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b bg-background/80 backdrop-blur-xl transition-all duration-300",
        sidebarOpen ? "left-64" : "left-0"
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>

          <div className="relative hidden md:block">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lessons, projects, notes..."
              className="h-9 w-80 rounded-xl border bg-accent/30 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              onFocus={() => router.push("/search")}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <IconStreak className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">{user?.streak || 0}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">{user?.xp || 0} XP</span>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === "dark" ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <IconNotifications className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500" />
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-80 rounded-2xl border bg-popover shadow-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => {
                      const Icon = n.icon
                      return (
                        <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer border-b last:border-0">
                          <div className="h-8 w-8 rounded-lg bg-accent/50 flex items-center justify-center flex-shrink-0">
                            <Icon className={`h-4 w-4 ${n.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.desc}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => { setShowNotifications(false); router.push("/settings") }}>
                      <IconSettings className="h-3 w-3 mr-1" /> Notification Settings
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xs">
                  {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </div>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border bg-popover shadow-2xl overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <p className="font-medium text-sm truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    {[
                      { icon: IconUser, label: "Profile", href: "/settings" },
                      { icon: IconLeaderboard, label: "Achievements", href: "/leaderboard" },
                      { icon: IconCurriculum, label: "My Notes", href: "/notes" },
                      { icon: IconSettings, label: "Settings", href: "/settings" },
                    ].map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <button
                          key={item.label}
                          onClick={() => { setShowUserMenu(false); router.push(item.href) }}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-xl hover:bg-accent transition-colors"
                        >
                          <ItemIcon className="h-4 w-4 text-muted-foreground" />
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                  <div className="border-t p-1">
                    <button className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-xl hover:bg-accent transition-colors text-red-400">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
