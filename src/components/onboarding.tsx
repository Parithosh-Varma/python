"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  IconCurriculum,
  IconPlayground,
  IconProjects,
  IconAITutor,
  IconAward,
  IconDashboard,
} from "@/components/icons"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: IconCurriculum,
    title: "Follow the Curriculum",
    desc: "300+ lessons organized from beginner to advanced. Each module has theory, practice, quizzes, and flashcards.",
  },
  {
    icon: IconPlayground,
    title: "Code in the Playground",
    desc: "Write and run real Python code in your browser. Experiment with concepts as you learn them.",
  },
  {
    icon: IconProjects,
    title: "Build Real Projects",
    desc: "Apply your skills with 200+ real-world projects. Build a portfolio employers will notice.",
  },
  {
    icon: IconAITutor,
    title: "Ask the AI Tutor",
    desc: "Stuck? Get instant explanations, code reviews, and personalized help from your AI tutor.",
  },
  {
    icon: IconDashboard,
    title: "Track Your Progress",
    desc: "Earn XP, maintain streaks, unlock achievements, and climb the leaderboard as you learn.",
  },
  {
    icon: IconAward,
    title: "Earn Certificates",
    desc: "Complete learning paths to earn verifiable certificates. From Beginner to Python Master.",
  },
]

export function Onboarding() {
  const { showOnboarding, dismissOnboarding, user } = useStore()
  const [step, setStep] = useState(0)

  if (!showOnboarding || !user) return null

  const current = steps[step]
  const Icon = current.icon
  const isLast = step === steps.length - 1

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-lg rounded-2xl border bg-background/95 backdrop-blur-xl p-8 shadow-2xl"
        >
          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center mb-6">
              <Icon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{current.title}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              {current.desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissOnboarding}
              >
                Skip
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/80 text-white"
                onClick={() => {
                  if (isLast) {
                    dismissOnboarding()
                  } else {
                    setStep(step + 1)
                  }
                }}
              >
                {isLast ? (
                  <>Get Started <CheckCircle2 className="ml-1.5 h-4 w-4" /></>
                ) : (
                  <>Next <ArrowRight className="ml-1.5 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
