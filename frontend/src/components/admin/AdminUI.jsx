import { AlertTriangle, CheckCircle2, X } from 'lucide-react'
import { Spinner } from '../common/ui'

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-200">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`glass rounded-2xl p-6 border border-blue-500/30 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function Button({
  variant = 'primary',
  busy = false,
  type = 'button',
  children,
  className = '',
  disabled = false,
  ...props
}) {
  const base =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'danger'
      ? 'btn bg-red-600/90 text-white hover:bg-red-500 border border-red-400/30 shadow-lg shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98]'
      : 'btn-ghost'

  return (
    <button
      type={type}
      className={`${base} ${className}`}
      disabled={Boolean(busy || disabled)}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  )
}

export function Field({ label, error, help, children, required }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-semibold text-white">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      {children}
      {help && <p className="mt-1 text-xs text-slate-300">{help}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-blue-500/30 bg-[#09153a]/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-300 outline-none transition focus:border-blue-400 focus:bg-[#0c1c4d] focus:ring-2 focus:ring-blue-400/20'

export function Input(props) {
  return <input className={inputCls} {...props} />
}
export function Textarea(props) {
  return <textarea className={inputCls} rows={4} {...props} />
}
export function Select({ children, ...props }) {
  return (
    <select className={`${inputCls} appearance-none`} {...props}>
      {children}
    </select>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2 text-sm text-slate-300"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-brand-500' : 'bg-white/15'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-[22px]' : 'left-0.5'}`}
        />
      </span>
      {label}
    </button>
  )
}

export function Notice({ type = 'success', children, onClose }) {
  const styles = {
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    error: 'border-red-500/30 bg-red-500/10 text-red-300',
  }[type]
  const Icon = type === 'success' ? CheckCircle2 : AlertTriangle
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${styles}`} role="status">
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{children}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export function Modal({ title, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto glass-strong rounded-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="btn-ghost !p-2" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}

export { Spinner }
