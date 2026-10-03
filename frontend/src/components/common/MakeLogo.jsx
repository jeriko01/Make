export default function MakeLogo({ className = '', iconOnly = false, size = 'md' }) {
  const sizeMap = {
    sm: { icon: 'h-8 w-8',  text: 'text-[17px]' },
    md: { icon: 'h-9 w-9',  text: 'text-[19px]' },
    lg: { icon: 'h-10 w-10', text: 'text-[22px]' },
  }
  const s = sizeMap[size] || sizeMap.md

  return (
    <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>

      {/* ── Icon Mark ── */}
      <div className={`relative ${s.icon} flex-shrink-0`}>
        {/* Outer glow */}
        <div className="absolute -inset-[3px] rounded-xl bg-[#38BDF8] opacity-0 blur-[6px] transition-all duration-300 group-hover:opacity-35" />

        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-full w-full"
          aria-hidden="true"
        >
          <defs>
            {/* Background gradient */}
            <linearGradient id="mkBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0E1E38" />
              <stop offset="100%" stopColor="#06080E" />
            </linearGradient>
            {/* M stroke gradient */}
            <linearGradient id="mkStroke" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Squircle background */}
          <rect
            x="1" y="1" width="38" height="38" rx="10"
            fill="url(#mkBg)"
            stroke="#1E2C4A"
            strokeOpacity="0.8"
            strokeWidth="1"
          />

          {/* Clean geometric M — two diagonal strokes meeting at center */}
          <path
            d="M9 28 L9 13 L20 22 L31 13 L31 28"
            stroke="url(#mkStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Wordmark ── */}
      {!iconOnly && (
        <span
          className={`font-display ${s.text} font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#38BDF8]`}
          style={{ letterSpacing: '-0.02em' }}
        >
          Make
        </span>
      )}
    </div>
  )
}
