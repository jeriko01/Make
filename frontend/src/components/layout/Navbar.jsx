import { useEffect, useState, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X, Globe } from 'lucide-react'
import MakeLogo from '../common/MakeLogo'
import { useLanguage } from '../../context/LanguageContext'

const NAV_LINKS = [
  { to: '/',         label: 'Home',     exact: true },
  { to: '/skills',   label: 'Skills' },
  { to: '/services', label: 'Services' },
  { to: '/about-us', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/support',  label: 'Support' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const { lang, setLang } = useLanguage()

  const navBase = `pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-xl px-4 sm:px-6 py-2.5 border transition-all duration-300 ${
    scrolled
      ? 'bg-[#06080E]/90 border-[#1E2C4A] shadow-2xl shadow-black/80 backdrop-blur-xl'
      : 'border-white/5 bg-[#06080E]/40 backdrop-blur-md'
  }`

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

        {/* Nav links — centered with flex-1 */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-6" role="list">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.exact}
                className={({ isActive }) =>
                  `group relative flex items-center gap-0.5 px-1 py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[#94A3B8] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {lang === 'so'
                      ? l.to === '/' ? 'Hoyga'
                        : l.to === '/skills' ? 'Xirfadaha'
                        : l.to === '/services' ? 'Adeegyada'
                        : l.to === '/about-us' ? 'Nagu Saabsan'
                        : l.to === '/projects' ? 'Mashaariicda'
                        : 'Taageero'
                      : l.label}
                    <span
                      className={`absolute -bottom-px left-0 h-[1.5px] rounded-full bg-[#38BDF8] transition-all duration-200 ${
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

        {/* Right side: Globe (between Support nav & Collaborate btn) + Collaborate */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* Globe icon — sits between the last nav link (Support) and Collaborate */}
          <div className="relative flex items-center justify-center" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center justify-center p-1.5 text-[#38BDF8] hover:text-white transition-colors"
              aria-label="Select Language"
              title="Select Language / Dooro Luuqadda"
            >
              <Globe className="h-4 w-4" />
            </button>

            {langOpen && (
              <div
                className="absolute top-full right-0 mt-2 py-2 px-3 z-50 flex flex-col gap-1.5 bg-[#06080E]/95 backdrop-blur-md rounded-lg shadow-xl min-w-[95px]"
              >
                <button
                  type="button"
                  onClick={() => { setLang('en'); setLangOpen(false) }}
                  className={`text-xs text-left transition-colors ${
                    lang === 'en' ? 'text-[#38BDF8] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => { setLang('so'); setLangOpen(false) }}
                  className={`text-xs text-left transition-colors ${
                    lang === 'so' ? 'text-[#38BDF8] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Somali
                </button>
              </div>
            )}
          </div>

          <Link
            to="/support"
            className="group inline-flex items-center gap-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#38BDF8]/20 transition-all active:scale-[0.98]"
          >
            <span>{lang === 'so' ? 'Wada Shaqayn' : "Let's collaborate"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Pure Minimal Globe Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center justify-center p-1.5 text-[#38BDF8] hover:text-white transition-colors"
              aria-label="Select Language"
            >
              <Globe className="h-4 w-4" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 py-2 px-3 z-50 flex flex-col gap-1.5 bg-[#06080E]/95 backdrop-blur-md rounded-lg shadow-xl min-w-[95px]">
                <button
                  type="button"
                  onClick={() => {
                    setLang('en')
                    setLangOpen(false)
                  }}
                  className={`text-xs text-left transition-colors ${
                    lang === 'en' ? 'text-[#38BDF8] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang('so')
                    setLangOpen(false)
                  }}
                  className={`text-xs text-left transition-colors ${
                    lang === 'so' ? 'text-[#38BDF8] font-bold' : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Somali
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E2C4A] bg-[#0D1424] text-[#CBD5E1] hover:text-white transition"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="pointer-events-auto mt-2 w-full max-w-5xl rounded-xl border border-[#1E2C4A] bg-[#0D1424]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
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
                        : 'text-[#CBD5E1] hover:bg-white/5 hover:text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <span>
                    {lang === 'so'
                      ? l.to === '/' ? 'Hoyga'
                        : l.to === '/skills' ? 'Xirfadaha'
                        : l.to === '/services' ? 'Adeegyada'
                        : l.to === '/about-us' ? 'Nagu Saabsan'
                        : l.to === '/projects' ? 'Mashaariicda'
                        : 'Taageero'
                      : l.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-[#1E2C4A] pt-4">
            <Link
              to="/support"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] py-3 text-sm font-bold text-white shadow-md transition"
              onClick={() => setOpen(false)}
            >
              <span>{lang === 'so' ? 'Wada Shaqayn' : "Let's collaborate"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
