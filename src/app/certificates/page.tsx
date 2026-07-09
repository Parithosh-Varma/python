"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Award,
  CheckCircle2,
  Lock,
  Download,
  Share2,
  Sparkles,
  BookOpen,
  Code2,
  Cpu,
  Globe,
  Bot,
  Server,
  BarChart,
} from "lucide-react"

const certificates = [
  {
    id: "beginner-python",
    title: "Beginner Python",
    description: "Master Python fundamentals",
    icon: BookOpen,
    color: "from-emerald-500 to-green-500",
    progress: 100,
    status: "earned",
    criteria: ["Complete all 27 beginner lessons", "Pass beginner assessment"],
  },
  {
    id: "intermediate-python",
    title: "Intermediate Python",
    description: "Advanced Python concepts",
    icon: Code2,
    color: "from-amber-500 to-yellow-500",
    progress: 45,
    status: "in-progress",
    criteria: ["Complete all intermediate lessons", "Build 3 projects", "Pass intermediate exam"],
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Expert-level Python",
    icon: Cpu,
    color: "from-rose-500 to-pink-500",
    progress: 20,
    status: "in-progress",
    criteria: ["Complete all advanced lessons", "Build 5 projects", "Pass advanced exam"],
  },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Professional Python developer",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    progress: 10,
    status: "in-progress",
    criteria: ["Complete all curriculum", "Build 10+ projects", "Pass comprehensive exam"],
  },
  {
    id: "automation-expert",
    title: "Automation Expert",
    description: "Automation & scripting",
    icon: Bot,
    color: "from-purple-500 to-violet-500",
    progress: 0,
    status: "locked",
    criteria: ["Complete automation specialization", "Build 3 automation projects"],
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    description: "Backend engineering",
    icon: Server,
    color: "from-indigo-500 to-purple-500",
    progress: 0,
    status: "locked",
    criteria: ["Complete web development path", "Build a full-stack application"],
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    description: "Data science & ML",
    icon: BarChart,
    color: "from-teal-500 to-green-500",
    progress: 0,
    status: "locked",
    criteria: ["Complete data science path", "Build ML models", "Complete capstone project"],
  },
  {
    id: "python-master",
    title: "Python Master",
    description: "Ultimate Python mastery",
    icon: Award,
    color: "from-purple-600 to-pink-500",
    progress: 0,
    status: "locked",
    criteria: ["Complete ALL curriculum paths", "Build 20+ projects", "Pass master exam"],
  },
]

export default function CertificatesPage() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Earn certificates by completing learning paths and demonstrating your skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, i) => {
            const Icon = cert.icon
            const isEarned = cert.status === "earned"
            const isLocked = cert.status === "locked"

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={`h-full transition-all duration-300 ${
                  isEarned ? "border-green-500/30" :
                  isLocked ? "opacity-60" :
                  "hover:border-purple-500/30"
                }`}>
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      {isEarned && (
                        <div className="absolute -top-1 -right-1">
                          <Sparkles className="h-5 w-5 text-amber-400" />
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-center mb-1">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">{cert.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Progress</span>
                        <span>{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-1.5" />
                    </div>

                    <div className="space-y-1 mb-4">
                      {cert.criteria.map((c, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          {cert.progress === 100 ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    {isEarned ? (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : isLocked ? (
                      <Button size="sm" variant="outline" className="w-full" disabled>
                        <Lock className="h-4 w-4 mr-1" /> Locked
                      </Button>
                    ) : (
                      <Button size="sm" variant="gradient" className="w-full">
                        Continue Learning
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
