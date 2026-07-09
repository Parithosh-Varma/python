"use client"

import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { topics } from "@/lib/data/curriculum"
import { lessons } from "@/lib/data/lessons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import {
  BarChart3,
  TrendingUp,
  BookOpen,
  Zap,
  Clock,
  Target,
  Flame,
  GraduationCap,
  Award,
  Brain,
  Calendar,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from "recharts"
import { calculateLevel } from "@/lib/utils"

const COLORS = ["#a855f7", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444"]

export default function StatisticsPage() {
  const { user, progress } = useStore()
  const xp = user?.xp || 0
  const { level } = calculateLevel(xp)
  const completedLessons = progress?.completed_lessons?.length || 0
  const totalLessons = Object.keys(lessons).length
  const completedProjects = progress?.completed_projects?.length || 0
  const studyStreak = progress?.study_streak || 0

  const topicData = topics.slice(0, 8).map((t) => ({
    name: t.title.length > 15 ? t.title.slice(0, 15) + "..." : t.title,
    completed: t.completed_lessons,
    total: t.total_lessons,
    progress: Math.round((t.completed_lessons / t.total_lessons) * 100),
  }))

  const categoryData = [
    { name: "Beginner", value: topics.filter((t) => t.category === "beginner").length, color: "#22c55e" },
    { name: "Intermediate", value: topics.filter((t) => t.category === "intermediate").length, color: "#f59e0b" },
    { name: "Advanced", value: topics.filter((t) => t.category === "advanced").length, color: "#ef4444" },
    { name: "Software Eng", value: topics.filter((t) => t.category === "software-engineering").length, color: "#3b82f6" },
    { name: "Specializations", value: topics.filter((t) => t.category === "specialization").length, color: "#a855f7" },
  ]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-muted-foreground mt-1">Track your learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: TrendingUp, label: "Current Level", value: level, color: "from-purple-600 to-blue-500" },
            { icon: Zap, label: "Total XP", value: xp.toLocaleString(), color: "from-amber-500 to-orange-500" },
            { icon: BookOpen, label: "Lessons Done", value: completedLessons, color: "from-green-500 to-emerald-500" },
            { icon: Flame, label: "Best Streak", value: `${studyStreak} days`, color: "from-red-500 to-rose-500" },
            { icon: Clock, label: "Hours Studied", value: user?.total_hours || 0, color: "from-blue-500 to-cyan-500" },
            { icon: Target, label: "Completion", value: `${Math.round((completedLessons / totalLessons) * 100)}%`, color: "from-violet-500 to-purple-500" },
            { icon: GraduationCap, label: "Projects Done", value: completedProjects, color: "from-pink-500 to-rose-500" },
            { icon: Award, label: "Avg Quiz Score", value: "85%", color: "from-teal-500 to-green-500" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border bg-card/50 backdrop-blur-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                  <s.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-xl font-bold">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="hsl(240 5% 64.9%)" fontSize={12} />
                    <YAxis dataKey="name" type="category" width={120} stroke="hsl(240 5% 64.9%)" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        background: "hsl(240 10% 5.9%)",
                        border: "1px solid hsl(240 3.7% 15.9%)",
                        borderRadius: "12px",
                      }}
                      formatter={(value: any) => [`${value}%`, "Progress"]}
                    />
                    <Bar dataKey="progress" fill="#a855f7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Curriculum Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "hsl(240 10% 5.9%)",
                        border: "1px solid hsl(240 3.7% 15.9%)",
                        borderRadius: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {categoryData.map((entry, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{entry.name}</span>
                      <span className="text-muted-foreground">({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <ProgressChart />

        {/* XP History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Learning Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 7 * 12 }).map((_, i) => {
                const intensity = Math.random()
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-sm transition-colors"
                    style={{
                      backgroundColor: intensity > 0.7
                        ? "rgb(168, 85, 247, 0.8)"
                        : intensity > 0.4
                        ? "rgb(168, 85, 247, 0.4)"
                        : intensity > 0.1
                        ? "rgb(168, 85, 247, 0.15)"
                        : "hsl(240 3.7% 15.9%)",
                    }}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((v) => (
                <div
                  key={v}
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: v > 0.7
                      ? "rgb(168, 85, 247, 0.8)"
                      : v > 0.4
                      ? "rgb(168, 85, 247, 0.4)"
                      : "rgb(168, 85, 247, 0.15)",
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
