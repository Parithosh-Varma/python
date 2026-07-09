"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"
import {
  IconDashboard,
  IconCurriculum,
  IconPlayground,
  IconProjects,
  IconAITutor,
  IconAward,
  IconBrain,
  IconTarget,
  IconFlashlight,
} from "@/components/icons"
import { useState } from "react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
}

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-semibold tracking-tight">PyMaster</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/curriculum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Curriculum
            </Link>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/playground" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Playground
            </Link>
            <Link href="/auth?mode=signin">
              <Button variant="ghost" size="sm" className="text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth?mode=signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
                Sign Up <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 p-4 bg-background space-y-3">
            <Link href="/curriculum" className="block text-sm py-2">Curriculum</Link>
            <Link href="/projects" className="block text-sm py-2">Projects</Link>
            <Link href="/playground" className="block text-sm py-2">Playground</Link>
            <Link href="/auth?mode=signin" className="block text-sm py-2">Sign In</Link>
            <Link href="/auth?mode=signup">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                Sign Up <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        <motion.div
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl px-6 text-center relative"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-600/20 bg-blue-600/5 px-4 py-1.5 text-xs font-medium text-blue-400 tracking-wide uppercase">
              The best free Python platform
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            Master Python
            <br />
            <span className="text-gradient">Zero to Expert</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            The most comprehensive free Python learning platform. Interactive lessons,
            real projects, AI tutoring, and a complete curriculum that takes you from
            absolute beginner to professional Python developer.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-4">
            <Link href="/auth?mode=signup">
              <Button size="xl" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 text-base px-8 h-14 rounded-2xl">
                Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/curriculum">
              <Button size="xl" variant="outline" className="text-base px-8 h-14 rounded-2xl">
                View Full Curriculum
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> No credit card</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> 300+ lessons</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> 200+ projects</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-blue-400" /> AI tutor included</span>
          </motion.div>
        </motion.div>
      </section>

      {/* [01] Stats bar — cartesia badge style */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [01]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight"
            >
              The platform built for <span className="text-gradient">results</span>
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-10 text-center"
          >
            {[
              { num: "300+", label: "Lessons", sub: "From print() to asyncio" },
              { num: "200+", label: "Projects", sub: "Real-world portfolio" },
              { num: "1,000+", label: "Quiz Questions", sub: "Test your knowledge" },
              { num: "100%", label: "Free Forever", sub: "No credit card needed" },
            ].map((s, i) => (
              <motion.div key={s.label} variants={fadeUp} custom={i} className="space-y-1">
                <div className="text-4xl md:text-5xl font-bold text-gradient">{s.num}</div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* [02] Product cards — cartesia Sonic/Ink/Line style */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [02]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight"
            >
              Everything you need in <span className="text-gradient">one platform</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              PyMaster replaces 10 tools with one integrated experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: IconCurriculum,
                title: "Curriculum",
                desc: "300+ lessons organized from zero to advanced. Theory, practice, quizzes, and flashcards in every module.",
                href: "/curriculum",
              },
              {
                icon: IconPlayground,
                title: "Playground",
                desc: "Write and run Python in your browser. No setup, no config. Instant feedback with every exercise.",
                href: "/playground",
              },
              {
                icon: IconAITutor,
                title: "AI Tutor",
                desc: "Get instant explanations, code reviews, and personalized guidance. Like having a senior dev beside you.",
                href: "/ai-tutor",
              },
              {
                icon: IconProjects,
                title: "Projects",
                desc: "Build 200+ real-world projects — CLI tools, APIs, data pipelines, ML models. Portfolio-ready.",
                href: "/projects",
              },
              {
                icon: IconAward,
                title: "Certificates",
                desc: "Earn verifiable certificates. From Beginner to Python Master. Prove your skills to employers.",
                href: "/certificates",
              },
              {
                icon: IconDashboard,
                title: "Dashboard",
                desc: "Track your XP, streaks, achievements, and progress. Leaderboards and smart recommendations.",
                href: "/dashboard",
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                >
                  <Link
                    href={item.href}
                    className="group block p-6 rounded-2xl border border-border/50 hover:border-blue-600/30 transition-all duration-500 hover:bg-blue-600/[0.02] h-full"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <Icon className="h-6 w-6 text-blue-400" />
                      <ExternalLink className="h-4 w-4 text-muted-foreground/30 group-hover:text-blue-400/60 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {item.title}
                      <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* [03] Curriculum preview — cartesia deployment style */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [03]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight"
            >
              From <span className="text-gradient">zero</span> to professional
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              Every topic you need. Nothing you don&apos;t.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                level: "Beginner",
                icon: IconTarget,
                topics: [
                  "Python Setup & Syntax",
                  "Variables & Data Types",
                  "Control Flow",
                  "Functions",
                  "Data Structures",
                  "File I/O",
                  "Error Handling",
                ],
              },
              {
                level: "Intermediate",
                icon: IconFlashlight,
                topics: [
                  "OOP & Classes",
                  "Decorators & Closures",
                  "Generators & Iterators",
                  "Context Managers",
                  "Regular Expressions",
                  "Modules & Packages",
                  "Testing with Pytest",
                ],
              },
              {
                level: "Advanced",
                icon: IconBrain,
                topics: [
                  "Asyncio & Concurrency",
                  "Networking & APIs",
                  "Databases & SQL",
                  "Performance Profiling",
                  "Python Internals (GIL, Bytecode)",
                  "Metaclasses & Descriptors",
                  "System Design",
                ],
              },
            ].map((col, i) => {
              const Icon = col.icon
              return (
                <motion.div
                  key={col.level}
                  variants={fadeUp}
                  custom={i}
                  className="p-6 rounded-2xl border border-border/50 hover:border-blue-600/30 transition-all duration-500"
                >
                  <Icon className="h-8 w-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold text-lg mb-1">{col.level}</h3>
                  <p className="text-xs text-muted-foreground mb-5">
                    {i === 0 ? "Start here, no experience needed" : i === 1 ? "Build on your foundation" : "Expert-level mastery"}
                  </p>
                  <ul className="space-y-3">
                    {col.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={3}
            className="text-center mt-10"
          >
            <Link href="/curriculum">
              <Button variant="outline" size="lg" className="rounded-2xl">
                View Full Curriculum <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* [04] Flexibility — cartesia deployment section style */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [04]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight"
            >
              Learn your way, <span className="text-gradient">anywhere</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              PyMaster works wherever you do. Same progress, same experience, on every device.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Desktop",
                desc: "Full-featured experience with the interactive code editor, side-by-side lessons, and multi-window workflow.",
              },
              {
                title: "Tablet",
                desc: "Optimized touch interface for reading lessons, taking quizzes, and reviewing flashcards on the go.",
              },
              {
                title: "Mobile",
                desc: "Quick review sessions, daily streaks, and flashcards. Never break your learning chain.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="p-8 rounded-2xl border border-border/50 text-center hover:border-blue-600/30 transition-all duration-500"
              >
                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* [05] FAQ */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [05]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold mt-4 mb-4 tracking-tight"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                q: "Is PyMaster really free?",
                a: "Yes. 100% free. No credit card, no trial, no hidden paid tiers. Every lesson, project, quiz, and feature is available to everyone.",
              },
              {
                q: "Do I need prior programming experience?",
                a: "No. PyMaster is designed for absolute beginners. Start with Python installation and go step by step to advanced topics.",
              },
              {
                q: "How is this different from other platforms?",
                a: "PyMaster combines a structured curriculum, interactive coding environment, real projects, AI tutoring, and gamification — all free. Most platforms charge for even basic features.",
              },
              {
                q: "Can I earn certificates?",
                a: "Yes, 8 certificates ranging from Beginner Python to Python Master. Complete the required lessons and projects to earn them.",
              },
              {
                q: "How long does it take to complete?",
                a: "Most learners complete Beginner in 2-4 weeks and reach Advanced in 4-6 months. It depends on your pace — the full curriculum has 300+ lessons and 200+ projects.",
              },
            ].map((faq, i) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                custom={i}
                className="border-b border-border/50 pb-6"
              >
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* [06] CTA — cartesia two-option style */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={fadeUp} custom={0} className="text-sm font-mono text-blue-400/60">
              [06]
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight"
            >
              Start your journey.
              <br />
              <span className="text-gradient">It's free.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-muted-foreground mb-10 max-w-md mx-auto"
            >
              No credit card. No time limit. Just the best way to learn Python.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/auth?mode=signup">
                <Button size="xl" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 text-base px-10 h-14 rounded-2xl">
                  Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/curriculum">
                <Button size="xl" variant="outline" className="text-base px-10 h-14 rounded-2xl">
                  View Full Curriculum
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-6 w-6 rounded" />
              <span className="text-sm font-medium">PyMaster</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <Link href="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              <Link href="/playground" className="hover:text-foreground transition-colors">Playground</Link>
              <Link href="/auth?mode=signin" className="hover:text-foreground transition-colors">Sign In</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; 2026 PyMaster. Open source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
