import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderKanban, GitBranch, Wrench, Layers, MessageSquareQuote, Mail, Inbox } from 'lucide-react'
import { useAdminApi } from '../../components/admin/useAdmin'
import { PageHeader, Card, Notice, Spinner } from '../../components/admin/AdminUI'

const COUNT_META = {
  projects: { label: 'Projects', icon: FolderKanban, to: '/admin/projects' },
  experience: { label: 'Experience', icon: GitBranch, to: '/admin/experience' },
  skills: { label: 'Skills', icon: Wrench, to: '/admin/skills' },
  services: { label: 'Services', icon: Layers, to: '/admin/services' },
  testimonials: { label: 'Testimonials', icon: MessageSquareQuote, to: '/admin/testimonials' },
  social_links: { label: 'Social links', icon: Mail, to: '/admin/contact' },
}

export default function Dashboard() {
  const admin = useAdminApi()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    admin.get('/admin/overview').then(setData).catch((e) => setError(e.message))
  }, [admin])

  if (error) return <Notice type="error">{error}</Notice>
  if (!data) {
    return (
      <div className="grid place-items-center py-20">
        <Spinner className="h-6 w-6 text-brand-400" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Overview" description="A snapshot of your content and recent messages." />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(data.counts).map(([key, count]) => {
          const meta = COUNT_META[key] || { label: key, icon: Layers, to: '/admin' }
          const Icon = meta.icon
          return (
            <Link key={key} to={meta.to}>
              <Card className="!p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display text-2xl font-bold text-white">{count}</p>
                <p className="text-xs text-slate-400">{meta.label}</p>
              </Card>
            </Link>
          )
        })}
        <Link to="/admin/messages">
          <Card className="!p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-fuchsia/15 text-accent-fuchsia">
              <Inbox className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold text-white">
              {data.messages_unread}
              <span className="text-sm font-normal text-slate-500"> / {data.messages_total}</span>
            </p>
            <p className="text-xs text-slate-400">Unread messages</p>
          </Card>
        </Link>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">Recent messages</h2>
          <Link to="/admin/messages" className="text-sm text-brand-300 hover:underline">View all</Link>
        </div>
        {data.recent_messages.length === 0 ? (
          <Card className="text-center text-slate-400">No messages yet.</Card>
        ) : (
          <ul className="space-y-3">
            {data.recent_messages.map((m) => (
              <li key={m.id}>
                <Card className="!p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{m.subject}</p>
                      <p className="truncate text-xs text-slate-400">{m.name} · {m.email}</p>
                    </div>
                    {!m.is_read && <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-300">New</span>}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
