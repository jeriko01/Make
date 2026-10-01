// Supabase client for ADMIN AUTH ONLY (login/logout, session).
// Uses the public anon key. All data reads/writes go through the FastAPI backend.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// When not configured, expose a null client so the admin login can show a clear
// "not configured" message instead of crashing the whole app.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
