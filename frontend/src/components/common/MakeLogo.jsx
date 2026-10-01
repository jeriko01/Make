export default function MakeLogo({ className = '', iconOnly = false, size = 'md' }) {
  const sizeMap = {
    sm: { icon: 'h-8 w-8', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'h-9 w-9', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'h-11 w-11', text: 'text-xl', sub: 'text-[11px]' },
  }
  const current = sizeMap[size] || sizeMap.md

  return (
    <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Big M + Code Icon Badge */}
      <div className={`relative ${current.icon} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#39A751] via-[#52fe7d] to-[#2f9946] opacity-40 blur-[4px] transition group-hover:opacity-80" />

        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-full w-full drop-shadow-md"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="makeLogoBgDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e2b1a" />
              <stop offset="100%" stopColor="#0e0e0e" />
            </linearGradient>
            <linearGradient id="makeLogoGlowGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#52fe7d" />
              <stop offset="50%" stopColor="#39A751" />
              <stop offset="100%" stopColor="#237c37" />
            </linearGradient>
            <linearGradient id="makeCodeGlowGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#52fe7d" />
            </linearGradient>
          </defs>

          {/* Squircle base */}
          <rect
            x="1.5"
            y="1.5"
            width="41"
            height="41"
            rx="11"
            fill="url(#makeLogoBgDark)"
            stroke="#39A751"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />

          {/* Big Bold Modern M */}
          <path
            d="M10 32V18L18 26.5C20.2 28.8 23.8 28.8 26 26.5L34 18V32"
            stroke="url(#makeLogoGlowGreen)"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small Code Icon < / > */}
          <g>
            {/* < */}
            <path d="M15 13L12 15.5L15 18" stroke="url(#makeCodeGlowGreen)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* / */}
            <path d="M23 12L21 19" stroke="#52fe7d" strokeWidth="1.6" strokeLinecap="round" />
            {/* > */}
            <path d="M29 13L32 15.5L29 18" stroke="url(#makeCodeGlowGreen)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>

      {/* Brand text */}
      {!iconOnly && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-display ${current.text} font-black tracking-tight text-white transition-colors duration-200 group-hover:text-[#52fe7d]`}>
              MAKE
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#52fe7d] shadow-[0_0_8px_rgba(82,254,125,0.9)] animate-pulse" />
          </div>
          <span className={`${current.sub} font-semibold uppercase tracking-wider text-[#d2d7dc]`}>
            Web · Mobile Studio
          </span>
        </div>
      )}
    </div>
  )
}
