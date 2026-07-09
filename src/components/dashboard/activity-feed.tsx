"use client"

import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { BookOpen, Blocks, GraduationCap, Trophy, Flame, Zap } from "lucide-react"

const activityIcons = {
  lesson: BookOpen,
  project: Blocks,
  quiz: GraduationCap,
  achievement: Trophy,
  streak: Flame,
}

const activityColors = {
  lesson: "from-blue-500 to-cyan-500",
  project: "from-blue-600 to-blue-400",
  quiz: "from-amber-500 to-orange-500",
  achievement: "from-green-500 to-emerald-500",
  streak: "from-red-500 to-rose-500",
}

export function ActivityFeed() {
  const { activities } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Zap className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No activity yet. Start learning!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 8).map((activity, i) => {
              const Icon = activityIcons[activity.type] || Zap
              const color = activityColors[activity.type] || "from-gray-500 to-gray-500"
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    +{activity.xp_gained} XP
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
