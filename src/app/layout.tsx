import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/layout/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PyMaster - Learn Python from Zero to Expert",
  description: "The best free Python learning platform. Complete curriculum, interactive coding, projects, quizzes, and AI-powered tutoring.",
  keywords: "python, programming, learn python, coding, web development, data science, machine learning",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
