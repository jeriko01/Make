import { useState } from 'react'
import {
  Cpu,
  Shield,
  CheckCircle2,
} from 'lucide-react'
import Reveal from '../common/Reveal'
import { useLanguage } from '../../context/LanguageContext'

export default function TechStackSection() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('all')

  const CATEGORIES = [
    { id: 'all', label: lang === 'so' ? 'Dhammaan (All)' : 'All Stacks' },
    { id: 'frontend', label: 'Frontend Systems' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Data & Storage' },
    { id: 'mobile', label: 'Mobile Engineering' },
  ]

  const TECH_ITEMS = [
    // Frontend
    { name: 'React.js', category: 'frontend', level: 'Expert (10 yrs)', desc: 'SPA & Component architectures' },
    { name: 'Next.js', category: 'frontend', level: 'Advanced', desc: 'SSR, SSG, and edge routing' },
    { name: 'TypeScript', category: 'frontend', level: 'Expert', desc: 'Strict static type validation' },
    { name: 'Vue.js', category: 'frontend', level: 'Advanced', desc: 'Reactive modern UI interfaces' },
    { name: 'Tailwind CSS', category: 'frontend', level: 'Expert', desc: 'Bespoke design system tokens' },
    { name: 'Vite', category: 'frontend', level: 'Advanced', desc: 'Sub-second HMR & modern tooling' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Expert', desc: 'Core web standards & async patterns' },
    { name: 'Bootstrap / CSS3 / HTML5', category: 'frontend', level: 'Expert', desc: 'Semantic layouts & cross-browser styling' },

    // Backend
    { name: 'Python (FastAPI & Django)', category: 'backend', level: 'Senior / 10 yrs', desc: 'Async REST APIs, ORM & microservices' },
    { name: 'Node.js', category: 'backend', level: 'Advanced', desc: 'Event-driven backend services & websockets' },
    { name: 'C# (.NET Core)', category: 'backend', level: 'Advanced', desc: 'Enterprise microservices & architecture' },
    { name: 'PHP', category: 'backend', level: 'Advanced', desc: 'Robust server-side scripting & CMS logic' },
    { name: 'Java', category: 'backend', level: 'Proficient', desc: 'Scalable multi-threaded systems' },
    { name: 'C / C++', category: 'backend', level: 'Foundational', desc: 'Low-latency memory-safe engineering' },

    // Database
    { name: 'PostgreSQL', category: 'database', level: 'Senior DBA', desc: 'ACID transactions, RLS & indexing' },
    { name: 'MySQL / MariaDB', category: 'database', level: 'Advanced', desc: 'High-availability relational clusters' },
    { name: 'MongoDB', category: 'database', level: 'Advanced', desc: 'Flexible document stores & aggregation' },

    // Mobile
    { name: 'Flutter', category: 'mobile', level: 'Senior', desc: 'High-performance cross-platform apps' },
    { name: 'React Native', category: 'mobile', level: 'Senior', desc: 'Native feel iOS & Android codebases' },
    { name: 'Swift (iOS)', category: 'mobile', level: 'Advanced', desc: 'Bespoke native Apple ecosystem apps' },
  ]

  const filtered = activeTab === 'all' ? TECH_ITEMS : TECH_ITEMS.filter((t) => t.category === activeTab)

  return (
    <section id="tech-stack" aria-label="Technical Capabilities" className="relative py-20 bg-[#070A11] border-b border-[#1E2C4A]">
      <div className="container-page px-6 sm:px-10 lg:px-20">
        
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#1E2C4A] bg-[#0D1424] text-[#38BDF8] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
                <Cpu className="h-3.5 w-3.5" />
                <span>{lang === 'so' ? 'Qalabka & Tiknoolajiyadda' : 'Engineering Arsenal'}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === 'so' ? 'Tech Stack-ka Buuxa ee aan Ku Shaqeeyo' : 'Comprehensive Tech Stack & Tooling'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">
                {lang === 'so'
                  ? 'In ka badan 10 sano oo khibrad dhab ah loogu dhisay nidaamyo web, mobile, iyo cloud ah oo adkeysi leh iyadoo la isticmaalayo luuqadaha iyo qaab-dhismeedyada ugu sarreeya adduunka.'
                  : 'Over a decade of hands-on production engineering across web, mobile, and scalable cloud platforms. Battle-tested with enterprise-grade standards.'}
              </p>
            </div>

            {/* Quick status badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <Shield className="h-4 w-4" />
              <span>{lang === 'so' ? '100% Amni & Performance' : 'Zero Vulnerability Standard'}</span>
            </div>
          </div>
        </Reveal>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === cat.id
                  ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30 border border-[#38BDF8]/40'
                  : 'bg-[#0D1424] text-[#94A3B8] hover:text-white border border-[#1E2C4A] hover:border-[#2A3F6C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="group relative flex flex-col justify-between p-4.5 rounded-xl border border-[#1E2C4A] bg-[#0D1424]/90 hover:bg-[#111A30] hover:border-[#38BDF8]/40 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-lg hover:shadow-black/40"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {item.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#131F37] text-[#38BDF8] border border-[#38BDF8]/20">
                    {item.level}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E2C4A]/60 flex items-center justify-between text-[11px] font-mono text-[#64748B]">
                <span className="capitalize">{item.category}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
