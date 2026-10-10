import { Link } from 'react-router-dom'
import { Mail, MapPin, ArrowUp } from 'lucide-react'
import MakeLogo from '../common/MakeLogo'

/* ── Static social links ─────────────────────────────────────────────── */
const CYAN_HOVER = 'hover:bg-[#38BDF8]/15 hover:border-[#38BDF8] hover:text-[#38BDF8] hover:shadow-[0_0_14px_rgba(56,189,248,0.3)]'

const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/engmake',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/engmake',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://facebook.com/engmake',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: 'x',
    label: 'X',
    url: 'https://x.com/engmake',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://youtube.com/@engmake',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const QUICK = [
  { to: '/',         label: 'Home' },
  { to: '/skills',   label: 'Skills' },
  { to: '/services', label: 'Services' },
  { to: '/about-us', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/support',  label: 'Support' },
]

const SERVICES_LINKS = [
  { to: '/support?service=business-websites', label: 'Business Websites' },
  { to: '/support?service=custom-web-apps',   label: 'Custom Web Apps' },
  { to: '/support?service=mobile-apps',       label: 'Mobile Apps' },
  { to: '/support?service=api-database',      label: 'API & Database' },
  { to: '/support?service=dashboards-booking',label: 'Dashboards & Portals' },
  { to: '/support?service=maintenance',       label: 'Maintenance & Support' },
]

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.11 7.39C8.94 7.39 8.68 7.45 8.46 7.69C8.24 7.93 7.62 8.51 7.62 9.68C7.62 10.85 8.47 11.98 8.59 12.14C8.71 12.3 10.25 14.78 12.67 15.76C14.68 16.57 15.09 16.41 15.53 16.37C15.97 16.33 16.95 15.79 17.15 15.22C17.35 14.65 17.35 14.16 17.29 14.06C17.23 13.96 17.07 13.9 16.83 13.78C16.59 13.66 15.41 13.08 15.19 13C14.97 12.92 14.81 12.88 14.65 13.12C14.49 13.36 14.03 13.9 13.89 14.06C13.75 14.22 13.61 14.24 13.37 14.12C13.13 14 12.36 13.75 11.44 12.93C10.72 12.29 10.23 11.5 10.09 11.26C9.95 11.02 10.08 10.89 10.2 10.77C10.31 10.66 10.45 10.48 10.57 10.34C10.69 10.2 10.73 10.1 10.81 9.94C10.89 9.78 10.85 9.64 10.79 9.52C10.73 9.4 10.27 8.27 10.08 7.81C9.89 7.36 9.7 7.42 9.55 7.41C9.42 7.4 9.26 7.39 9.11 7.39Z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[#1E2C4A] bg-[#06080E] text-[#CBD5E1]">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand & Bio */}
          <div>
            <Link to="/" aria-label="Make — home" className="inline-flex items-center gap-2">
              <MakeLogo size="md" />
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#94A3B8]">
              I design and engineer full-stack web & mobile products —
              fast APIs, resilient cloud infrastructure, and
              pixel-precise frontends built to last.
            </p>

            <div className="mt-6 space-y-2.5">
              {/* Email */}
              <a
                href="mailto:engmake1.1@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#38BDF8] hover:underline transition"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>engmake1.1@gmail.com</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0284C7]" />
                <span>Available Worldwide · Remote</span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Pages</h3>
            <ul className="space-y-2.5" role="list">
              {QUICK.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs text-[#94A3B8] hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Services</h3>
            <ul className="space-y-2.5" role="list">
              {SERVICES_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs text-[#94A3B8] hover:text-[#38BDF8] transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Connect</h3>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`
                    inline-flex items-center justify-center
                    w-8 h-8 rounded-full
                    border border-[#1E2C4A]
                    bg-[#0A0D16]
                    text-[#94A3B8]
                    transition-all duration-300 ease-out
                    hover:scale-110 active:scale-95
                    ${CYAN_HOVER}
                  `}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#1E2C4A] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="hidden md:block flex-1" />

          <div className="text-center order-2 md:order-1 flex-shrink-0">
            <p className="text-xs text-[#94A3B8]">© {year} Make. All rights reserved.</p>
          </div>

          <div className="flex-1 flex items-center justify-center md:justify-end gap-3 order-1 md:order-2 w-full md:w-auto">
            {/* WhatsApp */}
            <a
              href="https://wa.me/2529199708"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp (+252 91 99708)"
              className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-[#0b140e] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out group"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
            </a>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-[#06080E] hover:border-[#38BDF8] hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out group cursor-pointer"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.2] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
