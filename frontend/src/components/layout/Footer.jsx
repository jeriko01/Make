import { Link } from 'react-router-dom'
import { Mail, MapPin, Github, Linkedin, ExternalLink, ArrowUp } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import MakeLogo from '../common/MakeLogo'

const ICON_MAP = { Github, Linkedin }

function WhatsAppIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.11 7.39C8.94 7.39 8.68 7.45 8.46 7.69C8.24 7.93 7.62 8.51 7.62 9.68C7.62 10.85 8.47 11.98 8.59 12.14C8.71 12.3 10.25 14.78 12.67 15.76C14.68 16.57 15.09 16.41 15.53 16.37C15.97 16.33 16.95 15.79 17.15 15.22C17.35 14.65 17.35 14.16 17.29 14.06C17.23 13.96 17.07 13.9 16.83 13.78C16.59 13.66 15.41 13.08 15.19 13C14.97 12.92 14.81 12.88 14.65 13.12C14.49 13.36 14.03 13.9 13.89 14.06C13.75 14.22 13.61 14.24 13.37 14.12C13.13 14 12.36 13.75 11.44 12.93C10.72 12.29 10.23 11.5 10.09 11.26C9.95 11.02 10.08 10.89 10.2 10.77C10.31 10.66 10.45 10.48 10.57 10.34C10.69 10.2 10.73 10.1 10.81 9.94C10.89 9.78 10.85 9.64 10.79 9.52C10.73 9.4 10.27 8.27 10.08 7.81C9.89 7.36 9.7 7.42 9.55 7.41C9.42 7.4 9.26 7.39 9.11 7.39Z" />
    </svg>
  )
}

const QUICK = [
  { to: '/',         label: 'Home' },
  { to: '/skills',   label: 'Skills' },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/support',  label: 'Support & Inquiries' },
]

const SERVICES_LINKS = [
  { to: '/support?service=business-websites', label: 'Business Websites' },
  { to: '/support?service=custom-web-apps',   label: 'Custom Web Apps' },
  { to: '/support?service=mobile-apps',       label: 'Mobile Apps (iOS & Android)' },
  { to: '/support?service=api-database',      label: 'API & Supabase Integration' },
  { to: '/support?service=dashboards-booking',label: 'Dashboards & Portals' },
  { to: '/support?service=maintenance',       label: 'Maintenance & Improvements' },
]

export default function Footer() {
  const { data } = useSiteData()
  const profile = data?.profile || {}
  const social = data?.social_links || []
  const info = data?.contact_info || {}
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="border-t border-[#1e261d] bg-[#0e0e0e] text-[#d2d7dc]">
      <div className="container-page py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand & Bio */}
          <div>
            <Link to="/" aria-label="Make — home" className="inline-flex items-center gap-2">
              <MakeLogo size="md" />
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#8a949e]">
              {profile.short_bio ||
                'Engineering studio building dependable web and mobile products from interactive frontend to API and scalable data layer.'}
            </p>

            {/* Contact details */}
            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${profile.email || info.email || 'hello@make.dev'}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#52fe7d] hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{profile.email || info.email || 'hello@make.dev'}</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-[#8a949e]">
                <MapPin className="h-3.5 w-3.5 text-[#39A751]" />
                <span>{profile.location || info.location || 'Available Worldwide · Remote'}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Pages</h3>
            <ul className="space-y-2.5" role="list">
              {QUICK.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs text-[#8a949e] hover:text-white transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Jump */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Services</h3>
            <ul className="space-y-2.5" role="list">
              {SERVICES_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-xs text-[#8a949e] hover:text-[#52fe7d] transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Connect</h3>
            <ul className="space-y-2.5" role="list">
              {social.map((s) => {
                const Icon = ICON_MAP[s.icon] || ExternalLink
                return (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-[#8a949e] hover:text-white transition"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#39A751]" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & actions bar */}
        <div className="mt-12 border-t border-[#1e261d] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Spacer to achieve symmetric center alignment on desktop */}
          <div className="hidden md:block flex-1" />

          {/* Centered copyright */}
          <div className="text-center order-2 md:order-1 flex-shrink-0">
            <p className="text-xs text-[#8a949e]">© {year} Make. All rights reserved.</p>
          </div>

          {/* Right side: WhatsApp Chat + Back to Top (100% equal twin size & icons) */}
          <div className="flex-1 flex items-center justify-center md:justify-end gap-3 order-1 md:order-2 w-full md:w-auto">
            {/* 1. WhatsApp Chat */}
            <a
              href="https://wa.me/2529199708"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp Chat with +2529199708"
              title="Chat on WhatsApp (+252 91 99708)"
              className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-[#0b140e] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out group"
            >
              <WhatsAppIcon className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110" />
            </a>

            {/* 2. Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-[#52fe7d]/10 border border-[#52fe7d]/30 text-[#52fe7d] hover:bg-[#52fe7d] hover:text-[#0b140e] hover:border-[#52fe7d] hover:shadow-[0_0_20px_rgba(82,254,125,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out group cursor-pointer"
            >
              <ArrowUp className="w-6 h-6 stroke-[2.2] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
