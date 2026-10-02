import { useEffect, useState } from 'react'

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 30000

    const tick = (now) => {
      const elapsed = now - start
      const raw = Math.min(elapsed / duration, 1)
      const eased = raw < 0.5
        ? 2 * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 2) / 2
      setProgress(Math.round(eased * 100))

      if (raw < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setLeaving(true)
        setTimeout(() => onDone?.(), 520)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0e0e0e',
        transition: leaving ? 'opacity 0.5s ease, transform 0.5s ease' : 'none',
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'scale(1.03)' : 'scale(1)',
        pointerEvents: leaving ? 'none' : 'all',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-16px',
            borderRadius: '28px',
            background: 'radial-gradient(ellipse at center, rgba(82,254,125,0.2) 0%, transparent 70%)',
            animation: 'mkPulse 2.4s ease-in-out infinite',
          }} />

          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 88, height: 88, display: 'block', animation: 'mkSpin 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards' }}
          >
            <defs>
              <linearGradient id="plBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#192b19" />
                <stop offset="100%" stopColor="#0e0e0e" />
              </linearGradient>
              <linearGradient id="plStroke" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#52fe7d" />
                <stop offset="100%" stopColor="#39A751" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="38" height="38" rx="10" fill="url(#plBg)" stroke="#39A751" strokeOpacity="0.55" strokeWidth="1" />
            <path
              d="M9 28 L9 13 L20 22 L31 13 L31 28"
              stroke="url(#plStroke)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ strokeDasharray: 70, strokeDashoffset: 0, animation: 'mkDraw 1.2s ease forwards' }}
            />
          </svg>
        </div>

        <div style={{ width: 180 }}>
          <div style={{
            height: '2px',
            borderRadius: '999px',
            backgroundColor: '#1e261d',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              borderRadius: '999px',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #39A751, #52fe7d)',
              boxShadow: '0 0 10px rgba(82,254,125,0.5)',
              transition: 'width 0.1s linear',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mkPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
        @keyframes mkSpin {
          0%   { opacity: 0; transform: rotate(-15deg) scale(0.7); }
          100% { opacity: 1; transform: rotate(0deg)  scale(1); }
        }
        @keyframes mkDraw {
          from { stroke-dashoffset: 70; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}
