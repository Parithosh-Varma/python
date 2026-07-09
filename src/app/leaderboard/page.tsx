"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Zap,
  Flame,
  Crown,
  TrendingUp,
  Star,
  Award,
  Users,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

const leaderboardData = {
  weekly: [
    { rank: 1, name: "CodeMaster42", xp: 2450, level: 24, streak: 12, change: "up", avatar: "CM" },
    { rank: 2, name: "PythonNinja", xp: 2100, level: 22, streak: 8, change: "up", avatar: "PN" },
    { rank: 3, name: "DataWizard", xp: 1800, level: 20, streak: 15, change: "same", avatar: "DW" },
    { rank: 4, name: "AlgoQueen", xp: 1650, level: 19, streak: 7, change: "down", avatar: "AQ" },
    { rank: 5, name: "BugHunter", xp: 1400, level: 17, streak: 5, change: "up", avatar: "BH" },
    { rank: 6, name: "SyntaxKing", xp: 1250, level: 16, streak: 10, change: "same", avatar: "SK" },
    { rank: 7, name: "DjangoDev", xp: 1100, level: 15, streak: 6, change: "down", avatar: "DD" },
    { rank: 8, name: "FlaskFan", xp: 950, level: 14, streak: 4, change: "up", avatar: "FF" },
    { rank: 9, name: "MLMaster", xp: 800, level: 12, streak: 9, change: "up", avatar: "MM" },
    { rank: 10, name: "PyBeginner", xp: 650, level: 10, streak: 3, change: "same", avatar: "PB" },
  ],
  monthly: [
    { rank: 1, name: "DataWizard", xp: 8500, level: 20, streak: 15, change: "up", avatar: "DW" },
    { rank: 2, name: "CodeMaster42", xp: 7200, level: 24, streak: 12, change: "same", avatar: "CM" },
    { rank: 3, name: "PythonNinja", xp: 6800, level: 22, streak: 8, change: "up", avatar: "PN" },
    { rank: 4, name: "AlgoQueen", xp: 5400, level: 19, streak: 7, change: "down", avatar: "AQ" },
    { rank: 5, name: "SyntaxKing", xp: 4200, level: 16, streak: 10, change: "up", avatar: "SK" },
  ],
  alltime: [
    { rank: 1, name: "DataWizard", xp: 45000, level: 20, streak: 15, change: "up", avatar: "DW" },
    { rank: 2, name: "CodeMaster42", xp: 38000, level: 24, streak: 12, change: "same", avatar: "CM" },
    { rank: 3, name: "PythonNinja", xp: 32000, level: 22, streak: 8, change: "up", avatar: "PN" },
  ],
}

const rankColors = ["from-amber-500 to-yellow-500", "from-gray-300 to-gray-400", "from-amber-700 to-amber-800"]

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("weekly")
  const data = leaderboardData[period as keyof typeof leaderboardData]

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Compete with other learners and climb the ranks</p>
        </div>

        <Tabs defaultValue="weekly" value={period} onValueChange={setPeriod}>
          <TabsList className="mb-8">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value={period}>
            {/* Podium */}
            <div className="flex items-end justify-center gap-4 mb-10">
              {[1, 0, 2].map((pos) => {
                if (pos >= data.length) return null
                const user = data[pos]
                const heights = ["h-32", "h-40", "h-28"]
                const icons = [Crown, Trophy, Medal]
                const Icon = icons[pos]
                return (
                  <div key={pos} className="flex flex-col items-center">
                    <Icon className={`h-6 w-6 mb-2 ${
                      pos === 0 ? "text-amber-400" : pos === 1 ? "text-gray-300" : "text-amber-700"
                    }`} />
                    <Avatar className="h-14 w-14 mb-2 ring-2 ring-purple-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                    <div className={`w-16 ${heights[pos]} rounded-t-xl bg-gradient-to-t ${
                      rankColors[pos] || "from-purple-600 to-blue-500"
                    } mt-2 opacity-80`} />
                  </div>
                )
              })}
            </div>

            {/* List */}
            <Card>
              <CardContent className="p-0">
                {data.map((user, i) => {
                  const IconComponent = user.rank <= 3 ? [Crown, Trophy, Medal][user.rank - 1] : null
                  return (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 ${
                        i < data.length - 1 ? "border-b" : ""
                      } hover:bg-accent/30 transition-colors`}
                    >
                      <div className="w-8 text-center">
                        {user.rank <= 3 && IconComponent ? (
                          <IconComponent className={`h-5 w-5 mx-auto ${
                            user.rank === 1 ? "text-amber-400" :
                            user.rank === 2 ? "text-gray-300" :
                            "text-amber-700"
                          }`} />
                        ) : (
                          <span className="text-sm font-medium text-muted-foreground">{user.rank}</span>
                        )}
                      </div>

                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Level {user.level} · {user.streak} day streak
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          <Zap className="h-3 w-3 mr-1 text-amber-400" />
                          {user.xp.toLocaleString()} XP
                        </Badge>
                        {user.change === "up" && <ArrowUp className="h-4 w-4 text-green-400" />}
                        {user.change === "down" && <ArrowDown className="h-4 w-4 text-red-400" />}
                        {user.change === "same" && <Minus className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
