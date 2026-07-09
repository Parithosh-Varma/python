"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BookOpen,
  Code2,
  Trophy,
  Sparkles,
  Blocks,
  GraduationCap,
  Zap,
  Route,
  StickyNote,
  Bot,
  Shield,
  Star,
  GitBranch,
  ChevronRight,
  CheckCircle2,
  Infinity,
  Layers,
  Cpu,
  Globe,
  BarChart,
  Gamepad2,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

const features = [
  { icon: BookOpen, title: "Complete Curriculum", desc: "Hundreds of lessons from zero to advanced" },
  { icon: Code2, title: "Interactive Coding", desc: "Browser-based Python code editor with live execution" },
  { icon: Trophy, title: "Gamification", desc: "XP, levels, streaks, and achievements" },
  { icon: Sparkles, title: "AI Tutor", desc: "AI-powered learning assistant" },
  { icon: Blocks, title: "Real Projects", desc: "200+ real-world Python projects" },
  { icon: Route, title: "Smart Roadmap", desc: "Personalized learning path" },
]

const specializations = [
  { icon: Globe, title: "Web Dev", desc: "Django, Flask, FastAPI", color: "from-blue-500 to-cyan-500" },
  { icon: BarChart, title: "Data Science", desc: "NumPy, Pandas, ML", color: "from-green-500 to-emerald-500" },
  { icon: Cpu, title: "AI & ML", desc: "TensorFlow, PyTorch", color: "from-purple-500 to-pink-500" },
  { icon: Gamepad2, title: "Game Dev", desc: "Pygame, Arcade", color: "from-orange-500 to-red-500" },
  { icon: Shield, title: "Cybersecurity", desc: "Security tools", color: "from-red-500 to-rose-500" },
  { icon: Bot, title: "Automation", desc: "Scripts, scraping", color: "from-indigo-500 to-purple-500" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              PyMaster
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/auth">
              <Button variant="gradient">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge variant="info" className="mb-6 px-4 py-1.5 text-sm">
                <Zap className="h-3.5 w-3.5 mr-1" /> The Ultimate Free Python Platform
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Master Python from{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Zero to Expert
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              The most comprehensive Python learning platform. Interactive lessons, real projects,
              AI tutoring, and a complete curriculum that takes you from absolute beginner to professional Python developer.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
              <Link href="/auth">
                <Button size="xl" variant="gradient">
                  Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button size="xl" variant="outline">
                  View Curriculum
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} custom={4} className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> No credit card</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> 300+ lessons</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> 200+ projects</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-400" /> AI-powered tutor</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Master Python
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete learning ecosystem designed to take you from your first print statement
              to building production applications.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border bg-card/30 backdrop-blur-sm p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Specializations
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your path and dive deep into any Python specialization
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group relative rounded-2xl border bg-card/30 backdrop-blur-sm p-6 overflow-hidden hover:border-transparent transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4`}>
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "300+", label: "Lessons", icon: BookOpen },
              { num: "200+", label: "Projects", icon: Blocks },
              { num: "1000+", label: "Quiz Questions", icon: GraduationCap },
              { num: "50+", label: "Hours of Content", icon: Infinity },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <s.icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-purple-600/20 border border-purple-500/20 p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Ready to Become a{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Python Expert
                </span>
                ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of learners. Start your journey today — completely free.
              </p>
              <Link href="/auth">
                <Button size="xl" variant="gradient">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold">Python Master Academy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2026 Python Master Academy. Built with <span className="text-red-400">♥</span> for the Python community.
          </p>
          <div className="flex items-center gap-4">
            <GitBranch className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            <Star className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  )
}
