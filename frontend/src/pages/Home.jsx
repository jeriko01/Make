import PageLayout from '../components/layout/PageLayout'
import Hero from '../components/sections/Hero'
import ServiceSelector from '../components/sections/ServiceSelector'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import ProjectPlanner from '../components/sections/ProjectPlanner'
import ProcessSection from '../components/sections/ProcessSection'
import TechStackSection from '../components/sections/TechStackSection'
import PrinciplesSection from '../components/sections/PrinciplesSection'
import FAQSection from '../components/sections/FAQSection'
import CollaborateCTA from '../components/sections/CollaborateCTA'
import { SiteDataProvider } from '../context/SiteDataContext'

/**
 * Home — Portfolio landing page for Make.
 */
function HomeContent() {
  return (
    <>
      {/* 1 & 2 & 3 · Hero + Capability Strip */}
      <Hero />

      {/* 4 · Feature cards / Service selector ("What do you need built?") */}
      <ServiceSelector />

      {/* 5 · Capabilities overview */}
      <About brief />

      {/* 6 · Featured projects */}
      <Projects featured limit={3} />

      {/* 7 · Interactive Project Scope & Timeline Planner */}
      <ProjectPlanner />

      {/* 8 · How I work (4 steps) */}
      <ProcessSection />

      {/* 9 · Technical solutions: Stack & Architecture pipeline */}
      <TechStackSection />

      {/* 9 · Engineering principles */}
      <PrinciplesSection />

      {/* 10 · FAQ & Support */}
      <FAQSection limit={5} />

      {/* 11 · Final Collaboration CTA */}
      <CollaborateCTA />
    </>
  )
}

export default function Home() {
  return (
    <SiteDataProvider>
      <PageLayout
        title="Home"
        description="Make — Senior Web & Mobile Engineering Studio. Web and mobile products, built to work."
      >
        <HomeContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
