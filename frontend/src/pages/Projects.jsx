import { SiteDataProvider } from '../context/SiteDataContext'
import PageLayout from '../components/layout/PageLayout'
import Projects from '../components/sections/Projects'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'

export default function ProjectsPage() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Projects"
        description="Make's technical portfolio — web applications, mobile apps, and full-stack engineering builds."
      >
        {/* Page Hero */}
        <div className="bg-[#0e0e0e] pt-32 pb-16 border-b border-[#1e261d]">
          <div className="container-page">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#39A751]/30 bg-[#1e2b1a] px-3.5 py-1 text-xs font-bold tracking-widest text-[#52fe7d]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39A751] animate-pulse" />
                <span>CASE STUDIES &amp; CODE</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Technical project gallery
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[#d2d7dc]">
                Filterable gallery of web applications, mobile applications, and full-stack software. Each real project reflects clean architecture and verified code quality.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Full Gallery with Category Filters */}
        <Projects showFilters featured={false} />

        {/* Collaborate CTA */}
        <CollaborateCTA
          heading="Have a similar product to build?"
          body="Tell me about your target users and timeline. I'll provide an architectural breakdown and estimated milestone plan."
        />
      </PageLayout>
    </SiteDataProvider>
  )
}
