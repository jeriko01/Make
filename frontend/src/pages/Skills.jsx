import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  Cpu,
  Server,
  Cloud,
  Database,
  Smartphone,
  Layers,
  Terminal as TerminalIcon,
  CheckCircle2,
} from 'lucide-react'
import { SiteDataProvider, useSiteData } from '../context/SiteDataContext'
import { useLanguage } from '../context/LanguageContext'
import PageLayout from '../components/layout/PageLayout'
import Reveal from '../components/common/Reveal'
import CollaborateCTA from '../components/sections/CollaborateCTA'

/**
 * Authentic SVG Brand Icons for all technologies.
 */
function BrandIcon({ name, className = 'h-5 w-5' }) {
  switch (name) {
    case 'React':
    case 'React Native':
      return (
        <svg className={className} viewBox="-11.5 -10.232 23 20.463" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#58c4dc" />
          <g stroke="#58c4dc" strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )

    case 'TypeScript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#3178c6" />
          <path
            fill="#ffffff"
            d="M12.5 13.8c-.3-.2-.5-.4-.7-.7-.2-.3-.3-.7-.3-1.1h1.5c0 .3.1.5.2.7.1.2.3.3.6.3.3 0 .5-.1.6-.2.1-.1.2-.3.2-.5 0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.7-.4-.5-.2-.9-.4-1.2-.7-.3-.3-.4-.7-.4-1.2 0-.6.2-1 .6-1.3.4-.3.9-.5 1.5-.5.6 0 1.1.2 1.5.5.4.3.6.8.6 1.4h-1.5c0-.3-.1-.5-.2-.6-.1-.1-.3-.2-.5-.2-.2 0-.4.1-.5.2-.1.1-.1.2-.1.4 0 .2.1.3.2.4.1.1.4.3.8.4.6.2 1 .5 1.2.7.3.3.4.7.4 1.2 0 .6-.2 1.1-.6 1.4-.4.3-1 .5-1.7.5-.7 0-1.2-.2-1.6-.5zm-4.3-.8v-5h-1.7v-1.3h4.8v1.3h-1.7v5H8.2z"
          />
        </svg>
      )

    case 'JavaScript':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#f7df1e" />
          <path
            fill="#000000"
            d="M13.2 15.6c.4.7 1 1.1 1.9 1.1.8 0 1.3-.4 1.3-1 0-.7-.5-.9-1.5-1.3l-.5-.2c-1.5-.6-2.5-1.4-2.5-3 0-1.6 1.2-2.8 3.1-2.8 1.4 0 2.3.5 2.9 1.6l-1.4.9c-.3-.6-.7-.9-1.5-.9-.7 0-1.1.4-1.1.9 0 .6.4.8 1.3 1.2l.5.2c1.7.7 2.7 1.5 2.7 3.2 0 1.8-1.4 3-3.4 3-1.9 0-3.1-.9-3.7-2.1l1.4-.8zm-5.4.2c.2.4.5.7 1 .7.5 0 .8-.2.8-1V8.5h1.8v7.1c0 1.8-1.1 2.6-2.6 2.6-1.4 0-2.2-.7-2.6-1.7l1.6-.7z"
          />
        </svg>
      )

    case 'Python':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="#3776ab"
            d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v1.4h3v.4H6.3S4 4.8 4 8c0 3.1 1.9 3 1.9 3h1.2V9.6c0-1.5 1.3-1.5 1.3-1.5h3.6c1.3 0 1.3-1.3 1.3-1.3V3.3S13.4 2 11.9 2zm-.9 1a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"
          />
          <path
            fill="#ffd343"
            d="M12.1 22c3.1 0 2.9-1.3 2.9-1.3v-1.4h-3v-.4h5.7s2.3.3 2.3-2.9c0-3.1-1.9-3-1.9-3h-1.2v1.4c0 1.5-1.3 1.5-1.3 1.5H12c-1.3 0-1.3 1.3-1.3 1.3v3.4s-.1 1.4 1.4 1.4zm.9-1a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z"
          />
        </svg>
      )

    case 'FastAPI':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="#059669" />
          <path
            fill="#ffffff"
            d="M12.8 3L6 13h5.2l-1.5 8L18 10h-5.2l1.5-7z"
          />
        </svg>
      )

    case 'Node.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#68a063">
          <path d="M12 2l10 5.8v11.5L12 25 2 19.3V7.8L12 2zm0 2.3L4.2 8.7v8.8l7.8 4.5 7.8-4.5V8.7L12 4.3z" />
        </svg>
      )

    case 'Express':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
        </svg>
      )

    case 'Tailwind CSS':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#38bdf8">
          <path d="M12 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.3.8.3 1.3.9 1.9 1.5 1 1 2.2 2.2 4.8 2.2 2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.3-.8-.3-1.3-.9-1.9-1.5-1-1-2.2-2.2-4.8-2.2zm-6 6c-2.7 0-4.4 1.3-5.2 4 .9-1.3 2-1.8 3.3-1.3.8.3 1.3.9 1.9 1.5 1 1 2.2 2.2 4.8 2.2 2.7 0 4.4-1.3 5.2-4-.9 1.3-2 1.8-3.3 1.3-.8-.3-1.3-.9-1.9-1.5-1-1-2.2-2.2-4.8-2.2z" />
        </svg>
      )

    case 'HTML':
    case 'HTML5':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#e34f26">
          <path d="M4 2l1.6 18.2L12 22l6.4-1.8L20 2H4zm13.1 5.3l-.2 2.4H8.7l.2 2.4h8l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.3h2.3l.1 1.6 2.2.6 2.2-.6.2-2.7H6.5L5.9 7.3h11.2z" />
        </svg>
      )

    case 'CSS':
    case 'CSS3':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#1572b6">
          <path d="M4 2l1.6 18.2L12 22l6.4-1.8L20 2H4zm13.1 5.3H6.8l.2 2.4h10l-.7 7.6-4.3 1.2-4.3-1.2-.3-3h2.3l.1 1.5 2.2.6 2.2-.6.3-3.6H6.5l-.2-2.5h10.9l.1-2.4z" />
        </svg>
      )

    case 'PostgreSQL':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c-2.8 0-4.5-1.9-4.5-4.3 0-1.8 1-3.2 2.5-3.8-.4-.6-.6-1.4-.6-2.2 0-2.1 1.6-3.7 3.7-3.7s3.7 1.6 3.7 3.7c0 .8-.2 1.6-.6 2.2 1.5.6 2.5 2 2.5 3.8 0 2.4-1.7 4.3-4.5 4.3h-2.2v-.02z" />
        </svg>
      )

    case 'Supabase':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#3ecf8e">
          <path d="M13.4 2.2c-.4-.5-1.2-.3-1.3.4l-1.9 9.8h7.9c.7 0 1.1.9.6 1.4L8.4 22.4c-.5.5-1.3.2-1.2-.5l1.9-9.8H1.3c-.7 0-1.1-.9-.6-1.4L13.4 2.2z" />
        </svg>
      )

    case 'MySQL':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#00758f">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm1 15.5h-2v-2h2v2zm0-4h-2V7h2v6.5z" />
        </svg>
      )

    case 'MongoDB':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#47a248">
          <path d="M12 1.5c-.4 0-1 .4-1.2.7C9.5 4.2 6.5 9.7 6.5 14c0 3.3 2.5 6 5.5 6s5.5-2.7 5.5-6c0-4.3-3-9.8-4.3-11.8-.2-.3-.8-.7-1.2-.7zm0 17.5c-2.4 0-4.3-2-4.3-4.5 0-2.8 1.8-6.7 3.4-9.3.5.8 1 1.7 1.4 2.7-.2.2-.5.5-.5.9 0 .7.6 1.2 1.2 1.2s1.2-.5 1.2-1.2c0-.4-.2-.7-.5-.9.4-1 .9-1.9 1.4-2.7 1.6 2.6 3.4 6.5 3.4 9.3 0 2.5-1.9 4.5-4.3 4.5h-2.3z" />
        </svg>
      )

    case 'SQLite':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#003b57">
          <path d="M12 2C6.48 2 2 5.58 2 10v4c0 4.42 4.48 8 10 8s10-3.58 10-8v-4c0-4.42-4.48-8-10-8zm0 2c4.41 0 8 2.69 8 6s-3.59 6-8 6-8-2.69-8-6 3.59-6 8-6zm0 14c-4.41 0-8-2.69-8-6v2.2c0 2.76 3.59 5 8 5s8-2.24 8-5V12c0 3.31-3.59 6-8 6z" />
        </svg>
      )

    case 'Flutter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#02569b">
          <path d="M14.3 2L4.5 11.8l3 3L17.3 2h-3zm0 7.8L9.2 14.9l4.9 4.9h6L14.3 9.8z" />
        </svg>
      )

    case 'Dart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#0175c2">
          <path d="M4 3.5L12 2l8 8-4.5 9.5-11.5-1L4 3.5zm7 2.5L5.5 16l8.5.8 3.5-7.3-6.5-3.5z" />
        </svg>
      )

    case 'Swift':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05138">
          <path d="M20.2 17.5c-3.1 3.5-7.9 4.4-12.2 3.1 3.2-1.7 5.6-4.5 6.5-7.8-2.6 1.4-5.3 1.8-7.9 1.1 3.6-2.6 5.8-6.6 6-10.9-2.3 2-4.9 3.5-7.8 4.2C6 5.3 7.8 3.5 10.2 2 4.8 5.6 1.8 11.8 2.6 18.2c4.8 4.6 12.1 4.7 17.6-.7z" />
        </svg>
      )

    case 'Kotlin':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path fill="#7f52ff" d="M2 2h20L12 12l10 10H2V2z" />
          <path fill="#c757bc" d="M2 12l10 10H2V12z" />
        </svg>
      )

    case 'Git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#f05032">
          <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2.1-.8-2.9 0L8.1 4.5l3.7 3.7c.9-.3 1.9-.1 2.5.6.7.7.8 1.7.5 2.5l3.5 3.5c.8-.3 1.9-.1 2.5.6.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.8-.8-1-2-.4-2.9l-3.3-3.3v4.6c.3.2.6.5.7.9.6 1.3 0 2.8-1.3 3.4-1.3.6-2.8 0-3.4-1.3-.4-.9-.3-1.9.3-2.6V8.6c-.6-.7-.7-1.7-.3-2.6L6 8.3l-3.6 3.6c-.8.8-.8 2.1 0 2.9l8.5 8.5c.8.8 2.1.8 2.9 0l7.8-7.8c.8-.8.8-2.1 0-2.9z" />
        </svg>
      )

    case 'GitHub':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.52 2 12.1c0 4.46 2.87 8.24 6.84 9.58.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.39-2.01 1.03-2.72-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.04.8-.23 1.65-.34 2.5-.34.85 0 1.7.12 2.5.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.43.1 2.69.64.71 1.03 1.61 1.03 2.72 0 3.9-2.34 4.75-4.57 5.01.36.32.69.94.69 1.9v2.82c0 .27.18.58.69.48A10.12 10.12 0 0 0 22 12.1C22 6.52 17.52 2 12 2z" />
        </svg>
      )

    case 'Docker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#2496ed">
          <path d="M13.9 10.4h1.9v1.8h-1.9v-1.8zm-2.5 0h1.9v1.8h-1.9v-1.8zm-2.5 0h1.9v1.8H8.9v-1.8zm-2.5 0h1.9v1.8H6.4v-1.8zm7.5-2.4h1.9v1.8h-1.9V8zm-2.5 0h1.9v1.8h-1.9V8zm-2.5 0h1.9v1.8H8.9V8zm5-2.4h1.9v1.8h-1.9V5.6zm10 6.6c-.3-.2-1.3-.9-2.7-.4-.8-1.5-2.4-2.5-4.2-2.5H1.6C.7 9.3 0 10 0 10.9v2.7C0 18.2 4.1 22 11.2 22c7.5 0 11.8-4.4 12.3-9.5.3-.2.8-.7.8-1.4 0-.4-.2-.8-.4-.9z" />
        </svg>
      )

    case 'Vite':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="#bd34fe"
            d="M21.5 4.3L12.5 21c-.2.4-.8.4-1 0L2.5 4.3c-.3-.5.2-1 .7-.8l8.5 3.6c.2.1.4.1.6 0l8.5-3.6c.5-.2 1 .3.7.8z"
          />
          <path
            fill="#ffea83"
            d="M13.8 2.2l-6 10.6c-.2.3.1.7.5.7h3.3l-1.3 5.4c-.1.5.6.8.9.4l7.1-9.9c.3-.4 0-.8-.4-.8h-3.4l1.2-5.7c.1-.5-.6-.9-.9-.7z"
          />
        </svg>
      )

    default:
      return <Cpu className={className} />
  }
}

