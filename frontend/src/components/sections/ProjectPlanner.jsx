import { useState, useMemo } from 'react'
import {
  Globe,
  Smartphone,
  Sparkles,
  Calculator,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building,
  SmartphoneNfc,
  X,
} from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

export default function ProjectPlanner() {
  const { lang } = useLanguage()

  // State
  const [projectMode, setProjectMode] = useState('website') // 'website' | 'app'
  const [selectedPreset, setSelectedPreset] = useState('')
  const [customInput, setCustomInput] = useState('')
  const [selectedFrontend, setSelectedFrontend] = useState('React + Tailwind')
  const [selectedBackend, setSelectedBackend] = useState('Python FastAPI')
  const [selectedDb, setSelectedDb] = useState('PostgreSQL')
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'database'])
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('zaad')

  // 20 Websites Presets
  const WEBSITES_PRESETS = [
    { id: 'w1', name: 'SaaS Platform & Analytics Dashboard', baseCost: 1800, weeks: 4 },
    { id: 'w2', name: 'Multi-Vendor E-Commerce Marketplace', baseCost: 2400, weeks: 5 },
    { id: 'w3', name: 'Fintech & Digital Banking Web Portal', baseCost: 3200, weeks: 6 },
    { id: 'w4', name: 'Healthcare & Telemedicine Clinic Portal', baseCost: 2600, weeks: 5 },
    { id: 'w5', name: 'Real Estate & Virtual Tour Platform', baseCost: 1900, weeks: 4 },
    { id: 'w6', name: 'Online Learning & Video LMS Platform', baseCost: 2200, weeks: 5 },
    { id: 'w7', name: 'Enterprise ERP & Payroll System', baseCost: 3500, weeks: 7 },
    { id: 'w8', name: 'Hotel & Travel Reservation System', baseCost: 2100, weeks: 4 },
    { id: 'w9', name: 'Logistics, Cargo & Fleet Tracking Portal', baseCost: 2800, weeks: 6 },
    { id: 'w10', name: 'Community Forum & Social Network', baseCost: 2500, weeks: 5 },
    { id: 'w11', name: 'Restaurant Multi-Branch Online Ordering', baseCost: 1600, weeks: 3 },
    { id: 'w12', name: 'Crypto & Web3 Portfolio Dashboard', baseCost: 2300, weeks: 4 },
    { id: 'w13', name: 'Digital Media & News Publishing System', baseCost: 1700, weeks: 3 },
    { id: 'w14', name: 'Recruitment & Job Board Marketplace', baseCost: 2000, weeks: 4 },
    { id: 'w15', name: 'Crowdfunding & Non-Profit Donation Portal', baseCost: 1800, weeks: 3 },
    { id: 'w16', name: 'Event Ticketing & QR Scanner Platform', baseCost: 2100, weeks: 4 },
    { id: 'w17', name: 'On-Demand Local Services Booking', baseCost: 2200, weeks: 4 },
    { id: 'w18', name: 'High-Impact Agency Portfolio & Lead Funnel', baseCost: 1200, weeks: 2 },
    { id: 'w19', name: 'Fitness & Gym Membership SaaS', baseCost: 1750, weeks: 3 },
    { id: 'w20', name: 'Cloud Infrastructure Monitoring Dashboard', baseCost: 2900, weeks: 6 },
  ]

  // 20 Mobile Apps Presets
  const APPS_PRESETS = [
    { id: 'a1', name: 'Mobile Banking & Microfinance Wallet', baseCost: 3200, weeks: 6 },
    { id: 'a2', name: 'Ride-Hailing & Taxi Dispatch System', baseCost: 3600, weeks: 7 },
    { id: 'a3', name: 'On-Demand Food & Grocery Delivery App', baseCost: 3100, weeks: 6 },
    { id: 'a4', name: 'Telehealth Patient & Doctor Consultation App', baseCost: 3300, weeks: 6 },
    { id: 'a5', name: 'E-Commerce Native Shopping & Live Auction', baseCost: 2800, weeks: 5 },
    { id: 'a6', name: 'Real-Time Messaging & Voice Call App', baseCost: 3500, weeks: 7 },
    { id: 'a7', name: 'Personal Finance, Budgeting & AI Advisor', baseCost: 2400, weeks: 4 },
    { id: 'a8', name: 'Field Sales & Mobile CRM with GPS Tracking', baseCost: 2700, weeks: 5 },
    { id: 'a9', name: 'Hotel & Flight Booking Keyless Entry App', baseCost: 2900, weeks: 5 },
    { id: 'a10', name: 'Tenant Portal & Property Management App', baseCost: 2500, weeks: 4 },
    { id: 'a11', name: 'Fuel Station, Loyalty & Payment App', baseCost: 2600, weeks: 5 },
    { id: 'a12', name: 'Student LMS & Mobile Exam Prep App', baseCost: 2300, weeks: 4 },
    { id: 'a13', name: 'Fitness, Workout Tracker & Diet Planner', baseCost: 2200, weeks: 4 },
    { id: 'a14', name: 'Car Rental & Bluetooth Key Sharing App', baseCost: 3400, weeks: 6 },
    { id: 'a15', name: 'Event QR Mobile Ticket Wallet App', baseCost: 2100, weeks: 4 },
    { id: 'a16', name: 'Quick-Commerce 15-Minute Courier App', baseCost: 3300, weeks: 6 },
    { id: 'a17', name: 'Gamified Language Learning App', baseCost: 2800, weeks: 5 },
    { id: 'a18', name: 'IoT Smart Home Automation App', baseCost: 3200, weeks: 6 },
    { id: 'a19', name: 'Crypto & NFT Multi-Chain Wallet', baseCost: 3500, weeks: 7 },
    { id: 'a20', name: 'Handyman & On-Demand Service Finder', baseCost: 2700, weeks: 5 },
  ]

  // Add-on Features
  const FEATURES = useMemo(() => [
    { id: 'auth', name: lang === 'so' ? 'Nidaamka Amniga & Loginka' : 'Enterprise Auth & RBAC', cost: 250, weeks: 0.5 },
    { id: 'database', name: lang === 'so' ? 'Database & Cloud Backups' : 'Database & Cloud Backups', cost: 300, weeks: 0.5 },
    { id: 'payments', name: lang === 'so' ? 'Isku xirka Lacag-bixinta (Local/Global)' : 'Payment Gateway Integration', cost: 400, weeks: 1 },
    { id: 'realtime', name: lang === 'so' ? 'Live Notifications & WebSockets' : 'Real-time WebSockets & Push Alerts', cost: 350, weeks: 0.5 },
    { id: 'devops', name: lang === 'so' ? 'Docker, CI/CD & Cloud Setup' : 'Docker CI/CD & Production SLA', cost: 500, weeks: 1 },
  ], [lang])

  const currentPresets = projectMode === 'website' ? WEBSITES_PRESETS : APPS_PRESETS

  // Active Selected Item Calculation
  const calculation = useMemo(() => {
    let base = 1500
    let duration = 3
    let title = customInput.trim() || (projectMode === 'website' ? 'Custom Web Application' : 'Custom Mobile Application')

    if (selectedPreset) {
      const found = currentPresets.find((p) => p.id === selectedPreset)
      if (found) {
        base = found.baseCost
        duration = found.weeks
        title = found.name
      }
    } else if (customInput.trim()) {
      // Custom AI estimation logic based on keywords
      const len = customInput.trim().length
      base = 1600 + (len % 5) * 200
      duration = 3 + Math.floor((len % 8) / 2)
    }

    // Add features
    let extraCost = 0
    let extraWeeks = 0
    selectedFeatures.forEach((featId) => {
      const feat = FEATURES.find((f) => f.id === featId)
      if (feat) {
        extraCost += feat.cost
        extraWeeks += feat.weeks
      }
    })

    const totalCost = base + extraCost
    const totalWeeks = Math.ceil(duration + extraWeeks)

    return {
      title,
      totalCost,
      totalWeeks,
    }
  }, [projectMode, selectedPreset, customInput, selectedFeatures, currentPresets, FEATURES])

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section id="estimator" aria-label="Interactive Project Estimator" className="relative py-24 bg-[#06080E]">
      <div className="container-page px-6 sm:px-10 lg:px-20">

        {/* Section Header - Borderless */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[#38BDF8] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
              <Calculator className="h-3.5 w-3.5" />
              <span>{lang === 'so' ? 'Xisaabiyaha Qiimaha & Mudada' : 'Interactive Project Cost & Timeline'}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {lang === 'so'
                ? 'Dooro Website-ka ama App-ka, Hel Qiimaha Dhabta ah'
                : 'Select Your Product, Get Instant Transparent Pricing'}
            </h2>
            <p className="mt-4 text-base text-[#94A3B8]">
              {lang === 'so'
                ? 'Dooro mid ka mid ah 20-ka Website ama 20-ka App ee diyaarka ah, ama qor fikraddaada gaarka ah si nidaamku kuugu qiyaaso tech stack-ka, mudada, iyo qiimaha buuxa.'
                : 'Choose from 20 pre-architected Web and 20 Mobile specifications, or enter your custom requirements to calculate development timeline and fixed production cost.'}
            </p>
          </div>
        </Reveal>

        {/* Interactive Workspace Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Form & Presets Selection (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Mode Switcher: Website vs Mobile App */}
            <div className="p-1.5 rounded-xl border border-[#1E2C4A] bg-[#0D1424] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setProjectMode('website')
                  setSelectedPreset('')
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-lg text-sm font-bold transition-all ${
                  projectMode === 'website'
                    ? 'bg-[#0284C7] text-white shadow-lg shadow-[#0284C7]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>{lang === 'so' ? 'Website (20 Nooc)' : 'Web Platform (20 Presets)'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProjectMode('app')
                  setSelectedPreset('')
                }}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3 rounded-lg text-sm font-bold transition-all ${
                  projectMode === 'app'
                    ? 'bg-[#0284C7] text-white shadow-lg shadow-[#0284C7]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                <span>{lang === 'so' ? 'Mobile App (20 Nooc)' : 'Mobile App (20 Presets)'}</span>
              </button>
            </div>

            {/* Presets Dropdown / Selection */}
            <div className="p-5 rounded-2xl border border-[#1E2C4A] bg-[#0D1424]/90 space-y-4">
              <label className="block text-xs font-mono font-bold tracking-wider text-[#38BDF8] uppercase">
                {lang === 'so'
                  ? `Dooro Nooca ${projectMode === 'website' ? 'Website-ka' : 'Mobile App-ka'}`
                  : `Select Pre-Configured ${projectMode === 'website' ? 'Web Solution' : 'Mobile Application'}`}
              </label>

              <select
                value={selectedPreset}
                onChange={(e) => {
                  setSelectedPreset(e.target.value)
                  if (e.target.value) setCustomInput('')
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#1E2C4A] bg-[#070A11] text-white text-sm focus:outline-none focus:border-[#38BDF8] transition"
              >
                <option value="">
                  {lang === 'so' ? '-- Dooro mid ka mid ah 20-ka nooc --' : '-- Choose from 20 Architectures --'}
                </option>
                {currentPresets.map((preset, index) => (
                  <option key={preset.id} value={preset.id}>
                    {index + 1}. {preset.name} (${preset.baseCost} · ~{preset.weeks} wks)
                  </option>
                ))}
              </select>

              {/* Or Custom Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#38BDF8]" />
                  <span className="text-xs text-[#94A3B8]">
                    {lang === 'so' ? 'Ama ku qor fikrad kale oo kuu gaar ah:' : 'Or type a custom specification:'}
                  </span>
                </div>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value)
                    if (e.target.value) setSelectedPreset('')
                  }}
                  placeholder={
                    lang === 'so'
                      ? 'Tusaale: Super App loogu talagalay Gaadiidka & Lacag-bixinta...'
                      : 'E.g., High-frequency Trading Dashboard with WebSockets...'
                  }
                  className="w-full px-4 py-3 rounded-xl border border-[#1E2C4A] bg-[#070A11] text-white text-sm focus:outline-none focus:border-[#38BDF8] placeholder-[#475569] transition"
                />
              </div>
            </div>

            {/* Tech Stack Customization Options */}
            <div className="p-5 rounded-2xl border border-[#1E2C4A] bg-[#0D1424]/90 space-y-4">
              <h3 className="text-xs font-mono font-bold tracking-wider text-[#38BDF8] uppercase">
                {lang === 'so' ? 'Dooro Tech Stack-ka Lagu Dhisayo' : 'Target Architecture & Tech Stack'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Frontend / Mobile */}
                <div>
                  <span className="text-[11px] text-[#94A3B8] block mb-1.5 font-medium">
                    {projectMode === 'website' ? 'Frontend' : 'Mobile Framework'}
                  </span>
                  <select
                    value={selectedFrontend}
                    onChange={(e) => setSelectedFrontend(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#1E2C4A] bg-[#070A11] text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    {projectMode === 'website' ? (
                      <>
                        <option value="React + Tailwind">React.js + Tailwind</option>
                        <option value="Next.js + TypeScript">Next.js + TypeScript</option>
                        <option value="Vue.js + Vite">Vue.js + Vite</option>
                      </>
                    ) : (
                      <>
                        <option value="Flutter (iOS & Android)">Flutter (Cross-platform)</option>
                        <option value="React Native">React Native</option>
                        <option value="Native Swift (iOS)">Native Swift (iOS)</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Backend */}
                <div>
                  <span className="text-[11px] text-[#94A3B8] block mb-1.5 font-medium">Backend Architecture</span>
                  <select
                    value={selectedBackend}
                    onChange={(e) => setSelectedBackend(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#1E2C4A] bg-[#070A11] text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="Python FastAPI">Python FastAPI (High Concurrency)</option>
                    <option value="Python Django">Python Django REST</option>
                    <option value="Node.js Express">Node.js / Express</option>
                    <option value="C# .NET Core">C# .NET Core</option>
                    <option value="PHP Laravel">PHP Laravel</option>
                  </select>
                </div>

                {/* Database */}
                <div>
                  <span className="text-[11px] text-[#94A3B8] block mb-1.5 font-medium">Database Layer</span>
                  <select
                    value={selectedDb}
                    onChange={(e) => setSelectedDb(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#1E2C4A] bg-[#070A11] text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="PostgreSQL">PostgreSQL (Relational + RLS)</option>
                    <option value="MySQL / MariaDB">MySQL / MariaDB</option>
                    <option value="MongoDB">MongoDB (Document)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Enterprise Add-ons */}
            <div className="p-5 rounded-2xl border border-[#1E2C4A] bg-[#0D1424]/90 space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-wider text-[#38BDF8] uppercase mb-1">
                {lang === 'so' ? 'Qaybaha Dheeraadka ah (Enterprise Modules)' : 'Enterprise Modules & Capabilities'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isChecked
                          ? 'border-[#0284C7] bg-[#0284C7]/10 text-white'
                          : 'border-[#1E2C4A] bg-[#070A11] text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${isChecked ? 'text-[#38BDF8]' : 'text-slate-600'}`} />
                        <span className="text-xs font-medium">{feat.name}</span>
                      </div>
                      <span className="text-xs font-mono text-[#38BDF8]">
                        +${feat.cost}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Price Summary & Proceed Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border-2 border-[#0284C7]/50 bg-gradient-to-b from-[#0D1424] to-[#070A11] p-6 shadow-2xl shadow-black/80">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2C4A]">
                <div>
                  <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider block">
                    {lang === 'so' ? 'Qiyaasta Tooska ah' : 'Real-Time Estimate'}
                  </span>
                  <h4 className="font-display text-lg font-bold text-white mt-0.5 line-clamp-1">
                    {calculation.title}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  Guaranteed
                </span>
              </div>

              {/* Stack Spec list */}
              <div className="py-4 space-y-2.5 text-xs text-[#CBD5E1] border-b border-[#1E2C4A]">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">{lang === 'so' ? 'Dhismaha:' : 'Client Layer:'}</span>
                  <span className="font-semibold text-white">{selectedFrontend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">{lang === 'so' ? 'Backend-ka:' : 'Backend Core:'}</span>
                  <span className="font-semibold text-white">{selectedBackend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">{lang === 'so' ? 'Kaydka Xogta:' : 'Database:'}</span>
                  <span className="font-semibold text-white">{selectedDb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">{lang === 'so' ? 'Qaybaha Dheeraadka:' : 'Active Modules:'}</span>
                  <span className="font-mono text-[#38BDF8]">{selectedFeatures.length} Modules</span>
                </div>
              </div>

              {/* Time & Cost Big Display */}
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
                    <Clock className="h-4 w-4 text-[#38BDF8]" />
                    <span>{lang === 'so' ? 'Muddada Dhismaha' : 'Estimated Delivery'}</span>
                  </div>
                  <span className="font-display text-xl font-bold text-white">
                    ~{calculation.totalWeeks} {lang === 'so' ? 'Toddobaad' : 'Weeks'}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#0A0F1D]">
                  <span className="text-xs text-[#94A3B8] block mb-1">
                    {lang === 'so' ? 'Wadarta Qiimaha Buuxa (Fixed Price)' : 'Total Production Investment'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
                      ${calculation.totalCost.toLocaleString()}
                    </span>
                    <span className="text-xs font-mono text-[#38BDF8]">USD</span>
                  </div>
                  <p className="mt-2 text-[11px] text-[#64748B]">
                    {lang === 'so'
                      ? 'Waxaa ku jira: Source code, CI/CD pipeline, Amni adag, iyo 60 maalmood oo taageero bilaash ah.'
                      : 'Includes full source code ownership, CI/CD deployment pipeline, and 60-day post-launch warranty.'}
                  </p>
                </div>
              </div>

              {/* Payment CTA button */}
              <button
                type="button"
                onClick={() => setPaymentModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#0284C7] py-4 text-sm font-bold text-white shadow-xl shadow-[#0284C7]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{lang === 'so' ? 'Xaqiiji & Bilow Lacag-bixinta' : 'Proceed to Contract & Payment'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#64748B]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  Local &amp; International
                </span>
                <span>•</span>
                <span>Premier Bank · Zaad · Sahal</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Payment Gateway Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6 sm:p-8 shadow-2xl">
            
            {/* Close button */}
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                {lang === 'so' ? 'Nidaamka Lacag-Bixinta' : 'Payment & Account Details'}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                {calculation.title}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                {lang === 'so' ? 'Qiimaha la xaqiijiyey:' : 'Verified Project Amount:'}{' '}
                <strong className="text-white font-mono">${calculation.totalCost} USD</strong>
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4">
              <label className="text-xs font-mono font-semibold text-[#CBD5E1]">
                {lang === 'so' ? 'Dooro Habka aad ku bixinayso:' : 'Select Payment Method:'}
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'zaad', label: 'Telesom Zaad', icon: SmartphoneNfc },
                  { id: 'sahal', label: 'Golis Sahal', icon: SmartphoneNfc },
                  { id: 'edahab', label: 'E-Dahab / Somtel', icon: SmartphoneNfc },
                  { id: 'waafi', label: 'Waafi / Hormuud', icon: SmartphoneNfc },
                  { id: 'premier', label: 'Premier Bank (Local/Intl)', icon: Building },
                  { id: 'salaam', label: 'Salaam Bank', icon: Building },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPaymentMethod(item.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition ${
                      paymentMethod === item.id
                        ? 'border-[#0284C7] bg-[#0284C7]/20 text-white'
                        : 'border-[#1E2C4A] bg-[#070A11] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-[#38BDF8] shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Payment Instructions */}
              <div className="p-4 rounded-xl border border-[#1E2C4A] bg-[#070A11] space-y-2">
                <span className="text-[11px] font-mono text-[#38BDF8] block uppercase">
                  {lang === 'so' ? 'Faahfaahinta Koontada' : 'Account & Transfer Coordinates'}
                </span>

                {paymentMethod === 'zaad' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">Telesom Zaad Number: <strong className="text-white font-mono">+252 63 XXXXXXX</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Geli lacagta mashruuca ama hormarka 50% ah ka dibna noo soo dir rasiidka.</p>
                  </div>
                )}

                {paymentMethod === 'sahal' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">Golis Sahal Number: <strong className="text-white font-mono">+252 90 XXXXXXX</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Ku bixi adeegga Sahal, rasiidka ayaa toos loogu xaqiijinayaa nidaamka.</p>
                  </div>
                )}

                {paymentMethod === 'edahab' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">E-Dahab Account: <strong className="text-white font-mono">+252 65 XXXXXXX</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Ku dhiibo koontada E-Dahab ee kor ku xusan.</p>
                  </div>
                )}

                {paymentMethod === 'waafi' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">Waafi Account: <strong className="text-white font-mono">+252 61 XXXXXXX</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Lacag-bixinta tooska ah ee Waafi / Hormuud.</p>
                  </div>
                )}

                {paymentMethod === 'premier' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">Bank: <strong className="text-white">Premier Bank</strong></p>
                    <p className="text-xs text-[#CBD5E1]">Account No: <strong className="text-white font-mono">0104000XXXXXX</strong></p>
                    <p className="text-xs text-[#CBD5E1]">SWIFT Code: <strong className="text-white font-mono">PRMRSO22</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Ku habboon xawaaladaha gudaha iyo international wire transfers ($2,000+ contracts).</p>
                  </div>
                )}

                {paymentMethod === 'salaam' && (
                  <div>
                    <p className="text-xs text-[#CBD5E1]">Bank: <strong className="text-white">Salaam African Bank</strong></p>
                    <p className="text-xs text-[#CBD5E1]">Account No: <strong className="text-white font-mono">3000XXXXXX</strong></p>
                    <p className="text-[11px] text-[#64748B] mt-1">Ku bixi Salaam Bank direct deposit ama app-ka bangiga.</p>
                  </div>
                )}
              </div>

              {/* Confirmation Action */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(lang === 'so' ? 'Mahadsanid! Dalabkaaga waa la xaqiijiyey, dhakhso ayaan kula soo xiriiraynaa.' : 'Thank you! Your project request and invoice coordinates are confirmed. We will reach out immediately.')
                    setPaymentModalOpen(false)
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold text-white shadow-lg transition"
                >
                  {lang === 'so' ? 'Waan Bixiyey / Xaqiiji Dalabka' : 'I Sent Payment / Confirm Order'}
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-4 py-3 rounded-xl border border-[#1E2C4A] text-xs font-semibold text-[#94A3B8] hover:text-white transition"
                >
                  {lang === 'so' ? 'Xir' : 'Cancel'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  )
}
