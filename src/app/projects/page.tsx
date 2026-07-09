"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { projects } from "@/lib/data/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Blocks,
  Search,
  Clock,
  Zap,
  ArrowRight,
  BookOpen,
  GitBranch,
  ExternalLink,
  Filter,
} from "lucide-react"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("all")

  const filtered = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesDiff = difficulty === "all" || p.difficulty === difficulty
    return matchesSearch && matchesDiff
  })

  const categories = Array.from(new Set(projects.map((p) => p.difficulty)))

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">{projects.length} projects to build your portfolio</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={difficulty} onValueChange={setDifficulty}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value={difficulty} className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group h-full hover:border-blue-600/30 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-700/20 to-blue-400/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Blocks className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant={project.difficulty as any}>{project.difficulty}</Badge>
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {project.estimated_time}min
                        </span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <Zap className="h-4 w-4" /> {project.xp_reward} XP
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Button size="sm" className="flex-1">
                          Start Project <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
