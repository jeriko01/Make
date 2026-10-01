import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calculator,
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
      className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]"
    >
      <div className="container-page">
        {/* Section Header - Centered */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
              <Calculator className="h-3.5 w-3.5" />
              <span>INTERACTIVE SCOPE PLANNER</span>
            </div>
            <h2 className="mt-4 section-heading">
              Plan your product architecture &amp; timeline
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-base text-[#d2d7dc] leading-relaxed">
              Transparent engineering planning. Select your product requirements to calculate estimated sprint milestones, recommended technical stack, and security architecture.
            </p>
          </Reveal>
        </div>

        {/* Planner Workspace */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          {/* Controls Column */}
          <div className="space-y-8">
            {/* Step 1: Project Type */}
            <Reveal delay={60}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">
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
                            ? 'border-[#39A751] bg-[#1e2b1a]/70 shadow-lg shadow-[#39A751]/10'
                            : 'border-[#1e261d] bg-[#0e0e0e]/60 text-[#d2d7dc] hover:border-[#39A751]/40 hover:bg-[#161d15]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-display text-sm font-bold ${isSelected ? 'text-white' : 'text-[#d2d7dc]'}`}>
                            {type.name}
                          </span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-[#52fe7d]" />}
                        </div>
                        <p className="mt-2 text-xs text-[#8a949e] line-clamp-2">
                          {type.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            {/* Step 2: Key Capabilities */}
            <Reveal delay={120}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">
                  Step 02
                </span>
                <h3 className="mt-1 font-display text-lg font-bold text-white">
                  Select Required Features
                </h3>
                <p className="mt-1 text-xs text-[#8a949e]">
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
                            ? 'border-[#39A751]/60 bg-[#1e2b1a] text-white'
                            : 'border-[#1e261d] bg-[#0e0e0e]/50 text-[#8a949e] hover:border-[#1e261d] hover:text-[#d2d7dc]'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            active
                              ? 'border-[#52fe7d] bg-[#39A751] text-white'
                              : 'border-[#1e261d] bg-transparent'
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

            {/* Step 3: Pace */}
            <Reveal delay={160}>
              <div className="rounded-xl border border-[#1e261d] bg-[#141714] p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#52fe7d]">
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
                        ? 'border-[#39A751] bg-[#1e2b1a] text-white font-bold'
                        : 'border-[#1e261d] bg-[#0e0e0e] text-[#8a949e] hover:text-white'
                    }`}
                  >
                    <p className="text-sm">Standard Cadence</p>
                    <p className="text-[11px] text-[#8a949e] mt-1">Steady bi-weekly sprints</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('accelerated')}
                    className={`p-3.5 rounded-xl border text-center transition ${
                      timelineSpeed === 'accelerated'
                        ? 'border-[#39A751] bg-[#1e2b1a] text-white font-bold'
                        : 'border-[#1e261d] bg-[#0e0e0e] text-[#8a949e] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-[#52fe7d]" />
                      <p className="text-sm">Accelerated Sprint</p>
                    </div>
                    <p className="text-[11px] text-[#8a949e] mt-1">High-priority intensive delivery</p>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Real-Time Specification Card */}
          <Reveal delay={100}>
            <div
              className="sticky top-24 rounded-2xl border border-[#1e261d] bg-[#141714] p-7 sm:p-8 shadow-2xl"
              style={{
                boxShadow: '0 -1px 0 0 #52ff7d29, 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 45px rgba(0, 0, 0, 0.7)',
              }}
            >
              <div className="flex items-center justify-between pb-5 border-b border-[#1e261d]">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#52fe7d]">
                    Live Estimation Summary
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white mt-0.5">
                    {currentType.name}
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e2b1a] border border-[#39A751]/40 text-[#52fe7d]">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              {/* Metrics row */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1e261d] bg-[#0e0e0e] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8a949e]">
                    <Clock className="h-4 w-4 text-[#39A751]" />
                    <span>Est. Timeline</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-black text-white">
                    ~{totalWeeks}{' '}
                    <span className="text-sm font-semibold text-[#52fe7d]">Weeks</span>
                  </p>
                  <p className="text-[10px] text-[#8a949e] mt-0.5">
                    {timelineSpeed === 'accelerated' ? 'Fast-track milestone cadence' : 'Standard agile milestones'}
                  </p>
                </div>

                <div className="rounded-xl border border-[#1e261d] bg-[#0e0e0e] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8a949e]">
                    <Shield className="h-4 w-4 text-[#39A751]" />
                    <span>Security Model</span>
                  </div>
                  <p className="mt-2 font-display text-sm font-bold text-white">
                    Production Grade
                  </p>
                  <p className="text-[10px] text-[#8a949e] mt-0.5">
                    RLS, OWASP &amp; sanitized inputs
                  </p>
                </div>
              </div>

              {/* Architecture Blueprint */}
              <div className="mt-6 rounded-xl border border-[#1e261d] bg-[#161d15] p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#52fe7d]">
                  <Cpu className="h-4 w-4" />
                  <span>Recommended Architecture</span>
                </div>
                <p className="mt-2 font-mono text-xs font-semibold text-white">
                  {currentType.recommendedStack}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] text-[#8a949e]">
                    Zero Tech Debt
                  </span>
                  <span className="rounded border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] text-[#8a949e]">
                    100% Code Handover
                  </span>
                  <span className="rounded border border-[#1e261d] bg-[#0e0e0e] px-2 py-0.5 text-[10px] text-[#8a949e]">
                    Automated Tests
                  </span>
                </div>
              </div>

              {/* Scope Checklist */}
              <div className="mt-6 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a949e]">
                  Included in this scope:
                </p>
                <div className="space-y-1.5 text-xs text-[#d2d7dc]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d] shrink-0" />
                    <span>Direct engineering with Make (no outsourcing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d] shrink-0" />
                    <span>Fully responsive layout across mobile, tablet, and desktop</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#52fe7d] shrink-0" />
                    <span>{selectedFeatures.length} specialized feature modules configured</span>
                  </div>
                </div>
              </div>

              {/* CTA Button to proceed */}
              <button
                type="button"
                onClick={handleExportToInquiry}
                className="mt-8 w-full btn-lime gap-2 py-3.5 text-sm font-bold shadow-lg shadow-[#39A751]/25 hover:shadow-[#39A751]/40"
              >
                <span>Proceed with this specification</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] text-[#8a949e]">
                Transfers this exact technical specification directly into the inquiry form.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
