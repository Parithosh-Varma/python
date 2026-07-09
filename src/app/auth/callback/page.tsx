"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import * as db from "@/lib/supabase-service"
import { useStore } from "@/lib/store"
import { Suspense } from "react"

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { syncFromSupabase } = useStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get("code")
    if (!code) {
      const hash = window.location.hash
      if (hash && hash.includes("access_token")) {
        setError("session_in_hash")
        return
      }
      router.replace("/auth?error=no_code")
      return
    }

    ;(async () => {
      try {
        if (!supabase) {
          router.replace("/auth?error=no_supabase_config")
          return
        }

        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          console.error("PKCE exchange failed:", exchangeError)
          router.replace(`/auth?error=exchange_failed&message=${encodeURIComponent(exchangeError.message)}`)
          return
        }

        if (data.user) {
          await syncFromSupabase(data.user.id)
        }

        router.replace("/dashboard")
      } catch (err) {
        console.error("Auth callback error:", err)
        router.replace("/auth?error=auth_callback_error")
      }
    })()
  }, [searchParams, router, syncFromSupabase])

  if (error === "session_in_hash") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <img src="/logo.svg" alt="" className="h-14 w-14 mx-auto mb-4 rounded-2xl animate-pulse" />
          <p className="text-muted-foreground">Detecting session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <img src="/logo.svg" alt="" className="h-14 w-14 mx-auto mb-4 rounded-2xl animate-pulse" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <img src="/logo.svg" alt="" className="h-14 w-14 animate-pulse rounded-2xl" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  )
}
