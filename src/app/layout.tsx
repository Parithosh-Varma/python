import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "@/components/layout/client-layout"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PyMaster — Master Python, Zero to Expert",
  description: "The best free Python learning platform. Complete curriculum, interactive coding, projects, quizzes, and AI-powered tutoring.",
  keywords: "python, programming, learn python, coding, web development, data science, machine learning",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
