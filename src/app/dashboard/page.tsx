"use client"

import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { topics } from "@/lib/data/curriculum"
import { lessons } from "@/lib/data/lessons"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ProgressChart, XPBarChart } from "@/components/dashboard/progress-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { Achievements } from "@/components/dashboard/achievements"
import { DailyGoal } from "@/components/dashboard/daily-goal"
import { Onboarding } from "@/components/onboarding"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Zap,
  Flame,
  Trophy,
  Clock,
  BarChart3,
  GraduationCap,
  Code2,
  Target,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { calculateLevel, getProgressPercentage } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
}

export default function DashboardPage() {
  const { user, progress } = useStore()
  const xp = user?.xp || 0
  const { level, currentLevelXp, nextLevelXp } = calculateLevel(xp)
  const completedLessons = progress?.completed_lessons?.length || 0
  const totalLessons = Object.keys(lessons).length
  const completedProjects = progress?.completed_projects?.length || 0
  const totalProjects = 10
  const overallProgress = getProgressPercentage(completedLessons, totalLessons)
  const studyStreak = progress?.study_streak || 0
  const longestStreak = user?.longest_streak || 12
  const hoursStudied = user?.total_hours || 0
  const remaining = totalLessons - completedLessons
  const estimatedHours = remaining * 0.3
  const completedSet = new Set(progress?.completed_lessons || [])
  const beginnerTopics = topics.filter(t => t.category === "beginner").length
  const beginnerDone = topics.filter(t => t.category === "beginner" && t.lessons.every(l => completedSet.has(l))).length

  return (
    <div className="space-y-8">
      <Onboarding />
      {/* Header */}
      <motion.div initial="hidden" animate="visible">
        <motion.div variants={fadeUp} custom={0} className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name || "Learner"}! Keep up the great work.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="info" className="px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Level {level}
            </Badge>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Current Level"
            value={level}
            icon={TrendingUp}
            gradient="from-blue-700 to-blue-400"
            subtitle={`${currentLevelXp} / ${nextLevelXp} XP to next level`}
            delay={0.1}
          />
          <StatsCard
            title="Total XP"
            value={xp.toLocaleString()}
            icon={Zap}
            gradient="from-amber-500 to-orange-500"
            subtitle="Keep earning!"
            delay={0.15}
          />
          <StatsCard
            title="Study Streak"
            value={`${studyStreak} days`}
            icon={Flame}
            gradient="from-red-500 to-rose-500"
            subtitle={`Best: ${longestStreak} days`}
            delay={0.2}
          />
          <StatsCard
            title="Hours Studied"
            value={hoursStudied.toFixed(1)}
            icon={Clock}
            gradient="from-blue-500 to-cyan-500"
            subtitle="Total learning time"
            delay={0.25}
          />
          <StatsCard
            title="Completed Lessons"
            value={completedLessons}
            icon={BookOpen}
            gradient="from-green-500 to-emerald-500"
            subtitle={`${remaining} remaining`}
            delay={0.3}
          />
          <StatsCard
            title="Projects Done"
            value={completedProjects}
            icon={Code2}
            gradient="from-pink-500 to-rose-500"
            subtitle={`${totalProjects - completedProjects} more to try`}
            delay={0.35}
          />
          <StatsCard
            title="Overall Progress"
            value={`${overallProgress}%`}
            icon={Target}
            gradient="from-blue-500 to-blue-600"
            subtitle={`${completedLessons} / ${totalLessons} lessons`}
            delay={0.4}
          />
          <StatsCard
            title="Est. Time Remaining"
            value={`${estimatedHours.toFixed(1)}h`}
            icon={BarChart3}
            gradient="from-cyan-500 to-teal-500"
            subtitle="At current pace"
            delay={0.45}
          />
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProgressChart />
            <XPBarChart />
          </div>
          <div className="space-y-6">
            <DailyGoal />
            <Achievements />
          </div>
        </div>

        {/* Learning Path & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-400" />
                Current Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topics.slice(0, 6).map((topic, i) => {
                  const topicDone = topic.lessons.filter(l => completedSet.has(l)).length
                  const topicProgress = getProgressPercentage(topicDone, topic.total_lessons)
                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/30 transition-colors cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-700/20 to-blue-400/20 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{topic.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {topicDone}/{topic.total_lessons} lessons
                        </p>
                      </div>
                      <div className="w-24">
                        <div className="flex items-center gap-2">
                          <Progress value={topicProgress} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium text-muted-foreground w-8 text-right">{topicProgress}%</span>
                        </div>
                      </div>
                      <Badge variant={topic.category === "beginner" ? "beginner" : topic.category === "intermediate" ? "intermediate" : "advanced"}>
                        {topic.category}
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <ActivityFeed />
        </div>

        {/* Certificate Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Certificate Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Beginner Python", progress: beginnerDone / beginnerTopics * 100, color: "from-emerald-500 to-green-500" },
                { name: "Intermediate Python", progress: 25, color: "from-amber-500 to-yellow-500" },
                { name: "Python Developer", progress: 10, color: "from-blue-500 to-cyan-500" },
                { name: "Python Master", progress: 5, color: "from-blue-600 to-blue-400" },
              ].map((cert) => (
                <div key={cert.name} className="p-4 rounded-xl border bg-card/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">{cert.name}</span>
                    <span className="text-xs font-bold">{Math.round(cert.progress)}%</span>
                  </div>
                  <Progress value={cert.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
