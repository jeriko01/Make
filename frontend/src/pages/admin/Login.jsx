import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Spinner } from '../../components/common/ui'

export default function AdminLogin() {
  const { signIn, configured, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const from = location.state?.from?.pathname || '/admin'
  if (isAuthenticated) navigate(from, { replace: true })

  async function onSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-indigo" />
          <span className="font-display text-xl font-bold text-white">Make</span>
        </Link>

        <div className="glass rounded-3xl p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-lg font-bold text-white">Admin sign in</h1>
              <p className="text-xs text-slate-400">Restricted area</p>
            </div>
          </div>

          {!configured && (
            <p className="mb-4 flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Supabase auth is not configured. Set VITE_SUPABASE_URL and
              VITE_SUPABASE_ANON_KEY in frontend/.env.
            </p>
          )}

          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm text-slate-300">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-brand-400"
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </p>
            )}

            <button type="submit" className="btn-primary" disabled={busy || !configured}>
              {busy ? <Spinner className="h-4 w-4" /> : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Accounts are created in the Supabase dashboard — there is no public signup.
        </p>
      </div>
    </div>
  )
}
