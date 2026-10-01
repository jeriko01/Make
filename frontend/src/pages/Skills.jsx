import { useState } from 'react'
import {
  Search,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Award,
} from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'

/**
 * Authentic SVG Brand Icons for each programming language & framework.
 */
function BrandIcon({ name, className = 'h-5 w-5' }) {
  switch (name) {
    case 'React':
    case 'React Native':
      return (
        <svg className={className} viewBox="-11.5 -10.232 23 20.463" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#58c4dc" />
          <g stroke="#58c4dc" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )

    case 'TypeScript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#3178c6" />
          <path
            fill="#ffffff"
            d="M12.5 13.8c-.3-.2-.5-.4-.7-.7-.2-.3-.3-.7-.3-1.1h1.5c0 .3.1.5.2.7.1.2.3.3.6.3.3 0 .5-.1.6-.2.1-.1.2-.3.2-.5 0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.7-.4-.5-.2-.9-.4-1.2-.7-.3-.3-.4-.7-.4-1.2 0-.6.2-1 .6-1.3.4-.3.9-.5 1.5-.5.6 0 1.1.2 1.5.5.4.3.6.8.6 1.4h-1.5c0-.3-.1-.5-.2-.6-.1-.1-.3-.2-.5-.2-.2 0-.4.1-.5.2-.1.1-.1.2-.1.4 0 .2.1.3.2.4.1.1.4.3.8.4.6.2 1 .5 1.2.7.3.3.4.7.4 1.2 0 .6-.2 1.1-.6 1.4-.4.3-1 .5-1.7.5-.7 0-1.2-.2-1.6-.5zm-4.3-.8v-5h-1.7v-1.3h4.8v1.3h-1.7v5H8.2z"
          />
        </svg>
      )

    case 'JavaScript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#f7df1e" />
          <path
            fill="#000000"
            d="M13.2 15.6c.4.7 1 1.1 1.9 1.1.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.5-1.3l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.6 1.2-2.8 3.1-2.8 1.4 0 2.3.5 2.9 1.6l-1.4.9c-.3-.6-.7-.9-1.5-.9-.7 0-1.1.4-1.1.9 0 .6.4.8 1.3 1.2l.5.2c1.7.7 2.7 1.5 2.7 3.2 0 1.8-1.4 3-3.4 3-1.9 0-3.1-.9-3.7-2.1l1.4-.8zm-5.4.2c.2.4.5.7 1 .7.5 0 .8-.2.8-1V8.5h1.8v7.1c0 1.8-1.1 2.6-2.6 2.6-1.4 0-2.2-.7-2.6-1.7l1.6-.7z"
          />
        </svg>
      )

    case 'Python':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="#3776ab"
            d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h3v.4H6.3S4 4.8 4 8c0 3.1 1.9 3 1.9 3h1.2V9.6c0-1.5 1.3-1.5 1.3-1.5h3.6c1.3 0 1.3-1.3 1.3-1.3V3.3S13.4 2 11.9 2zm-.9 1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"
          />
          <path
            fill="#ffd343"
            d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4h-3v-.4h5.7s2.3.3 2.3-2.9c0-3.1-1.9-3-1.9-3h-1.2v1.4c0 1.5-1.3 1.5-1.3 1.5H12c-1.3 0-1.3 1.3-1.3 1.3v3.4s-.1 1.4 1.4 1.4zm.9-1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z"
          />
        </svg>
      )

    case 'FastAPI':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#059669" />
          <path
            fill="#ffffff"
            d="M12.8 3L6 13h5.2l-1.5 8L18 10h-5.2l1.5-7z"
          />
        </svg>
      )

    case 'Tailwind CSS':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#38bdf8">
          <path d="M12 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.3.8.3 1.3.9 1.9 1.5 1 1 2.2 2.2 4.8 2.2 2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.3-.8-.3-1.3-.9-1.9-1.5-1-1-2.2-2.2-4.8-2.2zm-6 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.3.8.3 1.3.9 1.9 1.5 1 1 2.2 2.2 4.8 2.2 2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.3-.8-.3-1.3-.9-1.9-1.5-1-1-2.2-2.2-4.8-2.2z" />
        </svg>
      )

    case 'HTML':
    case 'HTML5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#e34f26">
          <path d="M4 2l1.6 18.2L12 22l6.4-1.8L20 2H4zm13.1 5.3l-.2 2.4H8.7l.2 2.4h8l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.3h2.3l.1 1.6 2.2.6 2.2-.6.2-2.7H6.5L5.9 7.3h11.2z" />
        </svg>
      )

    case 'CSS':
    case 'CSS3':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#1572b6">
          <path d="M4 2l1.6 18.2L12 22l6.4-1.8L20 2H4zm13.1 5.3H6.8l.2 2.4h10l-.7 7.6-4.3 1.2-4.3-1.2-.3-3h2.3l.1 1.5 2.2.6 2.2-.6.3-3.6H6.5l-.2-2.5h10.9l.1-2.4z" />
        </svg>
      )

    case 'PostgreSQL':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c-2.8 0-4.5-1.9-4.5-4.3 0-1.8 1-3.2 2.5-3.8-.4-.6-.6-1.4-.6-2.2 0-2.1 1.6-3.7 3.7-3.7s3.7 1.6 3.7 3.7c0 .8-.2 1.6-.6 2.2 1.5.6 2.5 2 2.5 3.8 0 2.4-1.7 4.3-4.5 4.3h-2.2v-.02z" />
        </svg>
      )

    case 'Supabase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#3ecf8e">
          <path d="M13.4 2.2c-.4-.5-1.2-.3-1.3.4l-1.9 9.8h7.9c.7 0 1.1.9.6 1.4L8.4 22.4c-.5.5-1.3.2-1.2-.5l1.9-9.8H1.3c-.7 0-1.1-.9-.6-1.4L13.4 2.2z" />
        </svg>
      )

    case 'Redis':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#dc382d">
          <path d="M2.5 6.7L12 2l9.5 4.7L12 11.4 2.5 6.7zm0 5.3L12 16.7l9.5-4.7v2.3L12 19 2.5 14.3V12zm0 5.3L12 22l9.5-4.7v2.3L12 24 2.5 19.3v-2z" />
        </svg>
      )

    case 'Flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#02569b">
          <path d="M14.3 2L4.5 11.8l3 3L17.3 2h-3zm0 7.8L9.2 14.9l4.9 4.9h6L14.3 9.8z" />
        </svg>
      )

    case 'Swift':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05138">
          <path d="M20.2 17.5c-3.1 3.5-7.9 4.4-12.2 3.1 3.2-1.7 5.6-4.5 6.5-7.8-2.6 1.4-5.3 1.8-7.9 1.1 3.6-2.6 5.8-6.6 6-10.9-2.3 2-4.9 3.5-7.8 4.2C6 5.3 7.8 3.5 10.2 2 4.8 5.6 1.8 11.8 2.6 18.2c4.8 4.6 12.1 4.7 17.6-.7z" />
        </svg>
      )

    case 'Kotlin':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path fill="#7f52ff" d="M2 2h20L12 12l10 10H2V2z" />
          <path fill="#c757bc" d="M2 12l10 10H2V12z" />
        </svg>
      )

    case 'Git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05032">
          <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2.1-.8-2.9 0L8.1 4.5l3.7 3.7c.9-.3 1.9-.1 2.5.6.7.7.8 1.7.5 2.5l3.5 3.5c.8-.3 1.9-.1 2.5.6.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.8-.8-1-2-.4-2.9l-3.3-3.3v4.6c.3.2.6.5.7.9.6 1.3 0 2.8-1.3 3.4-1.3.6-2.8 0-3.4-1.3-.4-.9-.3-1.9.3-2.6V8.6c-.6-.7-.7-1.7-.3-2.6L6 8.3l-3.6 3.6c-.8.8-.8 2.1 0 2.9l8.5 8.5c.8.8 2.1.8 2.9 0l7.8-7.8c.8-.8.8-2.1 0-2.9z" />
        </svg>
      )

    case 'GitHub':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.52 2 12.1c0 4.46 2.87 8.24 6.84 9.58.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.04.8-.23 1.65-.34 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.43.1 2.69.64.71 1.03 1.61 1.03 2.72 0 3.9-2.34 4.75-4.57 5.01.36.32.69.94.69 1.9v2.82c0 .27.18.58.69.48A10.12 10.12 0 0 0 22 12.1C22 6.52 17.52 2 12 2z" />
        </svg>
      )

    case 'Docker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#2496ed">
          <path d="M13.9 10.4h1.9v1.8h-1.9v-1.8zm-2.5 0h1.9v1.8h-1.9v-1.8zm-2.5 0h1.9v1.8H8.9v-1.8zm-2.5 0h1.9v1.8H6.4v-1.8zm7.5-2.4h1.9v1.8h-1.9V8zm-2.5 0h1.9v1.8h-1.9V8zm-2.5 0h1.9v1.8H8.9V8zm5-2.4h1.9v1.8h-1.9V5.6zm10 6.6c-.3-.2-1.3-.9-2.7-.4-.8-1.5-2.4-2.5-4.2-2.5H1.6C.7 9.3 0 10 0 10.9v2.7C0 18.2 4.1 22 11.2 22c7.5 0 11.8-4.4 12.3-9.5.3-.2.8-.7.8-1.4 0-.4-.2-.8-.4-.9z" />
        </svg>
      )

    case 'Vite':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="#bd34fe"
            d="M21.5 4.3L12.5 21c-.2.4-.8.4-1 0L2.5 4.3c-.3-.5.2-1 .7-.8l8.5 3.6c.2.1.4.1.6 0l8.5-3.6c.5-.2 1 .3.7.8z"
          />
          <path
            fill="#ffea83"
            d="M13.8 2.2l-6 10.6c-.2.3.1.7.5.7h3.3l-1.3 5.4c-.1.5.6.8.9.4l7.1-9.9c.3-.4 0-.8-.4-.8h-3.4l1.2-5.7c.1-.5-.6-.9-.9-.7z"
          />
        </svg>
      )

    default:
      return <Cpu className={className} />
  }
}

