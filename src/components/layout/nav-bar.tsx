"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  PanelLeftOpen,
  PanelLeftClose,
  Sun,
  Moon,
  Flame,
  Zap,
  Bell,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function NavBar() {
  const { sidebarOpen, setSidebarOpen, theme, toggleTheme, user } = useStore()
  const router = useRouter()

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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
            <Flame className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">{user?.streak || 0}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">{user?.xp || 0} XP</span>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500" />
          </Button>

          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xs">
                {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          </div>
        </div>
      </div>
    </header>
  )
}
