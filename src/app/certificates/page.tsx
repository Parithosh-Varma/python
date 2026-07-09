"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
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
  Loader2,
} from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { jsPDF } from "jspdf"

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
    status: "in-progress",
    criteria: ["Complete all intermediate lessons", "Build 3 projects", "Pass intermediate exam"],
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    description: "Expert-level Python",
    icon: Cpu,
    color: "from-rose-500 to-pink-500",
    status: "in-progress",
    criteria: ["Complete all advanced lessons", "Build 5 projects", "Pass advanced exam"],
  },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Professional Python developer",
    icon: Globe,
    color: "from-cyan-500 to-teal-500",
    status: "in-progress",
    criteria: ["Complete all curriculum", "Build 10+ projects", "Pass comprehensive exam"],
  },
  {
    id: "automation-expert",
    title: "Automation Expert",
    description: "Automation & scripting",
    icon: Bot,
    color: "bg-primary",
    status: "locked",
    criteria: ["Complete automation specialization", "Build 3 automation projects"],
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    description: "Backend engineering",
    icon: Server,
    color: "bg-primary",
    status: "locked",
    criteria: ["Complete web development path", "Build a full-stack application"],
  },
  {
    id: "data-science",
    title: "Data Science with Python",
    description: "Data science & ML",
    icon: BarChart,
    color: "from-teal-500 to-green-500",
    status: "locked",
    criteria: ["Complete data science path", "Build ML models", "Complete capstone project"],
  },
  {
    id: "python-master",
    title: "Python Master",
    description: "Ultimate Python mastery",
    icon: Award,
    color: "bg-primary",
    status: "locked",
    criteria: ["Complete ALL curriculum paths", "Build 20+ projects", "Pass master exam"],
  },
]

function getProgress(title: string, completedLessons: number, totalLessons: number): number {
  if (title === "Beginner Python") return Math.min(100, Math.round((completedLessons / Math.max(totalLessons, 1)) * 100))
  if (title === "Intermediate Python") return Math.min(100, Math.round((completedLessons / Math.max(totalLessons, 1)) * 50))
  return 0
}

function generatePdf(title: string, name: string) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  doc.setFillColor(2, 39, 86)
  doc.rect(0, 0, pageWidth, pageHeight, "F")

  doc.setFillColor(255, 255, 255)
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20, "F")

  doc.setFillColor(2, 39, 86)
  doc.rect(10, 10, pageWidth - 20, 40, "F")

  doc.setFont("helvetica", "bold")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.text("PyMaster", pageWidth / 2, 36, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setTextColor(2, 39, 86)
  doc.setFontSize(14)
  doc.text("Certificate of Completion", pageWidth / 2, 80, { align: "center" })

  doc.setFontSize(12)
  doc.text("This certifies that", pageWidth / 2, 105, { align: "center" })

  doc.setFont("helvetica", "bold")
  doc.setFontSize(22)
  doc.setTextColor(2, 39, 86)
  doc.text(name, pageWidth / 2, 125, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(`has successfully completed the "${title}" certification`, pageWidth / 2, 148, { align: "center" })

  doc.setFontSize(10)
  doc.text(`Issued on ${new Date().toLocaleDateString()}`, pageWidth / 2, 170, { align: "center" })

  doc.setFillColor(2, 39, 86)
  doc.rect(10, pageHeight - 30, pageWidth - 20, 20, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text("PyMaster — The best free Python learning platform", pageWidth / 2, pageHeight - 17, { align: "center" })

  doc.save(`${title.replace(/\s+/g, "-").toLowerCase()}-certificate.pdf`)
}

export default function CertificatesPage() {
  const { user, progress } = useStore()
  const [downloading, setDownloading] = useState<string | null>(null)
  const completedLessons = progress?.completed_lessons?.length || 0
  const totalLessons = 300

  const handleDownload = async (cert: (typeof certificates)[0]) => {
    setDownloading(cert.id)
    try {
      await new Promise((r) => setTimeout(r, 300))
      generatePdf(cert.title, user?.name || "Learner")
      toast.success("Certificate downloaded!")
    } catch {
      toast.error("Failed to generate certificate")
    } finally {
      setDownloading(null)
    }
  }

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
            const certProgress = getProgress(cert.title, completedLessons, totalLessons)

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
                  "hover:border-primary/30"
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
                        <span>{certProgress}%</span>
                      </div>
                      <Progress value={certProgress} className="h-1.5" />
                    </div>

                    <div className="space-y-1 mb-4">
                      {cert.criteria.map((c, j) => (
                        <div key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          {isEarned ? (
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
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDownload(cert)}
                          disabled={downloading === cert.id}
                        >
                          {downloading === cert.id ? (
                            <><Loader2 className="h-4 w-4 mr-1 animate-spin" /> Generating...</>
                          ) : (
                            <><Download className="h-4 w-4 mr-1" /> Download</>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/certificates/${cert.id}`)
                          toast.success("Link copied!")
                        }}>
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