// Estimated accurate proficiency percentage and experience data
const SKILL_METRICS = {
  React:          { percent: 96, exp: '4+ Years', level: 'Expert / Production' },
  TypeScript:     { percent: 94, exp: '4+ Years', level: 'Advanced / Strict' },
  JavaScript:     { percent: 96, exp: '5+ Years', level: 'Expert / Modern ES' },
  'Tailwind CSS': { percent: 98, exp: '4+ Years', level: 'Mastery / Fluid' },
  HTML:           { percent: 98, exp: '5+ Years', level: 'Semantic / WCAG' },
  HTML5:          { percent: 98, exp: '5+ Years', level: 'Semantic / WCAG' },
  CSS:            { percent: 95, exp: '5+ Years', level: 'Advanced / Layouts' },
  CSS3:           { percent: 95, exp: '5+ Years', level: 'Advanced / Layouts' },
  Python:         { percent: 95, exp: '4+ Years', level: 'Expert / Async' },
  FastAPI:        { percent: 93, exp: '3+ Years', level: 'Production REST' },
  PostgreSQL:     { percent: 92, exp: '4+ Years', level: 'Relational & RLS' },
  Supabase:       { percent: 94, exp: '3+ Years', level: 'Full BaaS Stack' },
  Redis:          { percent: 88, exp: '3+ Years', level: 'Caching & Queues' },
  'React Native': { percent: 90, exp: '3+ Years', level: 'iOS & Android' },
  Flutter:        { percent: 88, exp: '3+ Years', level: 'Cross-Platform' },
  Swift:          { percent: 82, exp: '2+ Years', level: 'iOS Native' },
  Kotlin:         { percent: 84, exp: '2+ Years', level: 'Android Native' },
  Docker:         { percent: 90, exp: '3+ Years', level: 'Containerization' },
  Git:            { percent: 96, exp: '5+ Years', level: 'GitOps & Trunk' },
  GitHub:         { percent: 96, exp: '5+ Years', level: 'CI/CD & Actions' },
  Vite:           { percent: 94, exp: '3+ Years', level: 'Fast Tooling' },
}

