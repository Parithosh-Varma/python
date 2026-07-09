"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import { Sidebar } from "./sidebar"
import { NavBar } from "./nav-bar"
import { Footer } from "./footer"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Toaster } from "react-hot-toast"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme, sidebarOpen } = useStore()
  const pathname = usePathname()
  const isLanding = pathname === "/"

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(theme)
  }, [theme])

  if (isLanding) {
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
