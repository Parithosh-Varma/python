"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { quizBank } from "@/lib/data/quizzes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuizSection } from "@/components/lessons/quiz-section"
import { Brain, Clock, Zap, ArrowRight, BookOpen, CheckCircle2, BarChart3 } from "lucide-react"

const quizMeta = [
  { id: "python-basics", title: "Python Basics", questions: 6, time: 10, difficulty: "beginner" },
  { id: "control-flow", title: "Control Flow", questions: 5, time: 8, difficulty: "beginner" },
  { id: "functions", title: "Functions", questions: 5, time: 8, difficulty: "beginner" },
  { id: "data-structures", title: "Data Structures", questions: 5, time: 10, difficulty: "intermediate" },
  { id: "oop", title: "Object-Oriented Programming", questions: 5, time: 10, difficulty: "intermediate" },
  { id: "advanced", title: "Advanced Python", questions: 5, time: 12, difficulty: "advanced" },
]

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)

  if (selectedQuiz) {
    const questions = quizBank[selectedQuiz]
    if (!questions) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Quiz not found</h2>
          <Button onClick={() => setSelectedQuiz(null)}>Back to Quizzes</Button>
        </div>
      )
    }
    return (
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => setSelectedQuiz(null)} className="mb-6">
          ← Back to Quizzes
        </Button>
        <QuizSection questions={questions} />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Practice Quizzes</h1>
          <p className="text-muted-foreground mt-1">Test your knowledge with interactive quizzes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizMeta.map((quiz, i) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="group hover:border-blue-600/30 transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedQuiz(quiz.id)}
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-700/20 to-blue-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">{quiz.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={quiz.difficulty as any}>{quiz.difficulty}</Badge>
                    <Badge variant="secondary">{quiz.questions} questions</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {quiz.time} min
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap className="h-4 w-4" /> +{(quiz.questions * 10)} XP
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
