"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { QuizQuestion } from "@/types"
import { CheckCircle2, XCircle, ArrowRight, RefreshCw, Brain } from "lucide-react"

interface QuizSectionProps {
  questions: QuizQuestion[]
}

export function QuizSection({ questions }: QuizSectionProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})

  const question = questions[currentQ]
  const progress = ((currentQ) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
    setShowResult(true)
    const isCorrect = answer === question.correct_answer
    if (isCorrect) setScore((s) => s + 1)
    setAnswers((a) => ({ ...a, [question.id]: isCorrect }))
  }

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setCompleted(true)
    }
  }

  const restart = () => {
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompleted(false)
    setAnswers({})
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <p className="text-muted-foreground mb-4">
            You scored {score}/{questions.length} ({percentage}%)
          </p>
          <Progress value={percentage} className="h-2 mb-6 max-w-xs mx-auto" />
          <div className="flex items-center justify-center gap-2 mb-6">
            {Object.values(answers).map((correct, i) => (
              <div
                key={i}
                className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  correct ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={restart}>
            <RefreshCw className="h-4 w-4 mr-1.5" /> Retry Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            Quick Quiz
          </CardTitle>
          <Badge variant="secondary">
            {currentQ + 1}/{questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-1" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <p className="text-sm text-muted-foreground mb-2 capitalize">
              {question.type.replace("-", " ")}
            </p>
            <h4 className="text-lg font-medium mb-4">{question.question}</h4>
            {question.code && (
              <pre className="p-3 rounded-xl bg-muted/50 font-mono text-sm mb-4 overflow-x-auto">
                {question.code}
              </pre>
            )}
            <div className="space-y-2">
              {question.options?.map((option) => {
                const isSelected = selectedAnswer === option
                const isCorrectOption = option === question.correct_answer
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      showResult && isCorrectOption
                        ? "border-green-500 bg-green-500/10"
                        : showResult && isSelected && !isCorrectOption
                        ? "border-red-500 bg-red-500/10"
                        : isSelected
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-border hover:border-purple-500/30 hover:bg-accent/50"
                    }`}
                  >
                    <span className="text-sm">{option}</span>
                    {showResult && isCorrectOption && (
                      <CheckCircle2 className="h-4 w-4 text-green-400 float-right" />
                    )}
                    {showResult && isSelected && !isCorrectOption && (
                      <XCircle className="h-4 w-4 text-red-400 float-right" />
                    )}
                  </button>
                )
              })}
            </div>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 rounded-xl bg-accent/50"
              >
                <p className="text-sm">{question.explanation}</p>
                <Button onClick={nextQuestion} className="mt-3" size="sm">
                  {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
