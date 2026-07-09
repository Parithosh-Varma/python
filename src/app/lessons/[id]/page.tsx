"use client"

import { use, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { lessons, getLesson } from "@/lib/data/lessons"
import { topics } from "@/lib/data/curriculum"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodePlayground } from "@/components/lessons/code-playground"
import { QuizSection } from "@/components/lessons/quiz-section"
import { Flashcards } from "@/components/lessons/flashcards"
import { useStore } from "@/lib/store"
import {
  ArrowLeft,
  Clock,
  Zap,
  BookOpen,
  Target,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  FileQuestion,
  GraduationCap,
  ChevronRight,
  Lightbulb,
  XCircle,
} from "lucide-react"
import toast from "react-hot-toast"

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const lesson = getLesson(id)
  const { addXp, completeLesson } = useStore()
  const [completed, setCompleted] = useState(false)

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist.</p>
          <Link href="/curriculum">
            <Button variant="gradient">Back to Curriculum</Button>
          </Link>
        </div>
      </div>
    )
  }

  const topic = topics.find((t) => t.id === lesson.topic_id)

  const handleComplete = () => {
    if (!completed) {
      addXp(lesson.xp_reward, lesson.title)
      completeLesson(lesson.id)
      setCompleted(true)
      toast.success(`Lesson completed! +${lesson.xp_reward} XP`)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/curriculum" className="hover:text-foreground">Curriculum</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/curriculum" className="hover:text-foreground">{topic?.title || "Topic"}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{lesson.title}</span>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{lesson.title}</h1>
              <Badge variant={lesson.difficulty as any}>{lesson.difficulty}</Badge>
            </div>
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4" /> {lesson.estimated_time} min
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <Zap className="h-4 w-4" /> {lesson.xp_reward} XP
            </span>
          </div>
        </div>

        {/* Learning Objectives */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold">Learning Objectives</h3>
            </div>
            <ul className="space-y-2">
              {lesson.learning_objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="theory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="theory" className="gap-1.5">
            <BookOpen className="h-4 w-4" /> Theory
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-1.5">
            <GraduationCap className="h-4 w-4" /> Practice
          </TabsTrigger>
          <TabsTrigger value="quiz" className="gap-1.5">
            <FileQuestion className="h-4 w-4" /> Quiz
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="gap-1.5">
            <Lightbulb className="h-4 w-4" /> Flashcards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="space-y-6">
          {lesson.theory.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    {section.content.split("\n\n").map((paragraph, j) => (
                      <p key={j} className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.code_example && (
                    <pre className="mt-4 p-4 rounded-xl bg-muted/50 border font-mono text-sm overflow-x-auto">
                      <code>{section.code_example}</code>
                    </pre>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Common Mistakes */}
          {lesson.common_mistakes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  Common Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.common_mistakes.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                    <p className="text-sm font-medium text-amber-400 mb-1 flex items-center gap-1.5"><XCircle className="h-4 w-4" /> {m.mistake}</p>
                    <p className="text-sm text-green-400 mb-1 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {m.correction}</p>
                    <p className="text-xs text-muted-foreground">{m.explanation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Interview Questions */}
          {lesson.interview_questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                  Interview Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.interview_questions.map((q, i) => (
                  <div key={i} className="p-4 rounded-xl border bg-card/30">
                    <p className="text-sm font-medium mb-2">Q: {q.question}</p>
                    <p className="text-sm text-muted-foreground">A: {q.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          {lesson.practice_problems.map((problem, i) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{problem.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </CardHeader>
                <CardContent>
                  <CodePlayground
                    starterCode={problem.starter_code}
                    solution={problem.solution}
                    hint={problem.hint}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {lesson.challenge_questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Challenge Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.challenge_questions.map((c) => (
                  <div key={c.id} className="flex items-start justify-between p-4 rounded-xl border bg-card/30">
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                    </div>
                    <Badge variant="warning">+{c.xp_reward} XP</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="quiz">
          <QuizSection questions={lesson.quiz} />
        </TabsContent>

        <TabsContent value="flashcards">
          <Flashcards cards={lesson.flashcards} />
        </TabsContent>
      </Tabs>

      {/* Complete Button */}
      <div className="flex items-center justify-between p-6 rounded-2xl border bg-gradient-to-r from-blue-700/10 to-blue-400/10">
        <div>
          <p className="font-medium">Mark as Complete</p>
          <p className="text-sm text-muted-foreground">Earn {lesson.xp_reward} XP when you complete this lesson</p>
        </div>
        <Button
          variant={completed ? "outline" : "gradient"}
          size="lg"
          onClick={handleComplete}
          disabled={completed}
        >
          {completed ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" /> Completed
            </>
          ) : (
            <>
              <Zap className="h-5 w-5 mr-2" /> Complete Lesson
            </>
          )}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/curriculum">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Curriculum
          </Button>
        </Link>
      </div>
    </div>
  )
}
