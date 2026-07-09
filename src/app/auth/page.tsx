"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { supabase } from "@/lib/supabase"
import * as db from "@/lib/supabase-service"
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <img src="/logo.svg" alt="" className="h-14 w-14 animate-pulse rounded-2xl" />
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}

function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useStore()
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    if (!supabase) {
      toast.error("Supabase not configured.")
      return
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) toast.error(error.message)
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!supabase) {
        await new Promise((r) => setTimeout(r, 1000))
        const userName = isLogin ? email.split("@")[0] : name
        setUser({
          id: "demo_" + Math.random().toString(36).substring(2),
          email,
          name: userName,
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=022756&color=fff&bold=true`,
          xp: 0, level: 1, streak: 0, longest_streak: 0,
          total_hours: 0, completed_lessons: 0, completed_projects: 0,
          created_at: new Date().toISOString(),
        })
        toast.success(isLogin ? "Welcome back!" : "Account created!")
        router.push("/dashboard")
        return
      }
      const { data, error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { data: { name } } })
      if (error) throw error
      if (data.user) {
        const userName = data.user.user_metadata?.name || data.user.email?.split("@")[0] || "Learner"
        await db.upsertProfile({
          id: data.user.id,
          name: userName,
          avatar_url: data.user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=022756&color=fff&bold=true`,
        })
        await useStore.getState().syncFromSupabase(data.user.id)
        toast.success(isLogin ? "Welcome back!" : "Account created!")
        router.push("/dashboard")
      }
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #173626 0%, #0F2A1D 100%)' }}>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative text-center">
          <img src="/logo.svg" alt="" className="h-20 w-20 mx-auto mb-6 rounded-2xl shadow-2xl" />
          <h1 className="text-4xl font-bold text-white mb-3">PyMaster</h1>
          <p className="text-white/80 text-lg max-w-sm mx-auto leading-relaxed">
            The best free platform to learn Python. From zero to expert, completely free.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span>300+ Lessons</span>
            <span>200+ Projects</span>
            <span>AI Tutor</span>
            <span>Certificates</span>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden text-center mb-8">
            <img src="/logo.svg" alt="" className="h-14 w-14 mx-auto mb-4 rounded-2xl" />
            <h1 className="text-2xl font-bold">PyMaster</h1>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            {isLogin ? "Sign in to continue your journey" : "Start learning Python for free"}
          </p>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full mb-6 h-11"
            onClick={handleGoogleAuth}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 text-xs uppercase text-muted-foreground mb-6">
            <div className="flex-1 border-t" />
            <span className="shrink-0">Or with email</span>
            <div className="flex-1 border-t" />
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 h-11"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 h-11"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-[#173626] hover:bg-[#173626]/90 text-[#F4F1E8]" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please wait...</>
              ) : (
                <>{isLogin ? "Sign In" : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-white/90 font-medium transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
