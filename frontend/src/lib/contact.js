import { api } from './api'
import { supabase, isSupabaseConfigured } from './supabase'

/**
 * Resilient contact submission:
 * 1. Tries FastAPI backend (/api/contact) first.
 * 2. If backend is offline, unreachable, or returns 503, transparently falls back to direct Supabase insertion.
 */
export async function submitContact(payload) {
  // Honeypot check: silently accept bots without storing
  if (payload.website) {
    return { ok: true }
  }

  // 1. Try backend API first
  try {
    const res = await api.post('/contact', payload)
    return res
  } catch (backendErr) {
    // 2. Direct Supabase fallback
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: payload.name.trim(),
              email: payload.email.trim().toLowerCase(),
              subject: payload.subject.trim(),
              message: payload.message.trim(),
              user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 500) : null,
            },
          ])

        if (!error) {
          return { ok: true, fallback: true }
        }
        console.error('Supabase direct insert error:', error)
      } catch (sbErr) {
        console.error('Supabase direct insert exception:', sbErr)
      }
    }

    if (backendErr.status === 503 || backendErr.message?.includes('Backend offline')) {
      throw new Error('Connection unavailable. Please email directly or try again in a moment.')
    }
    throw backendErr
  }
}
