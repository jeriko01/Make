import { AlertTriangle } from 'lucide-react'
import { Button } from './AdminUI'

export default function ConfirmDialog({ open, title = 'Are you sure?', message, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm glass-strong rounded-3xl p-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-500/15 text-red-400">
          <AlertTriangle className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-lg font-bold text-white">{title}</h2>
        {message && <p className="mt-2 text-sm text-slate-400">{message}</p>}
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} busy={busy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
