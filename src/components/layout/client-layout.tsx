"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import { Sidebar } from "./sidebar"
import { NavBar } from "./nav-bar"
import { Footer } from "./footer"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"

const publicPaths = ["/", "/auth"]

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, sidebarOpen, user } = useStore()
  const pathname = usePathname()
  const router = useRouter()
  const isLanding = pathname === "/"
  const isPublic = publicPaths.includes(pathname)

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    if (!isPublic && !isLanding && !user) {
      router.push("/auth")
    }
  }, [user, pathname, router, isPublic, isLanding])

  if (!user && !isPublic && !isLanding) {
    return (
      <div className={cn("min-h-screen bg-background flex items-center justify-center", theme)}>
        <div className="text-center">
          <img src="/logo.png" alt="" className="h-14 w-14 mx-auto mb-4 rounded-2xl animate-pulse" />
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  if (isLanding || isPublic) {
    return (
      <div className={theme}>
        <Toaster position="top-right" />
        {children}
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background", theme)}>
      <Toaster position="top-right" />
      <Sidebar />
      <NavBar />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
