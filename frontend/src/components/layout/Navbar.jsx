import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import MakeLogo from '../common/MakeLogo'

const NAV_LINKS = [
  { to: '/',         label: 'Home',     exact: true },
  { to: '/skills',   label: 'Skills' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/support',  label: 'Support' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navBase = `pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-xl px-4 sm:px-6 py-2.5 border transition-all duration-300 ${
    scrolled
      ? 'bg-[#0e0e0e]/90 border-[#1e261d] shadow-2xl shadow-black/80 backdrop-blur-xl'
      : 'border-white/5 bg-[#0e0e0e]/40 backdrop-blur-md'
  }`

  function getLinkClass({ isActive }) {
    return `relative flex items-center px-1 py-1 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-white'
        : 'text-[#8a949e] hover:text-white'
    }`
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-3 sm:pt-4">
      <nav aria-label="Primary" className={navBase}>

        <Link
          to="/"
          aria-label="Make — home"
          className="flex items-center gap-2 font-display transition-opacity hover:opacity-90 focus-visible:rounded-lg"
        >
          <MakeLogo size="sm" />
        </Link>

        <ul className="mx-auto hidden items-center gap-7 md:flex" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.exact}
                className={({ isActive }) =>
                  `group relative flex items-center gap-0.5 px-1 py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[#8a949e] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-px left-0 h-[1.5px] rounded-full bg-[#52fe7d] transition-all duration-200 ${
                        isActive
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <Link
            to="/support"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#39A751] hover:bg-[#2f9946] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#39A751]/20 transition-all active:scale-[0.98]"
          >
            <span>Let&apos;s collaborate</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="pointer-events-auto ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-[#1e261d] bg-[#141714] text-[#d2d7dc] hover:text-white transition md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto mt-2 w-full max-w-5xl rounded-xl border border-[#1e261d] bg-[#141714]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
        >
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.exact}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-[#d2d7dc] hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span>{l.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-[#1e261d] pt-4">
            <Link
              to="/support"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#39A751] hover:bg-[#2f9946] py-3 text-sm font-bold text-white shadow-md transition"
              onClick={() => setOpen(false)}
            >
              <span>Let&apos;s collaborate</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
