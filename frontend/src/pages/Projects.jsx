import { SiteDataProvider } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import ProjectsGallery from '../components/sections/Projects'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'
import { Code2, Layers, Globe, Smartphone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const HIGHLIGHTS = [
  {
    icon: Globe,
    badge: 'React 19',
    titleEn: 'Web Applications',
    titleSo: 'Nidaamyada Web-ka',
    descEn: 'High-performance React and TypeScript applications built for speed, responsiveness, and clean user experience.',
    descSo: 'Codsiyo React & TypeScript ah oo leh interface degdeg ah, responsive buuxa, iyo design aad u nadiif ah.',
  },
  {
    icon: Smartphone,
    badge: '60fps Native',
    titleEn: 'Mobile Apps',
    titleSo: 'Codsiyada Mobile-ka',
    descEn: 'Cross-platform iOS and Android apps with Flutter and React Native, offline-first data, and native APIs.',
    descSo: 'Codsiyada iOS & Android ee Flutter iyo React Native oo leh 60fps animations debecsan iyo kayd offline ah.',
  },
  {
    icon: Layers,
    badge: '< 50ms P99',
    titleEn: 'Backend & Cloud',
    titleSo: 'Backend & Cloud APIs',
    descEn: 'FastAPI and Node.js microservices with sub-50ms latency, strict Pydantic validation, and CI/CD pipelines.',
    descSo: 'API-yo xawaare sare leh oo Python FastAPI iyo Node.js ah, async I/O, iyo dhuumo CI/CD oo otomaatig ah.',
  },
  {
    icon: Code2,
    badge: 'ACID / RLS',
    titleEn: 'APIs & Data Layers',
    titleSo: 'Xogta & Keydka ACID',
    descEn: 'ACID-compliant PostgreSQL and Supabase schemas with optimized indexing, Row-Level Security, and cache.',
    descSo: 'Nidaamyada PostgreSQL iyo Supabase oo leh indexing qotodheer, Row-Level Security, iyo caching degdeg ah.',
  },
]

export default function ProjectsPage() {
  const { lang } = useLanguage()

  const stats = [
    { num: '20+', label: lang === 'so' ? 'Mashaariic La Kiciyay' : 'Projects Shipped' },
    { num: '4', label: lang === 'so' ? 'Noocyo Platform ah' : 'Platform Types' },
    { num: '100%', label: lang === 'so' ? 'Lahaanshaha Koodhka' : 'Code Ownership' },
    { num: '3+', label: lang === 'so' ? 'Sano oo Khibrad ah' : 'Years Active' },
  ]
  return (
    <SiteDataProvider>
      <PageLayout
        title={lang === 'so' ? 'Mashaariicda' : 'Projects'}
        description="Make's technical portfolio — web applications, mobile apps, and full-stack engineering builds. Browse live previews and source code."
      >
        <div
          className="relative overflow-hidden border-b border-[#1E2C4A] pt-28 sm:pt-36 pb-16 sm:pb-24"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(6,8,14,0.65) 0%, rgba(6,8,14,0.85) 60%, rgba(6,8,14,0.98) 100%), url(/images/projects-hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >

          <div className="container-page relative z-10 mx-auto max-w-3xl text-center">
            <Reveal>
              <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                {lang === 'so' ? (
                  <>
                    Nidaamyo dhab ah.{' '}
                    <span className="text-[#38BDF8]">Injineernimo dhab ah.</span>
                  </>
                ) : (
                  <>
                    Real products.{' '}
                    <span className="text-[#38BDF8]">Real engineering.</span>
                  </>
                )}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
                {lang === 'so'
                  ? 'Katalog mashaariic la daabacay oo web, mobile, iyo full-stack ah. Guji mashruuc kasta si aad u aragto live preview ama koodhka GitHub.'
                  : 'A filterable gallery of shipped web applications, mobile apps, and full-stack software. Click any project to open a live preview or visit the source.'}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-8 border-t border-[#1E2C4A]/60 pt-8">
                {stats.map(({ num, label }) => (
                  <div key={label} className="text-center">
                    <p className="font-display text-2xl font-black text-white">{num}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#94A3B8]">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <div className="border-b border-[#1E2C4A] bg-[#06080E] py-10 sm:py-12">
          <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {HIGHLIGHTS.map((h, i) => {
              const IconComp = h.icon
              const title = lang === 'so' ? h.titleSo : h.titleEn
              const desc = lang === 'so' ? h.descSo : h.descEn
              return (
                <Reveal key={h.titleEn} delay={i * 50} className="h-full">
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#1E2C4A] bg-[#0A0F1A] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/60 hover:bg-[#0D1424] hover:shadow-[0_8px_28px_rgba(56,189,248,0.12)]">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1E2C4A] bg-[#06080E] text-[#38BDF8] group-hover:bg-[#0284C7] group-hover:text-white transition-all">
                          <IconComp className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-[10px] font-bold text-[#38BDF8] bg-[#06080E] border border-[#1E2C4A] px-2 py-0.5 rounded-md">
                          {h.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-sm sm:text-[15px] font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-snug">
                        {title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[12.5px] leading-relaxed text-[#94A3B8]">
                        {desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1E2C4A]/40 flex items-center justify-between text-[10.5px] text-[#38BDF8] font-mono font-medium">
                      <span>{lang === 'so' ? 'Heerka Shaqada' : 'Production Ready'}</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
        <ProjectsGallery showFilters featured={false} />
        <CollaborateCTA
          topHeading="Ready for similar results?"
          mainHeading="Let’s launch your vision next."
          body="Share your product goals and timeline. I’ll provide a structured architecture breakdown, transparent milestones, and clean code."
          bgImage="/images/cta-projects-bg.jpg"
          primaryBtnText="Get Started"
          primaryBtnTo="/support"
          secondaryBtnText="Services"
          secondaryBtnTo="/services"
        />
      </PageLayout>
    </SiteDataProvider>
  )
}
