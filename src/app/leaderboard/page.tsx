"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Zap,
  Crown,
  TrendingUp,
  Loader2,
} from "lucide-react"
import * as db from "@/lib/supabase-service"
import type { LeaderboardEntry } from "@/lib/supabase-service"

const rankColors = ["from-amber-500 to-yellow-500", "from-gray-300 to-gray-400", "from-amber-700 to-amber-800"]

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("weekly")
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    db.getLeaderboard(period as "weekly" | "monthly" | "alltime")
      .then(setData)
      .finally(() => setLoading(false))
  }, [period])

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
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-40" />
                <p>No leaderboard data yet. Start learning to appear!</p>
              </div>
            ) : (
              <>
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
                        <Avatar className="h-14 w-14 mb-2 ring-2 ring-blue-600/30">
                          <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-400 text-white">
                            {initials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                        <div className={`w-16 ${heights[pos]} rounded-t-xl bg-gradient-to-t ${
                          rankColors[pos] || "from-blue-700 to-blue-400"
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
                          key={user.id}
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
                            <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-400 text-white text-xs">
                              {initials(user.name)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">Level {user.level}</p>
                          </div>

                          <Badge variant="secondary" className="text-xs">
                            <Zap className="h-3 w-3 mr-1 text-amber-400" />
                            {user.xp.toLocaleString()} XP
                          </Badge>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
