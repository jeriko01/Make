import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Sparkles,
  Zap,
} from 'lucide-react'
import Reveal from '../common/Reveal'

const PROJECT_TYPES = [
  {
    id: 'web-app',
    name: 'Custom Web Application',
    serviceSlug: 'custom-web-apps',
    baseWeeks: 4,
    recommendedStack: 'React 19 · FastAPI · PostgreSQL · Tailwind',
    description: 'Component-driven SaaS dashboard, client portal, or custom browser software.',
  },
  {
    id: 'mobile-app',
    name: 'Cross-Platform Mobile App',
    serviceSlug: 'mobile-apps',
    baseWeeks: 5,
    recommendedStack: 'React Native / Flutter · FastAPI · Supabase',
    description: 'Native-feel iOS and Android application with offline caching and push alerts.',
  },
  {
    id: 'business-site',
    name: 'High-Performance Business Site',
    serviceSlug: 'business-websites',
    baseWeeks: 2,
    recommendedStack: 'React · Vite · Tailwind · Supabase Headless',
    description: 'High-credibility responsive multi-page marketing website with SEO & lead capture.',
  },
  {
    id: 'fullstack-suite',
    name: 'Full-Stack Suite (Web + Mobile + API)',
    serviceSlug: 'custom-web-apps',
    baseWeeks: 7,
    recommendedStack: 'React + React Native + FastAPI + Postgres',
    description: 'Unified ecosystem sharing the same backend API and database schemas.',
  },
]

const FEATURE_OPTIONS = [
  { id: 'auth', label: 'User Auth & Role Management', weeks: 1 },
  { id: 'payments', label: 'Payment Gateway (Stripe/Subscriptions)', weeks: 1 },
  { id: 'realtime', label: 'Real-Time WebSockets & Notifications', weeks: 1 },
  { id: 'analytics', label: 'Interactive Dashboard & Analytics', weeks: 1 },
  { id: 'offline', label: 'Offline-First Local Storage & Sync', weeks: 1 },
  { id: 'admin', label: 'Admin CMS & Audit Logs', weeks: 1 },
]

