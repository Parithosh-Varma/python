"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { topics } from "@/lib/data/curriculum"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Terminal,
  Code,
  GitFork,
  FunctionSquare,
  Layers,
  Monitor,
  AlertTriangle,
  Package,
  FileText,
  Box,
  Shapes,
  RotateCcw,
  Wrench,
  Container,
  Search,
  Zap,
  Cpu,
  Globe,
  Database,
  CheckSquare,
  TrendingUp,
  Cog,
  GitBranch,
  GitGraph,
  Sparkles,
  FileJson,
  Server,
  BarChart,
  Bot,
  Shield,
  Gamepad2,
  Lock,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Terminal, Code, GitFork, FunctionSquare, Layers, Monitor,
  AlertTriangle, Package, FileText, Box, Shapes, RotateCcw,
  Wrench, Container, Search, Zap, Cpu, Globe, Database,
  CheckSquare, TrendingUp, Cog, GitBranch, GitGraph, Sparkles,
  FileJson, Server, BarChart, Bot, Shield, Gamepad2, BookOpen,
}

const categoryIcons: Record<string, React.ElementType> = {
  beginner: BookOpen,
  intermediate: Layers,
  advanced: Zap,
  "software-engineering": GitBranch,
  specialization: Sparkles,
}

const categoryLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  "software-engineering": "Software Engineering",
  specialization: "Specializations",
}

export default function CurriculumPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredTopics = topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(search.toLowerCase()) ||
      topic.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(topics.map((t) => t.category)))

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Curriculum</h1>
            <p className="text-muted-foreground mt-1">
              {topics.length} topics · {topics.reduce((a, t) => a + t.total_lessons, 0)} lessons
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] || BookOpen
              return (
                <TabsTrigger key={cat} value={cat} className="gap-1.5">
                  <Icon className="h-4 w-4" />
                  {categoryLabels[cat] || cat}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {["all", ...categories].map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid gap-4">
                {filteredTopics.map((topic, i) => {
                  const Icon = iconMap[topic.icon] || BookOpen
                  const progress = Math.round((topic.completed_lessons / topic.total_lessons) * 100)
                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link href={`/lessons/${topic.lessons[0]}`}>
                        <Card className="group hover:border-primary/30 transition-all duration-300 cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${
                                topic.category === "beginner" ? "from-emerald-500/20 to-green-500/20" :
                                topic.category === "intermediate" ? "from-amber-500/20 to-yellow-500/20" :
                                topic.category === "advanced" ? "from-rose-500/20 to-pink-500/20" :
                                topic.category === "software-engineering" ? "from-cyan-500/20 to-teal-500/20" :
                                "bg-primary/20"
                              } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Icon className={`h-6 w-6 ${
                                  topic.category === "beginner" ? "text-emerald-400" :
                                  topic.category === "intermediate" ? "text-amber-400" :
                                  topic.category === "advanced" ? "text-rose-400" :
                                  topic.category === "software-engineering" ? "text-primary" :
                                  "text-primary"
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                    {topic.title}
                                  </h3>
                                  <Badge variant={topic.category as any}>
                                    {categoryLabels[topic.category] || topic.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>
                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-4 w-4" />
                                    {topic.completed_lessons}/{topic.total_lessons} lessons
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Zap className="h-4 w-4 text-amber-400" />
                                    {topic.xp_reward} XP
                                  </span>
                                </div>
                                <div className="mt-3 flex items-center gap-3">
                                  <Progress value={progress} className="h-1.5 flex-1" />
                                  <span className="text-xs font-medium text-muted-foreground">{progress}%</span>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  )
}
