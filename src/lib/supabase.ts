import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null as any
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { flowType: "pkce" },
  })
}

export const supabase = createSupabaseClient()
