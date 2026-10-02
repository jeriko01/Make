import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard, User, Sparkles, Info, GitBranch, Wrench, FolderKanban,
  Layers, MessageSquareQuote, Mail, Inbox, Search, LogOut, Menu, X, ExternalLink,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/hero', label: 'Hero', icon: Sparkles },
  { to: '/admin/about', label: 'About', icon: Info },
  { to: '/admin/experience', label: 'Experience', icon: GitBranch },
  { to: '/admin/skills', label: 'Skills', icon: Wrench },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/services', label: 'Services', icon: Layers },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/contact', label: 'Contact & Social', icon: Mail },
  { to: '/admin/messages', label: 'Messages', icon: Inbox },
  { to: '/admin/seo', label: 'SEO', icon: Search },
]

export default function AdminLayout() {
  const { user, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? 'bg-gradient-to-r from-brand-600/80 to-accent-indigo/60 text-white'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-base-950">
      {/* Topbar (mobile) */}
      <div className="flex items-center justify-between border-b border-white/10 p-4 lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-500 to-accent-indigo" />
          <span className="font-display font-bold text-white">Make Admin</span>
        </Link>
        <button className="btn-ghost !p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside
          className={`border-r border-white/10 bg-base-900/60 lg:sticky lg:top-0 lg:h-screen ${
            open ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex h-full flex-col p-4">
            <Link to="/admin" className="mb-6 hidden items-center gap-2 lg:flex">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-indigo" />
              <span className="font-display text-lg font-bold text-white">Make Admin</span>
            </Link>
            {nav}
            <div className="mt-auto space-y-2 pt-6">
              <a href="/" target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-start !py-2 text-sm">
                <ExternalLink className="h-4 w-4" /> View site
              </a>
              <div className="rounded-xl border border-white/10 p-3 text-xs text-slate-400">
                <p className="truncate text-slate-300">{user?.email}</p>
                <button onClick={signOut} className="mt-2 flex items-center gap-2 text-red-400 hover:text-red-300">
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
