"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import * as db from "@/lib/supabase-service"
import { useStore } from "@/lib/store"
import { Suspense } from "react"

async function ensureProfileAndSync(user: any, syncFromSupabase: (userId: string) => Promise<void>) {
  await db.upsertProfile({
    id: user.id,
    name:
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "Learner",
    avatar_url:
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.email?.split("@")[0] || "Learner"
      )}&background=022756&color=fff&bold=true`,
  })
  await syncFromSupabase(user.id)
}

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { syncFromSupabase } = useStore()

  useEffect(() => {
    const code = searchParams.get("code")

    if (!code) {
      const hash = window.location.hash
      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1))
        const access_token = params.get("access_token")
        const refresh_token = params.get("refresh_token")

        if (access_token && refresh_token && supabase) {
          ;(async () => {
            try {
              const { data, error: sessionError } = await supabase.auth.setSession({
                access_token,
                refresh_token,
              })
              if (sessionError) {
                router.replace(
                  `/auth?error=session_failed&message=${encodeURIComponent(sessionError.message)}`
                )
                return
              }
              if (data.user) {
                await ensureProfileAndSync(data.user, syncFromSupabase)
              }
              router.replace("/dashboard")
            } catch (err: any) {
              console.error("Auth callback error (hash path):", err)
              router.replace(
                `/auth?error=auth_callback_error&message=${encodeURIComponent(err?.message || "unknown")}`
              )
            }
          })()
          return
        }
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
          router.replace(
            `/auth?error=exchange_failed&message=${encodeURIComponent(exchangeError.message)}`
          )
          return
        }

        if (data.user) {
          await ensureProfileAndSync(data.user, syncFromSupabase)
        }

        router.replace("/dashboard")
      } catch (err: any) {
        console.error("Auth callback error (code path):", err)
        router.replace(
          `/auth?error=auth_callback_error&message=${encodeURIComponent(err?.message || "unknown")}`
        )
      }
    })()
  }, [searchParams, router, syncFromSupabase])

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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <img src="/logo.svg" alt="" className="h-14 w-14 animate-pulse rounded-2xl" />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  )
}