const TYPE_LABEL = {
  language:  'Language',
  framework: 'Framework',
  library:   'Library',
  database:  'Database',
  tool:      'Tool / DevOps',
  platform:  'Platform',
}

function SkillCard({ skill }) {
  const metric = SKILL_METRICS[skill.name] || { percent: 90, exp: '3+ Years', level: 'Production' }

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#1e261d] bg-[#141714] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#39A751]/50 hover:bg-[#161d15] hover:shadow-xl hover:shadow-[#39A751]/10">
      <div>
        {/* Top bar: Real Brand Icon + Layer badge */}
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b0e0b] border border-[#1e261d] p-2 transition group-hover:scale-110 group-hover:border-[#39A751]/40 shadow-inner">
            <BrandIcon name={skill.name} className="h-6 w-6" />
          </span>

          <span className="rounded-md border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] font-mono text-[#8a949e]">
            {TYPE_LABEL[skill.type] || skill.type}
          </span>
        </div>

        {/* Skill Name */}
        <h3 className="mt-4 font-display text-base font-bold text-white group-hover:text-[#52fe7d] transition-colors">
          {skill.name}
        </h3>

        {/* Context / Description */}
        <p className="mt-1.5 text-xs text-[#8a949e] leading-relaxed line-clamp-2">
          {skill.note || 'Production-tested stack component for modern, high-velocity engineering.'}
        </p>
      </div>

      {/* ── Progress Bar & Proficiency Percentage (out of 100%) ── */}
      <div className="mt-5 pt-3.5 border-t border-[#1e261d]">
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <span className="text-[11px] text-[#8a949e]">Proficiency</span>
          <span className="text-xs font-bold text-[#52fe7d]">{metric.percent}%</span>
        </div>

        {/* Progress Track */}
        <div className="h-1.5 w-full rounded-full bg-[#1e261d] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#39A751] to-[#52fe7d] shadow-sm shadow-[#39A751]/50 transition-all duration-500"
            style={{ width: `${metric.percent}%` }}
          />
        </div>

        {/* Level and Experience indicator */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#8a949e]">
          <span>{metric.level}</span>
          <span className="text-[#d2d7dc]">{metric.exp}</span>
        </div>
      </div>
    </div>
  )
}

