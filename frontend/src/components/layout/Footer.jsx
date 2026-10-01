import { Link } from 'react-router-dom'
import { Mail, MapPin, Github, Linkedin, ArrowRight, ExternalLink } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import MakeLogo from '../common/MakeLogo'

const ICON_MAP = { Github, Linkedin }

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
                'Senior Web & Mobile Application Engineer building dependable products from the client interface to the API and data layer.'}
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

            <div className="mt-8 rounded-lg border border-[#1e261d] bg-[#141714] p-3.5">
              <p className="text-[11px] font-semibold text-white">Need a custom technical review?</p>
              <Link
                to="/support"
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-[#52fe7d] hover:underline"
              >
                <span>Send project inquiry</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 border-t border-[#1e261d] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a949e]">
          <p>© {year} Make. All rights reserved.</p>
          <p className="text-[11px]">
            Engineered with React, FastAPI & Supabase.
          </p>
        </div>
      </div>
    </footer>
  )
}
