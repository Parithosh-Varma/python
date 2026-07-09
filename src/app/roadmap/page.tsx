"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { topics } from "@/lib/data/curriculum"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Lock,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
  Route,
  BookOpen,
  Zap,
  Flag,
} from "lucide-react"

const categoryOrder = ["beginner", "intermediate", "advanced", "software-engineering", "specialization"]

export default function RoadmapPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  const getStatus = (topic: typeof topics[0]) => {
    if (topic.completed_lessons === topic.total_lessons) return "completed"
    if (topic.completed_lessons > 0) return "in-progress"
    const prereqs = topic.prerequisites
    if (prereqs.length === 0) return "unlocked"
    const allPrereqsDone = prereqs.every((pr) => {
      const t = topics.find((tp) => tp.id === pr)
      return t && t.completed_lessons === t.total_lessons
    })
    return allPrereqsDone ? "unlocked" : "locked"
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learning Roadmap</h1>
          <p className="text-muted-foreground mt-1">
            Follow this path from beginner to Python expert. Complete prerequisites to unlock new topics.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600 hidden md:block" />

          <div className="space-y-6">
            {categoryOrder.map((cat) => {
              const catTopics = topics.filter((t) => t.category === cat)
              if (catTopics.length === 0) return null

              const catProgress = Math.round(
                catTopics.reduce((a, t) => a + t.completed_lessons, 0) /
                catTopics.reduce((a, t) => a + t.total_lessons, 0) * 100
              )

              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      cat === "beginner" ? "bg-emerald-500/20" :
                      cat === "intermediate" ? "bg-amber-500/20" :
                      cat === "advanced" ? "bg-rose-500/20" :
                      cat === "software-engineering" ? "bg-blue-500/20" :
                      "bg-blue-600/20"
                    }`}>
                      <Route className={`h-5 w-5 ${
                        cat === "beginner" ? "text-emerald-400" :
                        cat === "intermediate" ? "text-amber-400" :
                        cat === "advanced" ? "text-rose-400" :
                        cat === "software-engineering" ? "text-blue-400" :
                        "text-blue-400"
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold capitalize">{cat.replace("-", " ")}</h2>
                      <p className="text-sm text-muted-foreground">{catTopics.length} topics</p>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{catProgress}%</span>
                      <Progress value={catProgress} className="h-1.5 w-24" />
                    </div>
                  </div>

                  <div className="grid gap-3 ml-12">
                    {catTopics.map((topic, i) => {
                      const status = getStatus(topic)
                      const progress = Math.round((topic.completed_lessons / topic.total_lessons) * 100)

                      return (
                        <motion.div
                          key={topic.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link href={status === "locked" ? "#" : `/lessons/${topic.lessons[0]}`}>
                            <Card
                              className={`group transition-all duration-300 cursor-pointer ${
                                status === "locked" ? "opacity-50 hover:opacity-60" :
                                status === "completed" ? "border-green-500/30" :
                                "hover:border-blue-600/30"
                              }`}
                              onClick={(e) => {
                                if (status === "locked") e.preventDefault()
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                    status === "completed" ? "bg-green-500/20" :
                                    status === "in-progress" ? "bg-blue-500/20" :
                                    status === "locked" ? "bg-muted" :
                                    "bg-blue-600/20"
                                  }`}>
                                    {status === "completed" ? (
                                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                                    ) : status === "in-progress" ? (
                                      <PlayCircle className="h-5 w-5 text-blue-400" />
                                    ) : status === "locked" ? (
                                      <Lock className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                      <BookOpen className="h-5 w-5 text-blue-400" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium">{topic.title}</h3>
                                      {status === "completed" && (
                                        <Badge variant="success">Completed</Badge>
                                      )}
                                      {status === "in-progress" && (
                                        <Badge variant="info">In Progress</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {topic.completed_lessons}/{topic.total_lessons} lessons · {topic.xp_reward} XP
                                    </p>
                                  </div>
                                  <div className="w-24 hidden sm:block">
                                    <Progress value={progress} className="h-1.5" />
                                  </div>
                                  {status !== "locked" && (
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
