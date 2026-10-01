import { Github, Linkedin, Twitter, Globe, Instagram, Youtube, Facebook, Mail } from 'lucide-react'

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  email: Mail,
  website: Globe,
}

export default function SocialLinks({ links = [], className = '' }) {
  if (!links.length) return null
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map((l) => {
        const Cmp = ICONS[l.platform?.toLowerCase()] || Globe
        return (
          <li key={l.id}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label || l.platform}
              title={l.label || l.platform}
              className="group grid h-10 w-10 place-items-center rounded-xl glass text-slate-300 transition hover:-translate-y-0.5 hover:text-white hover:shadow-lg hover:shadow-brand-500/20"
            >
              <Cmp className="h-4 w-4 transition group-hover:scale-110" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
