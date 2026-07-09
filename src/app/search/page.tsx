"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { lessons } from "@/lib/data/lessons"
import { topics } from "@/lib/data/curriculum"
import { projects } from "@/lib/data/projects"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  Blocks,
  GraduationCap,
  FileText,
  ArrowRight,
  Zap,
  Clock,
} from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const searchResults = {
    lessons: Object.values(lessons).filter(
      (l) =>
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.description.toLowerCase().includes(query.toLowerCase())
    ),
    topics: topics.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
    ),
    projects: projects.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    ),
  }

  const totalResults = searchResults.lessons.length + searchResults.topics.length + searchResults.projects.length

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search lessons, topics, projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 text-lg rounded-2xl"
            autoFocus
          />
        </div>

        {query && (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Found {totalResults} results for "{query}"
            </p>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All ({totalResults})</TabsTrigger>
                <TabsTrigger value="lessons">Lessons ({searchResults.lessons.length})</TabsTrigger>
                <TabsTrigger value="topics">Topics ({searchResults.topics.length})</TabsTrigger>
                <TabsTrigger value="projects">Projects ({searchResults.projects.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {searchResults.lessons.slice(0, 3).map((l) => (
                  <SearchResultCard key={l.id} href={`/lessons/${l.id}`} icon={BookOpen} color="bg-primary">
                    <div>
                      <p className="font-medium">{l.title}</p>
                      <p className="text-sm text-muted-foreground">{l.description}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <Badge variant={l.difficulty as any}>{l.difficulty}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {l.estimated_time}min</span>
                      <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {l.xp_reward} XP</span>
                    </div>
                  </SearchResultCard>
                ))}
                {searchResults.topics.slice(0, 3).map((t) => (
                  <SearchResultCard key={t.id} href="/curriculum" icon={BookOpen} color="from-emerald-500 to-green-500">
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    </div>
                    <Badge variant={t.category as any}>{t.category}</Badge>
                  </SearchResultCard>
                ))}
                {searchResults.projects.slice(0, 3).map((p) => (
                  <SearchResultCard key={p.id} href="/projects" icon={Blocks} color="from-amber-500 to-orange-500">
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                    </div>
                    <Badge variant={p.difficulty as any}>{p.difficulty}</Badge>
                  </SearchResultCard>
                ))}
              </TabsContent>

              <TabsContent value="lessons" className="space-y-4">
                {searchResults.lessons.map((l) => (
                  <SearchResultCard key={l.id} href={`/lessons/${l.id}`} icon={BookOpen} color="bg-primary">
                    <div className="flex-1">
                      <p className="font-medium">{l.title}</p>
                      <p className="text-sm text-muted-foreground">{l.description}</p>
                    </div>
                    <Badge variant={l.difficulty as any}>{l.difficulty}</Badge>
                  </SearchResultCard>
                ))}
              </TabsContent>

              <TabsContent value="topics" className="space-y-4">
                {searchResults.topics.map((t) => (
                  <SearchResultCard key={t.id} href="/curriculum" icon={GraduationCap} color="from-emerald-500 to-green-500">
                    <div className="flex-1">
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    </div>
                    <Badge variant={t.category as any}>{t.category}</Badge>
                  </SearchResultCard>
                ))}
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                {searchResults.projects.map((p) => (
                  <SearchResultCard key={p.id} href="/projects" icon={Blocks} color="from-amber-500 to-orange-500">
                    <div className="flex-1">
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                    </div>
                    <Badge variant={p.difficulty as any}>{p.difficulty}</Badge>
                  </SearchResultCard>
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}

        {!query && (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Search Everything</h2>
            <p className="text-muted-foreground">
              Search across lessons, topics, projects, notes, and documentation
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function SearchResultCard({
  href,
  icon: Icon,
  color,
  children,
}: {
  href: string
  icon: React.ElementType
  color: string
  children: React.ReactNode
}) {
  return (
    <Link href={href}>
      <Card className="group hover:border-primary/30 transition-all cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">{children}</div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-2 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