function SkillsContent() {
  const { data } = useSiteData()
  const categories = data?.skills?.categories || []
  const skills = data?.skills?.skills || []
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')

  const grouped = categories.map((cat) => ({
    ...cat,
    items: skills.filter((s) => s.category_id === cat.id),
  })).filter((c) => c.items.length > 0)

  // Filter by category and search
  const visible = grouped
    .filter((cat) => active === 'all' || cat.id === active)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          (s.note && s.note.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((c) => c.items.length > 0)

  return (
    <>
      {/* ── Page Hero with Atmospheric Background Image ── */}
      <div className="relative pt-32 pb-20 border-b border-[#1e261d] overflow-hidden bg-[#0e0e0e]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 pointer-events-none"
          style={{ backgroundImage: `url('/images/skills-hero-bg.jpg')` }}
        />

        {/* Dark Gradient Overlay for optimal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/80 via-[#0e0e0e]/92 to-[#0e0e0e] pointer-events-none" />
        <div className="pointer-events-none absolute -left-48 top-0 h-[450px] w-[450px] rounded-full bg-[#39A751]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-48 top-10 h-[400px] w-[400px] rounded-full bg-[#52fe7d]/5 blur-[120px]" />

        <div className="container-page relative z-10 text-center mx-auto max-w-3xl">
          <Reveal>
            {/* Clean plain lowercase text - NO button */}
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#52fe7d] lowercase mb-3">
              skills &amp; technologies
            </p>

            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Engineered with modern tools &amp; frameworks
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-base text-[#8a949e] leading-relaxed">
              Production-proven technologies evaluated on real project delivery, type safety, and runtime stability. Each tool backed by hands-on engineering depth.
            </p>

            {/* Quick Skills Summary Metrics */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 pt-6 border-t border-[#1e261d]/60">
              <div>
                <p className="font-display text-2xl font-bold text-white">18+</p>
                <p className="font-mono text-[11px] text-[#8a949e] uppercase">Core Tools</p>
              </div>
              <div className="h-8 w-px bg-[#1e261d]" />
              <div>
                <p className="font-display text-2xl font-bold text-[#52fe7d]">93%</p>
                <p className="font-mono text-[11px] text-[#8a949e] uppercase">Avg. Proficiency</p>
              </div>
              <div className="h-8 w-px bg-[#1e261d]" />
              <div>
                <p className="font-display text-2xl font-bold text-white">Full-Stack</p>
                <p className="font-mono text-[11px] text-[#8a949e] uppercase">Web &amp; Mobile</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Skills Gallery Section ── */}
      <section className="section-pad bg-[#0e0e0e]" aria-label="Skills Grid">
        <div className="container-page">

          {/* Controls: Filter Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#1e261d]">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActive('all')}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-medium transition ${
                  active === 'all'
                    ? 'bg-[#39A751] text-white shadow-sm'
                    : 'border border-[#1e261d] bg-[#141714] text-[#8a949e] hover:border-[#39A751]/40 hover:text-white'
                }`}
              >
                All Tools
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-medium transition ${
                    active === c.id
                      ? 'bg-[#39A751] text-white shadow-sm'
                      : 'border border-[#1e261d] bg-[#141714] text-[#8a949e] hover:border-[#39A751]/40 hover:text-white'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Quick search */}
            <div className="relative w-full md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a949e]" />
              <input
                type="text"
                placeholder="Search technology..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[#1e261d] bg-[#141714] py-1.5 pl-9 pr-3 text-xs text-white placeholder-[#8a949e] focus:border-[#39A751] focus:outline-none"
              />
            </div>
          </div>

          {/* Grouped Skills Cards */}
          <div className="mt-10 space-y-14">
            {visible.map((cat) => (
              <div key={cat.id} className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#1e261d]/50 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#52fe7d]" />
                    <h2 className="font-display text-lg font-bold text-white">
                      {cat.name}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#8a949e]">
                    {cat.items.length} Technologies
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {cat.items.map((skill) => (
                    <SkillCard key={skill.id || skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}

            {visible.length === 0 && (
              <div className="py-16 text-center text-[#8a949e]">
                <p className="text-sm">No skills found matching &ldquo;{search}&rdquo;.</p>
              </div>
            )}
          </div>

          {/* Reassurance Banner */}
          <Reveal delay={200}>
            <div className="mt-16 rounded-2xl border border-[#1e261d] bg-[#141714] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#52fe7d]">
                  Architectural Standard
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Need a custom technology or legacy migration?
                </h3>
                <p className="mt-1.5 text-xs text-[#8a949e] max-w-xl leading-relaxed">
                  I adapt to established team codebases quickly and provide technical evaluation before recommending architecture changes or modern framework upgrades.
                </p>
              </div>

              <a
                href="/support"
                className="btn-lime gap-2 px-6 py-3 text-sm shrink-0"
              >
                <span>Discuss Your Stack</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final Collaborate CTA */}
      <CollaborateCTA
        heading="Need these technologies on your team?"
        body="Whether you need a senior full-stack engineer for an end-to-end product build or specialized React / FastAPI development, let's talk."
      />
    </>
  )
}

export default function Skills() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Skills & Technologies"
        description="Technical stack of Make: React, TypeScript, Python, FastAPI, Supabase, PostgreSQL, React Native, and Flutter."
      >
        <SkillsContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
