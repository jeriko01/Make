import { useCallback, useEffect, useState } from 'react'
import { Mail, MailOpen, Trash2 } from 'lucide-react'
import { useAdminApi } from '../../../components/admin/useAdmin'
import { PageHeader, Card, Notice, Spinner } from '../../../components/admin/AdminUI'
import ConfirmDialog from '../../../components/admin/ConfirmDialog'

export default function MessagesPanel() {
  const admin = useAdminApi()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setMessages(await admin.get('/admin/messages'))
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setLoading(false)
    }
  }, [admin])

  useEffect(() => {
    load()
  }, [load])

  async function toggleRead(m) {
    try {
      await admin.patch(`/admin/messages/${m.id}/read`, { is_read: !m.is_read })
      setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, is_read: !m.is_read } : x)))
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    }
  }

  async function confirmDelete() {
    setBusy(true)
    try {
      await admin.del(`/admin/messages/${toDelete.id}`)
      setToDelete(null)
      await load()
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setBusy(false)
    }
  }

  const unread = messages.filter((m) => !m.is_read).length

  return (
    <div>
      <PageHeader
        title="Messages"
        description={`Private inbox from the contact form. ${unread} unread.`}
      />
      {notice && (
        <div className="mb-4">
          <Notice type={notice.type} onClose={() => setNotice(null)}>{notice.text}</Notice>
        </div>
      )}

      {loading ? (
        <div className="grid place-items-center py-16">
          <Spinner className="h-6 w-6 text-brand-400" />
        </div>
      ) : messages.length === 0 ? (
        <Card className="text-center text-slate-400">No messages yet.</Card>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => (
            <li key={m.id}>
              <Card className={`!p-5 ${m.is_read ? '' : 'ring-1 ring-brand-500/30'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-white">{m.subject}</p>
                      {!m.is_read && (
                        <span className="chip border-brand-400/30 bg-brand-500/10 text-brand-300">New</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {m.name} · <a href={`mailto:${m.email}`} className="text-brand-300 hover:underline">{m.email}</a>
                      {m.created_at && ` · ${new Date(m.created_at).toLocaleString()}`}
                    </p>
                    <p className="mt-3 whitespace-pre-line text-sm text-slate-300">{m.message}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button onClick={() => toggleRead(m)} className="btn-ghost !px-2.5 !py-2" title={m.is_read ? 'Mark unread' : 'Mark read'}>
                      {m.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                    </button>
                    <button onClick={() => setToDelete(m)} className="btn-ghost !px-2.5 !py-2 !text-red-400" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete message?"
        message="This permanently removes the message."
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  )
}
