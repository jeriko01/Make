import Reveal from './Reveal'

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <span className="section-eyebrow-lime mb-4 inline-block">
          {eyebrow}
        </span>
      )}
      <h2 className="section-heading">
        {title}
      </h2>
      {description && <p className="mt-4 text-base sm:text-lg text-[#d2d7dc]">{description}</p>}
    </Reveal>
  )
}

/** Branded placeholder used when no real image has been supplied yet. */
export function BrandPlaceholder({ label = 'Make', className = '' }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-[#161d15] to-[#0e0e0e] border border-[#1e261d] ${className}`}
      role="img"
      aria-label={`${label} placeholder image`}
    >
      <div className="text-center">
        <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-gradient-to-br from-[#39A751] to-[#1e2b1a] shadow-md shadow-[#39A751]/30" />
        <span className="font-display text-sm font-bold tracking-widest text-[#d2d7dc]">
          {label.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export function EmptyState({ children }) {
  return (
    <div className="rounded-2xl border border-[#1e261d] bg-[#141714] p-10 text-center text-[#d2d7dc] shadow-xl">{children}</div>
  )
}