export default function ProjectPlanner() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('web-app')
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'analytics'])
  const [timelineSpeed, setTimelineSpeed] = useState('standard') // 'standard' | 'accelerated'

  const currentType = useMemo(
    () => PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0],
    [selectedType]
  )

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  // Calculated estimates
  const totalWeeks = useMemo(() => {
    const featureWeeks = selectedFeatures.reduce((acc, fId) => {
      const feat = FEATURE_OPTIONS.find((f) => f.id === fId)
      return acc + (feat?.weeks || 0)
    }, 0)
    const base = currentType.baseWeeks + Math.round(featureWeeks * 0.75)
    return timelineSpeed === 'accelerated' ? Math.max(2, Math.round(base * 0.75)) : base
  }, [currentType, selectedFeatures, timelineSpeed])

  const handleExportToInquiry = () => {
    const featureNames = selectedFeatures
      .map((fId) => FEATURE_OPTIONS.find((f) => f.id === fId)?.label)
      .filter(Boolean)
      .join(', ')

    const description = `Project Plan for ${currentType.name}:\n• Target Timeline: ~${totalWeeks} weeks (${timelineSpeed} pace)\n• Core Features: ${featureNames || 'Core baseline'}\n• Recommended Stack: ${currentType.recommendedStack}`

    navigate(`/support?service=${currentType.serviceSlug}&description=${encodeURIComponent(description)}`)
  }

  return (
    <section
      id="project-planner"
      aria-label="Interactive project scope planner"
      className="section-pad bg-[#06080E] border-t border-[#1E2C4A]"
    >
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#38BDF8] lowercase mb-2">
              interactive scope planner
            </p>
            <h2 className="mt-4 section-heading">
              Plan your product architecture &amp; timeline
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-[#CBD5E1] leading-relaxed">
              Transparent engineering planning. Select your product requirements to calculate estimated sprint milestones, recommended technical stack, and security architecture.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-8">
            <Reveal delay={60}>
              <div className="rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                  Step 01
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Select Product Type
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = selectedType === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`flex flex-col text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'border-[#0284C7] bg-[#131F37]/70 shadow-lg shadow-[#0284C7]/10'
                            : 'border-[#1E2C4A] bg-[#06080E]/60 text-[#CBD5E1] hover:border-[#0284C7]/40 hover:bg-[#111A30]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-display text-sm font-bold ${isSelected ? 'text-white' : 'text-[#CBD5E1]'}`}>
                            {type.name}
                          </span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />}
                        </div>
                        <p className="mt-2 text-xs text-[#94A3B8] line-clamp-2">
                          {type.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                  Step 02
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Select Required Features
                </h3>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Toggle the specific modules your application requires.
                </p>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {FEATURE_OPTIONS.map((feat) => {
                    const active = selectedFeatures.includes(feat.id)
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium transition text-left ${
                          active
                            ? 'border-[#0284C7]/60 bg-[#131F37] text-white'
                            : 'border-[#1E2C4A] bg-[#06080E]/50 text-[#94A3B8] hover:border-[#1E2C4A] hover:text-[#CBD5E1]'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            active
                              ? 'border-[#38BDF8] bg-[#0284C7] text-white'
                              : 'border-[#1E2C4A] bg-transparent'
                          }`}
                        >
                          {active && <CheckCircle2 className="h-3 w-3" />}
                        </span>
                        <span>{feat.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8]">
                  Step 03
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Delivery Cadence
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('standard')}
                    className={`p-3.5 rounded-xl border text-center transition ${
                      timelineSpeed === 'standard'
                        ? 'border-[#0284C7] bg-[#131F37] text-white font-bold'
                        : 'border-[#1E2C4A] bg-[#06080E] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <p className="text-sm">Standard Cadence</p>
                    <p className="text-[11px] text-[#94A3B8] mt-1">Steady bi-weekly sprints</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('accelerated')}
                    className={`p-3.5 rounded-xl border text-center transition ${
                      timelineSpeed === 'accelerated'
                        ? 'border-[#0284C7] bg-[#131F37] text-white font-bold'
                        : 'border-[#1E2C4A] bg-[#06080E] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-[#38BDF8]" />
                      <p className="text-sm">Accelerated Sprint</p>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] mt-1">High-priority intensive delivery</p>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div
              className="sticky top-24 rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-7 sm:p-8 shadow-2xl"
              style={{
                boxShadow: '0 -1px 0 0 #52ff7d29, 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 45px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div className="flex items-center justify-between pb-5 border-b border-[#1E2C4A]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                    Live Estimation Summary
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white mt-0.5">
                    {currentType.name}
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#131F37] border border-[#0284C7]/40 text-[#38BDF8]">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1E2C4A] bg-[#06080E] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                    <Clock className="h-4 w-4 text-[#0284C7]" />
                    <span>Est. Timeline</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-black text-white">
                    ~{totalWeeks}{' '}
                    <span className="text-sm font-semibold text-[#38BDF8]">Weeks</span>
                  </p>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">
                    {timelineSpeed === 'accelerated' ? 'Fast-track milestone cadence' : 'Standard agile milestones'}
                  </p>
                </div>

                <div className="rounded-xl border border-[#1E2C4A] bg-[#06080E] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]">
                    <Shield className="h-4 w-4 text-[#0284C7]" />
                    <span>Security Model</span>
                  </div>
                  <p className="mt-2 font-display text-sm font-bold text-white">
                    Production Grade
                  </p>
                  <p className="text-[10px] text-[#94A3B8] mt-0.5">
                    RLS, OWASP &amp; sanitized inputs
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#1E2C4A] bg-[#111A30] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  <Cpu className="h-4 w-4" />
                  <span>Recommended Architecture</span>
                </div>
                <p className="mt-2 font-mono text-xs font-semibold text-white">
                  {currentType.recommendedStack}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded border border-[#1E2C4A] bg-[#06080E] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                    Zero Tech Debt
                  </span>
                  <span className="rounded border border-[#1E2C4A] bg-[#06080E] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                    100% Code Handover
                  </span>
                  <span className="rounded border border-[#1E2C4A] bg-[#06080E] px-2 py-0.5 text-[10px] text-[#94A3B8]">
                    Automated Tests
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Included in this scope:
                </p>
                <div className="space-y-1.5 text-xs text-[#CBD5E1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                    <span>Direct engineering with Make (no outsourcing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                    <span>Fully responsive layout across mobile, tablet, and desktop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                    <span>{selectedFeatures.length} specialized feature modules configured</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportToInquiry}
                className="mt-8 w-full btn-lime gap-2 py-3.5 text-sm font-bold shadow-lg shadow-[#0284C7]/25 hover:shadow-[#0284C7]/40"
              >
                <span>Proceed with this specification</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] text-[#94A3B8]">
                Transfers this exact technical specification directly into the inquiry form.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
