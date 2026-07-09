"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, CheckCircle2, Clock, Flame } from "lucide-react"

export function DailyGoal() {
  const progress = 60

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Daily Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium">Complete 2 lessons</span>
          </div>
          <span className="text-sm font-bold text-purple-400">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-400" /> 1 completed
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 1 remaining
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