/**
 * Authentic, Bespoke Engineering Specifications for EVERY Single Technology.
 * Zero generic placeholders. Apple & Google level engineering depth.
 */
const ENGINEERING_SPECS = {
  HTML: {
    tenure: '5+ Yrs',
    role: 'Semantic Structure & Accessibility',
    roleSo: 'Qaab-dhismeedka Semantik-ka & WCAG',
    desc: 'Semantic HTML5 architecture, ARIA accessibility patterns, clean DOM hierarchies, and SEO-first document trees.',
    descSo: 'Qaab-dhismeed nadiif ah oo HTML5 ah, ARIA roles u hoggaansan heerarka caalamiga ah ee WCAG iyo SEO.',
    capabilities: ['Semantic-DOM', 'ARIA-Access', 'SEO-Tree'],
  },
  HTML5: {
    tenure: '5+ Yrs',
    role: 'Semantic Structure & Accessibility',
    roleSo: 'Qaab-dhismeedka Semantik-ka & WCAG',
    desc: 'Semantic HTML5 architecture, ARIA accessibility patterns, clean DOM hierarchies, and SEO-first document trees.',
    descSo: 'Qaab-dhismeed nadiif ah oo HTML5 ah, ARIA roles u hoggaansan heerarka caalamiga ah ee WCAG iyo SEO.',
    capabilities: ['Semantic-DOM', 'ARIA-Access', 'SEO-Tree'],
  },
  CSS: {
    tenure: '5+ Yrs',
    role: 'Modern Layouts & Keyframes',
    roleSo: 'Habaynta Casriga ah & Dhaqdhaqaaqa',
    desc: 'Fluid CSS Grid, Flexbox, custom property tokens, container queries, and GPU-accelerated micro-animations.',
    descSo: 'CSS Grid iyo Flexbox casri ah, design tokens midaysan, iyo transitions ku socda GPU xawaare sare leh.',
    capabilities: ['Grid-Flex', 'Keyframes', 'Clamp-Math'],
  },
  CSS3: {
    tenure: '5+ Yrs',
    role: 'Modern Layouts & Keyframes',
    roleSo: 'Habaynta Casriga ah & Dhaqdhaqaaqa',
    desc: 'Fluid CSS Grid, Flexbox, custom property tokens, container queries, and GPU-accelerated micro-animations.',
    descSo: 'CSS Grid iyo Flexbox casri ah, design tokens midaysan, iyo transitions ku socda GPU xawaare sare leh.',
    capabilities: ['Grid-Flex', 'Keyframes', 'Clamp-Math'],
  },
  JavaScript: {
    tenure: '5+ Yrs',
    role: 'Modern ESNext & Event Loop',
    roleSo: 'Matoorka Browser-ka & Asynchronous JS',
    desc: 'Deep mastery of the V8 event loop, lexical closures, Promise concurrency, and optimized DOM reconciliation.',
    descSo: 'Faham qoto-dheer oo ku saabsan event loop, closures, concurrency-ga Promises, iyo xawaaraha DOM.',
    capabilities: ['ESNext', 'EventLoop', 'AsyncAwait'],
  },
  React: {
    tenure: '5+ Yrs',
    role: 'Declarative UI & Concurrent 18',
    roleSo: 'Dhisidda Interfaces Casri ah',
    desc: 'Component architectures with memoization, custom reactive hooks, optimistic mutations, and minimal re-renders.',
    descSo: 'Qaab-dhismeed modular ah oo React 18 ah, hooks gaar ah, xaalad degdeg ah, iyo re-renders la yareeyay.',
    capabilities: ['Hooks-API', 'Concurrent18', 'Memo-Trees'],
  },
  TypeScript: {
    tenure: '4+ Yrs',
    role: 'Zero-Runtime Type Contracts',
    roleSo: 'Amniga Noocyada Koodhka',
    desc: 'Strict compiler configurations, generic interfaces, utility types, and runtime-safe schema validation contracts.',
    descSo: 'Compiler strict mode ah, interfaces ballaaran, generics, iyo koodh eber cilladaha runtime-ka ah leh.',
    capabilities: ['Strict-Mode', 'Generics', 'Utility-Types'],
  },
  'Tailwind CSS': {
    tenure: '4+ Yrs',
    role: 'Design Tokens & Utility Architecture',
    roleSo: 'Nidaamka Midaysan ee Naqshadda',
    desc: 'Atomic utility styling with zero runtime bundle bloat, systematic design tokens, and fluid layout breakpoints.',
    descSo: 'Naqshad xawaare sare leh oo eber culays ku ah browser-ka, tokens gaar ah, iyo responsive habaysan.',
    capabilities: ['JIT-Compiler', 'CustomTokens', 'ZeroRuntime'],
  },
  Vite: {
    tenure: '3+ Yrs',
    role: 'Instant HMR & Rollup Bundler',
    roleSo: 'Qalabka Dhisidda ee Xawaaraha leh',
    desc: 'Sub-second dev server hot module reloading, tree-shaken Rollup bundles, and native ES module optimizations.',
    descSo: 'Hot Module Replacement ka yar ilbiriqsi, Rollup tree-shaking oo tirtira koodhka aan la rabin, iyo ESM.',
    capabilities: ['InstantHMR', 'RollupBundler', 'TreeShaking'],
  },
  Python: {
    tenure: '5+ Yrs',
    role: 'High-Throughput Backend Core',
    roleSo: 'Nidaamyada Backend-ka ee Adag',
    desc: 'Enterprise asynchronous backend systems, clean OOP & functional patterns, and multi-process concurrency.',
    descSo: 'Nidaamyada server-ka ee async ah, koodh nadiif ah, processing algorithms xawaare leh, iyo concurrency.',
    capabilities: ['AsyncIO', 'TypeHints', 'CleanArch'],
  },
  FastAPI: {
    tenure: '4+ Yrs',
    role: 'Sub-50ms REST API Engine',
    roleSo: 'Matoorka API-yada ee Degdegga ah',
    desc: 'High-velocity RESTful microservices, automated Pydantic v2 validation, OpenAPI contracts, and async pooling.',
    descSo: 'Gateway API ah oo ka hooseeya 50ms, hubinta Pydantic v2, dukumiintiyada tooska ah, iyo connection pooling.',
    capabilities: ['Pydantic-v2', 'OpenAPI', 'Sub50ms'],
  },
  'Node.js': {
    tenure: '4+ Yrs',
    role: 'Event-Driven Server Runtime',
    roleSo: 'Server Runtime-ka Concurrency-ga',
    desc: 'Non-blocking asynchronous I/O microservices, stream processing, middleware pipelines, and background workers.',
    descSo: 'Microservices xawaare leh oo ku shaqeeya event-driven I/O, maamulka streams-ka, iyo hawlaha asalka ah.',
    capabilities: ['V8-Engine', 'EventDriven', 'Streams'],
  },
  Express: {
    tenure: '4+ Yrs',
    role: 'Minimalist HTTP Server Routing',
    roleSo: 'Dhuumaha HTTP ee Fudud',
    desc: 'Modular middleware chains, secure route handlers, centralized error recovery, and JWT token protection.',
    descSo: 'Dhuumo middleware oo adag, routing la hubiyay, error handling midaysan, iyo amniga headers-ka.',
    capabilities: ['Middleware', 'REST-Spec', 'JWT-Guard'],
  },
  PostgreSQL: {
    tenure: '4+ Yrs',
    role: 'Relational ACID Data Store',
    roleSo: 'Kaydka Xogta ee ACID & Amniga',
    desc: 'High-volume schemas, optimized B-Tree and GIN indexes, CTE transactions, and strict parameterized ORMs.',
    descSo: 'Database relational ah oo leh indexing qotodheer (B-Tree/GIN), CTEs adag, iyo amniga parameterized queries.',
    capabilities: ['B-Tree-Index', 'ACID-Rules', 'RLS-Security'],
  },
  Supabase: {
    tenure: '3+ Yrs',
    role: 'Managed BaaS & Realtime Auth',
    roleSo: 'Xogta Tooska ah & Xaqiijinta',
    desc: 'Managed PostgreSQL architecture with Row-Level Security policies, edge functions, and realtime subscription streams.',
    descSo: 'PostgreSQL cloud ah oo leh RLS policies adag, streaming toos ah ee isbeddellada xogta, iyo amniga tokens.',
    capabilities: ['PostgresEdge', 'RLS-Policies', 'RealtimeSync'],
  },
  MySQL: {
    tenure: '4+ Yrs',
    role: 'Transactional Schema Storage',
    roleSo: 'Kaydka Xogta ee Shirkadaha',
    desc: 'Production relational schemas, optimized multi-table joins, query profiling, and automated replication setups.',
    descSo: 'Nidaamyada wax-soo-saarka ee MySQL, optimizes queries, xiriirrada adag ee miisaska, iyo schema migrations.',
    capabilities: ['InnoDB', 'QueryOptimize', 'Replication'],
  },
  MongoDB: {
    tenure: '3+ Yrs',
    role: 'Document-Oriented Schema Storage',
    roleSo: 'Kaydka Document-ka ee NoSQL',
    desc: 'Dynamic JSON document structures, high-performance aggregation pipelines, and compound index querying.',
    descSo: 'Kaydinta xogta NoSQL, aggregation pipelines qoto dheer, iyo indexing degdeg ah oo loogu talagalay JSON adag.',
    capabilities: ['Aggregation', 'NoSQL-Schema', 'ReplicaSets'],
  },
  SQLite: {
    tenure: '4+ Yrs',
    role: 'Embedded Zero-Latency Database',
    roleSo: 'Database-ka Tooska ah ee Zero-Latency',
    desc: 'Serverless in-process database with zero networking latency, WAL concurrency mode, and local edge persistence.',
    descSo: 'Matoor database ah oo toos ugu dhex jira app-ka, eber habeyn u baahan, kuna habboon kaydka offline-ka.',
    capabilities: ['ZeroConfig', 'EmbeddedEngine', 'WAL-Mode'],
  },
  Swift: {
    tenure: '3+ Yrs',
    role: 'Native Apple iOS Engineering',
    roleSo: 'Horumarinta Nidaamka iOS ee Apple',
    desc: 'Native iOS engineering with SwiftUI and UIKit, ARC memory management, and CoreData local persistence.',
    descSo: 'Apps dhab ah oo iOS ah oo ku dhisan SwiftUI, maaraynta xusuusta (ARC), iyo kaydka CoreData.',
    capabilities: ['SwiftUI', 'ARC-Memory', 'iOS-Native'],
  },
  Kotlin: {
    tenure: '3+ Yrs',
    role: 'Android Platform Engineering',
    roleSo: 'Injineernimada Platform-ka Android',
    desc: 'Modern Android applications built with Jetpack Compose, asynchronous coroutines, and Room database layers.',
    descSo: 'Codsiyo Android ah oo casri ah oo ku dhisan Jetpack Compose, coroutines async ah, iyo Room architecture.',
    capabilities: ['Compose-UI', 'Coroutines', 'RoomDB'],
  },
  Flutter: {
    tenure: '3+ Yrs',
    role: 'Dart High-FPS Canvas Apps',
    roleSo: 'Codsiyada Mobile-ka ee 60fps ah',
    desc: 'Cross-platform native mobile experiences, custom Impeller canvas rendering, and reactive Bloc state machines.',
    descSo: 'Waayo-aragnimo 60fps ah oo ku socota labada platform, maamulka xaaladda Bloc/Provider, iyo offline-first.',
    capabilities: ['ImpellerCanvas', 'BlocState', '60fpsFluid'],
  },
  Dart: {
    tenure: '3+ Yrs',
    role: 'Strongly-Typed Client Language',
    roleSo: 'Luqadda Client-ka ee Noocyada Adag',
    desc: 'Sound null-safe codebases, Ahead-of-Time compilation to native ARM binary, and reactive stream pipelines.',
    descSo: 'Luqad leh null-safety adag, compilation toos ugu noqota ARM machine code, iyo streams xawaare leh.',
    capabilities: ['NullSafety', 'AOT-Compile', 'AsyncStreams'],
  },
  'React Native': {
    tenure: '3+ Yrs',
    role: 'Cross-Platform Native Apps',
    roleSo: 'App-yada Mobile-ka ee Labada Platform',
    desc: 'Mobile architecture with Hermes JS engine, bridge and JSI integration, native views, and 60fps animations.',
    descSo: 'App-yo iOS iyo Android ah oo isticmaalaya Hermes engine, native bridges la hubiyay, iyo gestures debecsan.',
    capabilities: ['HermesEngine', 'NativeBridge', 'GestureFlow'],
  },
  Docker: {
    tenure: '4+ Yrs',
    role: 'Containerization & Isolation',
    roleSo: 'Nidaamka Container-ka & Gooniyeynta',
    desc: 'Hardened container images with minimal Alpine layers, multi-stage build caching, and Docker Compose networking.',
    descSo: 'Deegaan container ah oo leh sawirro yaryar (Alpine), dhisidda multi-stage, iyo Docker Compose orchestration.',
    capabilities: ['Multi-Stage', 'Alpine-Minimal', 'Compose-Net'],
  },
  Git: {
    tenure: '5+ Yrs',
    role: 'Version Control & Trunk-Based',
    roleSo: 'Maamulka Noocyada & GitOps',
    desc: 'Atomic commit hygiene, interactive rebasing, signed commits, and scalable trunk-based development workflows.',
    descSo: 'Taariikh koodh oo nadiif ah, rebase workflows xirfadeed, iyo hababka casriga ah ee trunk-based development.',
    capabilities: ['TrunkBased', 'RebaseFlow', 'SignedCommits'],
  },
  GitHub: {
    tenure: '5+ Yrs',
    role: 'CI/CD Pipelines & Security',
    roleSo: 'Dhuumaha CI/CD & Amniga',
    desc: 'Automated GitHub Actions workflows, branch protection rules, secret scanning, and automated artifact publishing.',
    descSo: 'Dhuumaha GitHub Actions oo otomaatig ah, ilaalinta branch-yada, hubinta amniga, iyo deploy la xaqiijiyay.',
    capabilities: ['ActionsCI', 'BranchGuard', 'SecretMask'],
  },
}

