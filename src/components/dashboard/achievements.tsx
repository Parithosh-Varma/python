"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Lock, Sparkles } from "lucide-react"
import { achievements } from "@/lib/data/achievements"

export function Achievements() {
  const unlocked = achievements.slice(0, 3)
  const locked = achievements.slice(3, 6)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {unlocked.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20"
            >
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
              <span className="text-xs font-medium text-amber-400">+{a.xp_reward} XP</span>
            </motion.div>
          ))}
          {locked.map((a) => (
            <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl opacity-40">
              <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.criteria}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
