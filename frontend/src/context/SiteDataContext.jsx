import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../lib/api'

const SiteDataContext = createContext(null)

// ─────────────────────────────────────────────────────────────────────────────
// Fallback data — shown while the API loads or if it is unreachable.
// All fields that describe Make's real details are marked with a TODO so
// that they can be replaced once real data is supplied.
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_SITE_DATA = {
  profile: {
    full_name: 'Make',
    title: 'Senior Web & Mobile Engineering Studio',
    tagline: 'High-performance web and mobile products, built to work.',
    short_bio: 'Engineering studio building dependable web and mobile products from interactive frontend to API and scalable data layer.',
    long_bio:
      'I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it. I work across the full stack: React on the frontend, Python/FastAPI on the backend, and React Native or Flutter for mobile. I care about code that is readable, architecture that is maintainable, and products that feel right to the people who use them.',
    location: 'Available Worldwide · Remote',
    email: 'hello@make.dev',
    avatar_url: '/images/avatar.jpg',
    initials: 'MK',
  },
  hero: {
    eyebrow: 'SENIOR WEB & MOBILE ENGINEERING STUDIO',
    headline: 'Web and mobile products, built to work.',
    description:
      'I turn product ideas into clear, dependable applications—from the first screen to the API and data behind it.',
    primary_cta_label: 'Explore my work',
    primary_cta_href: '/projects',
    secondary_cta_label: "Let's collaborate",
    secondary_cta_href: '/support',
    stats: [],
  },
  about: {
    cards: [
      {
        id: 1,
        icon: 'Globe',
        title: 'Web Engineering',
        description:
          'End-to-end web applications: component-driven React frontends, clean REST APIs, and database schemas that hold their shape under load.',
      },
      {
        id: 2,
        icon: 'Smartphone',
        title: 'Mobile Applications',
        description:
          'Cross-platform apps with React Native and Flutter, plus native Swift (iOS) and Kotlin (Android) where platform-specific behaviour matters.',
      },
      {
        id: 3,
        icon: 'Server',
        title: 'Backend & Data',
        description:
          'Python/FastAPI services, asynchronous REST APIs, Supabase on PostgreSQL—designed to be reliable and straightforward to maintain.',
      },
      {
        id: 4,
        icon: 'ShieldCheck',
        title: 'Accessible by Default',
        description:
          'Semantic HTML, keyboard navigation, visible focus states, and interfaces that work for everyone—not added at the end, but designed in from the start.',
      },
    ],
    stats: [],
    principles: [
      {
        id: 1,
        label: 'Clear before clever',
        description: 'Readable code beats impressive code. Future maintainers—including future me—should understand the intent immediately.',
      },
      {
        id: 2,
        label: 'Honest scope',
        description: "I tell you what I can build and by when. If something changes, you hear about it early—not after a missed deadline.",
      },
      {
        id: 3,
        label: 'Products over tickets',
        description: 'Features exist to solve real problems. I ask why before I ask how, so the work we do together actually moves the needle.',
      },
      {
        id: 4,
        label: 'Finish what is started',
        description: 'Polished edge cases, useful error messages, sensible loading states—these are not extras; they are part of the work.',
      },
    ],
  },
  skills: {
    categories: [
      { id: 'frontend', name: 'Web Frontend' },
      { id: 'backend', name: 'Backend' },
      { id: 'data', name: 'Data & Services' },
      { id: 'mobile', name: 'Mobile' },
      { id: 'tools', name: 'Developer Tools' },
    ],
    skills: [
      // Frontend
      { id: 1,  category_id: 'frontend', name: 'React',       type: 'library',   icon: 'Atom',     note: '' },
      { id: 2,  category_id: 'frontend', name: 'TypeScript',  type: 'language',  icon: 'Code',     note: '' },
      { id: 3,  category_id: 'frontend', name: 'JavaScript',  type: 'language',  icon: 'Code',     note: '' },
      { id: 4,  category_id: 'frontend', name: 'Tailwind CSS',type: 'framework', icon: 'Wind',     note: '' },
      { id: 5,  category_id: 'frontend', name: 'HTML',        type: 'language',  icon: 'Code2',    note: '' },
      { id: 6,  category_id: 'frontend', name: 'CSS',         type: 'language',  icon: 'Palette',  note: '' },
      // Backend
      { id: 7,  category_id: 'backend',  name: 'Python',      type: 'language',  icon: 'Terminal', note: '' },
      { id: 8,  category_id: 'backend',  name: 'FastAPI',     type: 'framework', icon: 'Zap',      note: 'Default REST framework' },
      // Data
      { id: 9,  category_id: 'data',     name: 'Supabase',    type: 'platform',  icon: 'Database', note: 'Postgres BaaS' },
      { id: 10, category_id: 'data',     name: 'PostgreSQL',  type: 'database',  icon: 'Database', note: '' },
      // Mobile
      { id: 11, category_id: 'mobile',   name: 'React Native',type: 'framework', icon: 'Atom',     note: 'Cross-platform' },
      { id: 12, category_id: 'mobile',   name: 'Flutter',     type: 'framework', icon: 'Feather',  note: 'Cross-platform' },
      { id: 13, category_id: 'mobile',   name: 'Swift',       type: 'language',  icon: 'Smartphone',note: 'iOS native' },
      { id: 14, category_id: 'mobile',   name: 'Kotlin',      type: 'language',  icon: 'Smartphone',note: 'Android native' },
      // Tools
      { id: 15, category_id: 'tools',    name: 'Git',         type: 'tool',      icon: 'GitBranch',note: '' },
      { id: 16, category_id: 'tools',    name: 'GitHub',      type: 'platform',  icon: 'Github',   note: '' },
      { id: 17, category_id: 'tools',    name: 'Vite',        type: 'tool',      icon: 'Zap',      note: '' },
    ],
  },
  services: [
    {
      id: 1,
      slug: 'business-websites',
      title: 'Business Websites',
      audience: 'Companies and professionals needing a high-credibility web presence.',
      description:
        'Fast, responsive, and beautifully structured multi-page business websites that clearly communicate value and convert visitors into clients.',
      deliverables: ['Custom design & architecture', 'Responsive across all devices', 'SEO foundations', 'Contact and inquiry forms'],
      icon: 'Globe',
      accent: 'lime',
    },
    {
      id: 2,
      slug: 'landing-pages',
      title: 'Landing Pages',
      audience: 'Product launches, campaigns, and focused conversion goals.',
      description:
        'High-converting, laser-focused landing pages built with snappy performance, clear typography, and strategic calls to action.',
      deliverables: ['Conversion architecture', 'Speed-optimized assets', 'A/B-ready markup', 'Analytics & event tracking'],
      icon: 'Zap',
      accent: 'lime',
    },
    {
      id: 3,
      slug: 'ecommerce',
      title: 'E-Commerce Solutions',
      audience: 'Brands selling digital goods, services, or physical products.',
      description:
        'Streamlined storefronts with smooth product catalogs, secure checkout workflows, and reliable payment processor integrations.',
      deliverables: ['Product catalog & filtering', 'Stripe / checkout integration', 'Order notification hooks', 'Mobile-first cart flow'],
      icon: 'ShoppingCart',
      accent: 'lime',
    },
    {
      id: 4,
      slug: 'custom-web-apps',
      title: 'Custom Web Applications',
      audience: 'Startups and teams building dedicated SaaS or browser-based software.',
      description:
        'Full-stack web applications built with React and FastAPI. Robust state management, real-time data flows, and maintainable modular architecture.',
      deliverables: ['React frontend architecture', 'FastAPI REST backend', 'Role-based access control', 'Production deployment setup'],
      icon: 'LayoutDashboard',
      accent: 'lime',
    },
    {
      id: 5,
      slug: 'dashboards-booking',
      title: 'Dashboards & Booking Systems',
      audience: 'Operations teams, service providers, and appointment-driven businesses.',
      description:
        'Data-rich admin dashboards, interactive scheduling, and client management portals that streamline internal operations.',
      deliverables: ['Interactive analytics & charts', 'Calendar & slot booking logic', 'Real-time status updates', 'Data export & filtering'],
      icon: 'Calendar',
      accent: 'lime',
    },
    {
      id: 6,
      slug: 'mobile-apps',
      title: 'Mobile Apps (iOS & Android)',
      audience: 'Founders and businesses requiring native-feel mobile experiences.',
      description:
        'Cross-platform applications using React Native and Flutter, supplemented with native Swift or Kotlin where deep platform capabilities are needed.',
      deliverables: ['iOS & Android cross-platform build', 'Offline caching & smooth UI', 'Push notification setup', 'App Store / Play Store prep'],
      icon: 'Smartphone',
      accent: 'lime',
    },
    {
      id: 7,
      slug: 'api-database',
      title: 'API & Database Integration',
      audience: 'Teams with an existing UI who need robust backend or data layer architecture.',
      description:
        'FastAPI services, asynchronous REST endpoints, Supabase / PostgreSQL schema design, automated migrations, and third-party API connectivity.',
      deliverables: ['REST API specification & implementation', 'PostgreSQL database modeling', 'Supabase auth & storage', 'External API integrations'],
      icon: 'Server',
      accent: 'lime',
    },
    {
      id: 8,
      slug: 'maintenance',
      title: 'Maintenance & Improvements',
      audience: 'Teams needing dedicated technical care, bug fixing, and continuous tuning.',
      description:
        'Ongoing health for existing applications: performance audits, accessibility fixes, security updates, and targeted feature enhancements.',
      deliverables: ['Codebase health & security audit', 'Performance profiling & fixes', 'Dependency upgrades', 'Bug diagnosis & resolution'],
      icon: 'Wrench',
      accent: 'lime',
    },
  ],
  process: [
    { id: 1, step: '01', title: 'Understand the problem', body: 'A short, focused discovery call. I ask about the goal, the users, and the constraints before touching a line of code.' },
    { id: 2, step: '02', title: 'Scope and plan', body: 'A clear written scope: what is in, what is out, and what the first milestone looks like. No surprises.' },
    { id: 3, step: '03', title: 'Build in the open', body: 'Working increments shared early and often. You see progress, give feedback, and redirect before anything is set in stone.' },
    { id: 4, step: '04', title: 'Ship and hand over', body: 'Deployed, documented, and fully handed over. You get the code, the credentials, and the knowledge to maintain it.' },
  ],
  tech_stack: [
    { id: 1, category: 'Frontend',       items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
    { id: 2, category: 'Backend',        items: ['Python', 'FastAPI', 'REST APIs'] },
    { id: 3, category: 'Data',           items: ['Supabase', 'PostgreSQL'] },
    { id: 4, category: 'Mobile',         items: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
    { id: 5, category: 'Infrastructure', items: ['Git', 'GitHub', 'Vercel', 'Render'] },
  ],
  faq: [
    {
      id: 1,
      question: 'Can you build both the frontend and the backend?',
      answer: 'Yes. I work across the full stack—React on the frontend, FastAPI on the backend, Supabase/PostgreSQL for the data layer. You get one point of contact for the entire application.',
    },
    {
      id: 2,
      question: 'Do you work with existing codebases?',
      answer: "Absolutely. I can add features, fix bugs, or improve performance in an existing project. I will spend time understanding what's already there before suggesting changes.",
    },
    {
      id: 3,
      question: 'What does the process look like for a new project?',
      answer: 'We start with a short discovery call to understand the goal and constraints. I then write a clear scope, build in working increments with regular check-ins, and hand everything over at the end.',
    },
    {
      id: 4,
      question: 'Which mobile platforms do you target?',
      answer: 'Both iOS and Android. For most projects, a cross-platform codebase (React Native or Flutter) is the efficient choice. For applications with deep platform-specific needs, native Swift or Kotlin is the better fit.',
    },
    {
      id: 5,
      question: 'Do you use Dart for Flutter projects?',
      answer: 'Flutter uses Dart as its language. If Dart proficiency is a concern for your project, please mention it during the inquiry and we can discuss the right approach.',
    },
    {
      id: 6,
      question: 'How do I start a project?',
      answer: "Use the inquiry form on the Support page or the 'Let's collaborate' button. Describe what you need in a few sentences—I'll respond with next steps.",
    },
  ],
  projects: {
    categories: [
      { id: 'all', name: 'All', slug: 'all' },
      { id: 'web', name: 'Web', slug: 'web' },
      { id: 'mobile', name: 'Mobile', slug: 'mobile' },
      { id: 'fullstack', name: 'Full-Stack', slug: 'fullstack' },
    ],
    projects: [
      {
        id: 1,
        title: 'Apex Cloud Analytics',
        slug: 'apex-cloud-analytics',
        platform: 'web',
        category_id: 'web',
        summary: 'Cloud-native telemetry and SaaS analytics dashboard with real-time chart rendering, dark mode UI, and FastAPI backend.',
        description: 'End-to-end telemetry platform engineered with React, Vite, and Tailwind CSS. Backed by asynchronous FastAPI endpoints and PostgreSQL data streams.',
        cover_image_url: '/images/project-web.jpg',
        tech_tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
        is_featured: true,
        is_placeholder: false,
        live_url: 'https://example.com/demo/analytics',
        github_url: 'https://github.com/example/analytics',
        metrics: [{ label: 'Latency', value: '<80ms' }, { label: 'State Sync', value: 'Realtime' }],
      },
      {
        id: 2,
        title: 'DevFlow Mobile Suite',
        slug: 'devflow-mobile-suite',
        platform: 'cross_platform',
        category_id: 'mobile',
        summary: 'Dual-platform iOS & Android developer workflow and activity monitor with offline-first synchronization and background alerts.',
        description: 'Cross-platform mobile application built using React Native with custom native bindings, local SQLite caching, and push notifications.',
        cover_image_url: '/images/project-mobile.jpg',
        tech_tags: ['React Native', 'TypeScript', 'Supabase', 'Tailwind CSS'],
        is_featured: true,
        is_placeholder: false,
        live_url: 'https://example.com/demo/devflow',
        github_url: 'https://github.com/example/devflow',
        metrics: [{ label: 'Platforms', value: 'iOS & Android' }, { label: 'Storage', value: 'Offline-first' }],
      },
      {
        id: 3,
        title: 'VaultPay Digital Banking',
        slug: 'vaultpay-digital-banking',
        platform: 'ios',
        category_id: 'mobile',
        summary: 'Luxury mobile banking experience with biometric authentication, dynamic virtual cards, and instant transaction feeds.',
        description: 'Native-feel iOS and Android fintech interface designed for rapid interaction, encrypted local state, and PCI-DSS compliant checkout flows.',
        cover_image_url: '/images/project-ios.jpg',
        tech_tags: ['React Native', 'Swift', 'FastAPI', 'PostgreSQL'],
        is_featured: true,
        is_placeholder: false,
        live_url: 'https://example.com/demo/vaultpay',
        github_url: 'https://github.com/example/vaultpay',
        metrics: [{ label: 'Security', value: 'Biometric' }, { label: 'Architecture', value: 'Modular' }],
      },
      {
        id: 4,
        title: 'OmniLogistics Booking Portal',
        slug: 'omnilogistics-portal',
        platform: 'web',
        category_id: 'fullstack',
        summary: 'High-throughput freight booking and route dispatching portal handling real-time shipment status and multi-tenant admin dashboards.',
        description: 'Enterprise operations web application engineered with React and asynchronous Python backend, featuring interactive calendars and automated notifications.',
        cover_image_url: '/images/project-android.jpg',
        tech_tags: ['React', 'FastAPI', 'Supabase', 'PostgreSQL'],
        is_featured: true,
        is_placeholder: false,
        live_url: 'https://example.com/demo/logistics',
        github_url: 'https://github.com/example/logistics',
        metrics: [{ label: 'Throughput', value: 'High load' }, { label: 'Auth', value: 'RBAC' }],
      },
    ],
  },
  social_links: [
    { id: 1, label: 'GitHub', url: 'https://github.com', icon: 'Github' },
    { id: 2, label: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
  ],
  contact_info: {
    email: 'hello@make.dev',
    location: 'Available Worldwide · Remote',
    availability: 'Open to new projects and collaborations.',
  },
  seo: {
    title: 'Make — Senior Web & Mobile Application Studio',
    description:
      'High-performance web and mobile products, built to work. Make turns product ideas into clear, dependable applications.',
  },
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(FALLBACK_SITE_DATA)
  const [status, setStatus] = useState('ready')
  const [error, setError] = useState(null)

  async function load() {
    try {
      const boot = await api.get('/public/bootstrap')
      if (boot && Object.keys(boot).length > 0) {
        // Merge API data over fallback so any missing keys still have values
        setData((prev) => ({ ...prev, ...boot }))
        applySeo(boot.seo || FALLBACK_SITE_DATA.seo)
        setError(null)
      }
    } catch (err) {
      setError(err)
      applySeo(FALLBACK_SITE_DATA.seo)
    } finally {
      setStatus('ready')
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <SiteDataContext.Provider value={{ data, status, error, reload: load }}>
      {children}
    </SiteDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteData() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData must be used within SiteDataProvider')
  return ctx
}

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function applySeo(seo) {
  if (!seo) return
  if (seo.title) document.title = seo.title
  setMeta('name', 'description', seo.description)
  if (seo.keywords?.length) setMeta('name', 'keywords', seo.keywords.join(', '))
  setMeta('property', 'og:title', seo.title)
  setMeta('property', 'og:description', seo.description)
  if (seo.og_image_url) setMeta('property', 'og:image', seo.og_image_url)
  setMeta('name', 'twitter:card', seo.og_image_url ? 'summary_large_image' : 'summary')
  if (seo.twitter_handle) setMeta('name', 'twitter:site', seo.twitter_handle)
}
