import PageLayout from '../components/layout/PageLayout'
import Hero from '../components/sections/Hero'
import ServiceSelector from '../components/sections/ServiceSelector'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import ProcessSection from '../components/sections/ProcessSection'
import PrinciplesSection from '../components/sections/PrinciplesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
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
      <Projects featured limit={3} />
      <ServiceSelector />
      <About brief />
      <ProcessSection />
      <PrinciplesSection />
      <TestimonialsSection />
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