function SkillEngineeringCard({ skill }) {
  const { lang } = useLanguage()
  const spec = ENGINEERING_SPECS[skill.name] || {
    tenure: '3+ Yrs',
    role: skill.type || 'Production Component',
    roleSo: 'Qayb Ka Tirsan Nidaamka',
    desc: 'Production-tested engineering component deployed with reliability and security.',
    descSo: 'Qalab wax-soo-saar oo loo dhisay adkeysi iyo xasilooni buuxda.',
    capabilities: ['Production', 'Resilient', 'Documented'],
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38BDF8]/60 hover:bg-[#111A30] hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]">
      <div>
        {/* Top Header: Brand Icon + Experience Pill */}
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06080E] border border-[#1E2C4A] p-2 transition-all duration-300 group-hover:scale-105 group-hover:border-[#38BDF8]/50 shadow-inner">
            <BrandIcon name={skill.name} className="h-6 w-6" />
          </span>

          <span className="font-mono text-[10px] font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded-full">
            {spec.tenure}
          </span>
        </div>

        {/* Title & Production Role */}
        <h3 className="mt-3.5 font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
          {skill.name}
        </h3>

        <p className="mt-1 text-[11px] font-mono text-[#38BDF8]/90 font-medium leading-snug">
          {lang === 'so' ? spec.roleSo : spec.role}
        </p>

        {/* Bespoke, Meaningful Description */}
        <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors">
          {lang === 'so' ? spec.descSo : spec.desc}
        </p>
      </div>

      {/* Engineering Capabilities Tags */}
      <div className="mt-4 pt-3 border-t border-[#1E2C4A]/70">
        <div className="flex flex-wrap gap-1.5">
          {spec.capabilities.map((cap) => (
            <span
              key={cap}
              className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-[#06080E] border border-[#1E2C4A] text-[#CBD5E1] group-hover:border-[#38BDF8]/40 group-hover:text-white transition-colors"
            >
              #{cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillsContent() {
  const { lang } = useLanguage()
  const { data } = useSiteData()
  const categories = data?.skills?.categories || []
  const skills = data?.skills?.skills || []
  const [active, setActive] = useState('all')
  const [search, setSearch] = useState('')

  const grouped = categories
    .map((cat) => ({
      ...cat,
      items: skills.filter((s) => s.category_id === cat.id),
    }))
    .filter((c) => c.items.length > 0)

  // Filter by category and search
  const visible = grouped
    .filter((cat) => active === 'all' || cat.id === active)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          (s.note && s.note.toLowerCase().includes(search.toLowerCase())) ||
          (ENGINEERING_SPECS[s.name] &&
            ENGINEERING_SPECS[s.name].role.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((c) => c.items.length > 0)

  // 5 Engineering Pillars Data
  const pillars = [
    {
      id: 'devops',
      icon: Cloud,
      title: lang === 'so' ? 'Cloud, DevOps & Kaabayaasha' : 'Cloud, DevOps & Infra',
      badge: 'Zero-Downtime',
      desc:
        lang === 'so'
          ? 'Dhuumaha CI/CD oo otomaatig ah, containerization (Docker), Nginx reverse proxies, iyo maamulka server-yada Linux ee ammaan ah.'
          : 'Automated CI/CD pipelines, Docker containerization, hardened Linux production environments, and Nginx reverse proxy routing.',
      tools: ['Docker', 'GitHub Actions', 'Linux / Bash', 'Nginx', 'GitOps'],
    },
    {
      id: 'backend',
      icon: Server,
      title: lang === 'so' ? 'Backend & API-yada Concurrency-ga Sare' : 'High-Throughput Backend',
      badge: '< 50ms P99',
      desc:
        lang === 'so'
          ? 'Matoorrada API-yada xawaaraha sare leh ee Python (FastAPI / Flask) iyo Node.js, oo leh async I/O, xaqiijin adag (JWT), iyo rate limiting.'
          : 'High-throughput async Python (FastAPI/Flask) and Node.js engines with sub-50ms latency, strict Pydantic validation, and token authentication.',
      tools: ['FastAPI', 'Python', 'Node.js', 'REST / WebSockets', 'SQLAlchemy'],
    },
    {
      id: 'frontend',
      icon: Layers,
      title: lang === 'so' ? 'Frontend & Interfaces Casri ah' : 'Modern Frontend Systems',
      badge: 'Strict Types',
      desc:
        lang === 'so'
          ? 'Codsiyo React & TypeScript ah oo leh nidaam xaaladeed adag, load time ka yar 1 ilbiriqsi, iyo design system responsive ah oo Vanilla/Tailwind ku dhisan.'
          : 'Enterprise-grade React and TypeScript applications built with instant Vite tooling, strict compile-time types, and micro-interactions.',
      tools: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js'],
    },
    {
      id: 'database',
      icon: Database,
      title: lang === 'so' ? 'Xogta & Kaydka ACID ee Adag' : 'Databases & Persistence',
      badge: 'ACID Integrity',
      desc:
        lang === 'so'
          ? 'Nidaamyada PostgreSQL iyo Supabase oo leh indexing qotodheer, Row-Level Security (RLS), iyo Redis caching xawaare sare leh.'
          : 'ACID-compliant PostgreSQL and Supabase schemas with optimized B-Tree indexing, Row-Level Security policies, and in-memory Redis caching.',
      tools: ['PostgreSQL', 'Supabase', 'Redis', 'MySQL', 'Parameterized ORM'],
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: lang === 'so' ? 'Mobile & Multi-Platform Apps' : 'Cross-Platform Mobile',
      badge: 'Offline-First',
      desc:
        lang === 'so'
          ? 'Codsiyo mobile ah oo Flutter iyo React Native ku dhisan, oo leh animations 60fps ah, keyd offline ah, iyo integration API buuxda.'
          : 'Production-ready cross-platform mobile engineering across iOS and Android with offline-first synchronization and native device bridges.',
      tools: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'],
    },
  ]

  // Architectural Decision Standards
  const standards = [
    {
      title: lang === 'so' ? 'Adkeysiga Ka Horreeya Fududaanta' : 'Resilience Over Convenience',
      desc:
        lang === 'so'
          ? 'Qoraalka TypeScript oo adag (strict mode), SQLAlchemy parameterized queries, iyo RLS policies si loo baabi’iyo godadka amniga eber.'
          : 'Strict TypeScript contracts, parameterized queries, and Row-Level Security eliminate entire classes of production exploits at compile time.',
    },
    {
      title: lang === 'so' ? 'Otomaatig Ka Horreeya Gacanta' : 'Automation Over Manual Steps',
      desc:
        lang === 'so'
          ? 'Koodh kasta oo la riixo wuxuu maraa hubinta linter-ka, unit tests, iyo deploy otomaatig ah oo eber downtime ah.'
          : 'Every commit runs through automated linting, security scanning, test verification, and atomic artifact builds with zero manual intervention.',
    },
    {
      title: lang === 'so' ? 'Xogta Dhabta ah & Monitoring' : 'Telemetry & Measurable SLAs',
      desc:
        lang === 'so'
          ? 'Nidaam kasta waxaa lagu xiraa cabbiraadda latency-ga, error logs xog-ogaal ah, iyo health checks si ciladaha looga hortago intaysan dhicin.'
          : 'Comprehensive latency monitoring, distributed request tracing, and structured error telemetry ensure 99.9% uptime commitments.',
    },
  ]

  return (
    <>
      {/* ── SECTION 1: HERO — Centered & Fully Responsive ── */}
      <section className="relative min-h-[540px] sm:min-h-[600px] pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-[#1E2C4A] overflow-hidden bg-[#06080E]">
        <img
          src="/images/skills-hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Subtle dark scrim for text contrast only */}
        <div className="pointer-events-none absolute inset-0 bg-[#06080E]/60 backdrop-blur-[1px]" />

        <div className="container-page relative z-10 text-center mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            {/* Main Headline */}
            <h1 className="font-display text-[2rem] sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white capitalize">
              {lang === 'so'
                ? 'Qalab Casri ah — Xirfad & Khibrad Injineernimo.'
                : 'Engineered with modern tools — Proven in Real Production.'}
            </h1>

            {/* Subtext */}
            <p className="mt-4 mx-auto max-w-2xl text-[14px] sm:text-[16px] text-[#CBD5E1] leading-relaxed">
              {lang === 'so'
                ? 'Qalab kasta wuxuu ku qotomaa sanado khibrad dhab ah ah, amniga koodhka, xawaaraha API-yada, iyo dhuumaha deploy-ga ee eber-cillada ah.'
                : 'Every technology in this stack is backed by verified production deployments, high-concurrency architecture, and resilient uptime delivery.'}
            </p>

            {/* CTA Buttons — Strictly Side-by-Side (______  ______) Matching Home */}
            <div className="mt-8 flex flex-row items-center justify-center gap-3 w-auto flex-nowrap">
              <Link
                to="/support"
                className="btn-lime text-center whitespace-nowrap"
              >
                <span>{lang === 'so' ? 'Shaqo Ii Sii' : 'Hire Me'}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="btn-outline text-center whitespace-nowrap"
              >
                <span>{lang === 'so' ? 'Eeg Adeegyada' : 'View Services'}</span>
              </Link>
            </div>

            {/* Engineering Metrics */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-6 pt-6 border-t border-[#1E2C4A]/80">
              <div className="flex flex-col items-center px-1">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap">
                  5+ {lang === 'so' ? 'Sano' : 'Years'}
                </span>
                <span className="font-mono text-[10px] text-[#38BDF8] uppercase mt-1 text-center leading-tight">
                  {lang === 'so' ? 'Khibrad Dhab ah' : 'Production Exp.'}
                </span>
              </div>

              <div className="flex flex-col items-center px-1">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-[#38BDF8] tracking-tight whitespace-nowrap">
                  18+ {lang === 'so' ? 'Qalab' : 'Techs'}
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8] uppercase mt-1 text-center leading-tight">
                  {lang === 'so' ? 'Stack la Hubiyay' : 'Verified Stack'}
                </span>
              </div>

              <div className="flex flex-col items-center px-1">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap">
                  Full-Stack
                </span>
                <span className="font-mono text-[10px] text-[#38BDF8] uppercase mt-1 text-center leading-tight">
                  Web · Mobile · Cloud
                </span>
              </div>

              <div className="flex flex-col items-center px-1">
                <span className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap">
                  CI/CD
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8] uppercase mt-1 text-center leading-tight">
                  {lang === 'so' ? 'Eber Joogsi' : 'Zero Downtime'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 2: 5 CORE ENGINEERING PILLARS ── */}
      <section className="section-pad bg-[#06080E] border-b border-[#1E2C4A]" aria-label="Core Engineering Pillars">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {lang === 'so' ? '5-ta Tiir ee Injineernimada Platform-ka' : '5 Pillars of Platform Engineering'}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
                {lang === 'so'
                  ? 'Sida xirfaduhu isugu xirmaan si loo dhiso hab-dhisyo deggan, ammaan ah, oo miisaan weyn u adkaysta.'
                  : 'How cross-discipline engineering capabilities combine to deliver resilient, production-grade applications.'}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, idx) => {
              const IconComponent = p.icon
              return (
                <Reveal key={p.id} delay={idx * 60}>
                  <div className="group relative flex h-full flex-col justify-between rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38BDF8]/60 hover:bg-[#111A30] hover:shadow-[0_0_24px_rgba(56,189,248,0.2)]">
                    <div>
                      {/* Icon + Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06080E] border border-[#1E2C4A] text-[#38BDF8] group-hover:border-[#38BDF8]/60 group-hover:bg-[#0284C7] group-hover:text-white transition-all duration-300">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                          {p.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                        {p.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors">
                        {p.desc}
                      </p>
                    </div>

                    {/* Stack Tools Pill Row */}
                    <div className="mt-6 pt-4 border-t border-[#1E2C4A]/80 flex flex-wrap gap-1.5">
                      {p.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06080E] border border-[#1E2C4A] text-[#94A3B8] group-hover:border-[#38BDF8]/40 group-hover:text-white transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PRODUCTION TECH MATRIX (Categorized, Filterable, Searchable) ── */}
      <section className="section-pad bg-[#06080E]" aria-label="Production Tech Matrix">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-8 border-b border-[#1E2C4A]">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActive('all')}
                  className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all duration-200 ${
                    active === 'all'
                      ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30 border border-[#38BDF8]/50'
                      : 'border border-[#1E2C4A] bg-[#0D1424] text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-white'
                  }`}
                >
                  {lang === 'so' ? 'Dhammaan Qalabka' : 'All Technologies'}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(c.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all duration-200 ${
                      active === c.id
                        ? 'bg-[#0284C7] text-white shadow-md shadow-[#0284C7]/30 border border-[#38BDF8]/50'
                        : 'border border-[#1E2C4A] bg-[#0D1424] text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Search Bar with Icon */}
              <div className="relative w-full md:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder={lang === 'so' ? 'Raadi tignoolajiyada...' : 'Filter by technology...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[#1E2C4A] bg-[#0D1424] py-2 pl-9 pr-4 text-xs text-white placeholder-[#94A3B8] focus:border-[#38BDF8] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]/40 transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* Technology Cards Grid */}
          <div className="mt-10 space-y-14">
            {visible.map((cat) => (
              <div key={cat.id} className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#1E2C4A]/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                    <h2 className="font-display text-lg font-bold text-white tracking-tight">
                      {cat.name}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#94A3B8]">
                    {cat.items.length} {lang === 'so' ? 'Qalab la Hubiyay' : 'Verified Stack Components'}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {cat.items.map((skill) => (
                    <SkillEngineeringCard key={skill.id || skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            ))}

            {visible.length === 0 && (
              <div className="py-20 text-center text-[#94A3B8]">
                <TerminalIcon className="mx-auto h-8 w-8 text-[#1E2C4A] mb-3" />
                <p className="text-sm">
                  {lang === 'so'
                    ? `Wax xirfad ah lagama helin magaca "${search}".`
                    : `No technology found matching "${search}".`}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ARCHITECTURAL DECISION FRAMEWORK ── */}
      <section className="section-pad bg-[#06080E] border-t border-[#1E2C4A]" aria-label="Architecture Framework">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {lang === 'so' ? 'Sida aan u Doorto Qalabka Mashruuc Kasta' : 'How I Evaluate & Select Technology'}
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
                {lang === 'so'
                  ? 'Qalabka ma dooranno sababtoo ah waa cusub yahay kaliya; waxaan ku xulannaa adkeysiga, xawaaraha, iyo dhib-yaraanta dayactirka mustaqbalka.'
                  : 'Every framework decision is evaluated against production stability, maintenance overhead, and long-term business velocity.'}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {standards.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 70}>
                <div className="group rounded-xl border border-[#1E2C4A] bg-[#0D1424] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#38BDF8]">0{idx + 1}</span>
                    <CheckCircle2 className="h-4 w-4 text-[#38BDF8]/80 group-hover:text-[#38BDF8] transition-colors" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#94A3B8]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Architecture Consultation Banner */}
          <Reveal delay={200}>
            <div className="mt-14 rounded-2xl border border-[#1E2C4A] bg-[#0D1424] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                  {lang === 'so' ? 'La-talinta Qaab-dhismeedka' : 'Architectural Evaluation'}
                </span>
                <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                  {lang === 'so'
                    ? 'Ma u baahan tahay qiimayn koodh ama migration casri ah?'
                    : 'Need an architecture review or legacy migration plan?'}
                </h3>
                <p className="mt-1.5 text-xs text-[#94A3B8] max-w-xl leading-relaxed">
                  {lang === 'so'
                    ? 'Waxaan si degdeg ah u fahmaa koodhka jira, anigoo bixinaya qorshe cad oo la hubo ka hor inta aan la beddelin database-ka ama la casriyayn framework-yada.'
                    : 'I quickly integrate into existing codebases, diagnosing performance bottlenecks and architecting clean, zero-regression modernization roadmaps.'}
                </p>
              </div>

              <a
                href="/support"
                className="btn-lime text-center whitespace-nowrap self-start md:self-center shrink-0"
              >
                <span>{lang === 'so' ? 'Ka Wadahadal Nidaamkaaga' : 'Discuss Your Stack'}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 5: CTA (Connected with New High-Performance Server Corridor Background) ── */}
      <CollaborateCTA
        mainHeading={
          lang === 'so'
            ? 'Aan ku dhisno nidaamkaaga xawaare & xasilooni buuxda.'
            : 'Bring modern speed & resilient infrastructure.'
        }
        body={
          lang === 'so'
            ? 'Laga bilaabo dhuumaha CI/CD ilaa APIs-ka xawaaraha sare leh ee FastAPI iyo React, waxaan kaa caawinayaa inaad soo saarto barnaamijyo deggan oo u adkaysta culayska dhabta ah.'
            : 'From automated CI/CD pipelines to high-throughput React and FastAPI architectures, I help engineering teams ship stable, scalable software.'
        }
        bgImage="/images/cta-skills-bg.jpg"
        primaryBtnText={lang === 'so' ? 'Bilow Hadda' : 'Get Started'}
        primaryBtnTo="/support"
        secondaryBtnText={lang === 'so' ? 'Mashaariicda' : 'Projects'}
        secondaryBtnTo="/projects"
      />
    </>
  )
}

export default function Skills() {
  const { lang } = useLanguage()

  return (
    <SiteDataProvider>
      <PageLayout
        title={lang === 'so' ? 'Xirfadaha & Kaabayaasha' : 'Skills & Platform Engineering'}
        description={
          lang === 'so'
            ? 'Xirfadaha Injineernimada: DevOps, Docker, Python FastAPI, PostgreSQL, React, TypeScript, Flutter, iyo Cloud Architecture.'
            : 'Technical platform engineering capabilities: DevOps, Docker, Python FastAPI, PostgreSQL, React, TypeScript, Flutter, and Cloud Architecture.'
        }
      >
        <SkillsContent />
      </PageLayout>
    </SiteDataProvider>
  )
}
