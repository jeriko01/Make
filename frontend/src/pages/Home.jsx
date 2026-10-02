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
      <Hero />
      <ServiceSelector />
      <About brief />
      <Projects featured limit={3} />
      <ProjectPlanner />
      <ProcessSection />
      <TechStackSection />
      <PrinciplesSection />
      <FAQSection limit={5} />
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
