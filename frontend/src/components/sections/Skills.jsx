import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Reveal from '../common/Reveal'
import Icon from '../common/Icon'

export default function Skills() {
  const { data } = useSiteData()
  const [activeCat, setActiveCat] = useState('all')

  const grouped = useMemo(() => {
    const categories = data?.skills?.categories || []
    const skills = data?.skills?.skills || []
    const byCat = new Map(categories.map((c) => [c.id, { ...c, items: [] }]))
    skills.forEach((s) => {
      if (byCat.has(s.category_id)) byCat.get(s.category_id).items.push(s)
    })
    return [...byCat.values()].filter((c) => c.items.length > 0)
  }, [data])

  const visible = activeCat === 'all' ? grouped : grouped.filter((c) => c.id === activeCat)

  return (
    <section id="skills" className="section-pad bg-[#0e0e0e] border-t border-[#1e261d]">
      <div className="container-page">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow-lime">Stack Overview</p>
              <h2 className="mt-2 section-heading">Technologies &amp; Tools</h2>
            </div>
            <Link
              to="/skills"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d2d7dc] hover:text-[#52fe7d] transition shrink-0"
            >
              <span>Full skills list</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap gap-2">
            <FilterBtn active={activeCat === 'all'} onClick={() => setActiveCat('all')}>All</FilterBtn>
            {grouped.map((c) => (
              <FilterBtn key={c.id} active={activeCat === c.id} onClick={() => setActiveCat(c.id)}>
                {c.name}
              </FilterBtn>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 space-y-10">
          {visible.map((cat) => (
            <div key={cat.id}>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-0.5 w-6 rounded-full bg-[#39A751]" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#8a949e]">{cat.name}</h3>
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {cat.items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 35}>
                    <div className="group flex items-center gap-3 rounded-xl border border-[#1e261d] bg-[#141714] px-4 py-3 transition hover:border-[#39A751]/40 hover:bg-[#161d15]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e2b1a] text-[#52fe7d] transition group-hover:bg-[#39A751] group-hover:text-white">
                        <Icon name={s.icon} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white group-hover:text-[#52fe7d] transition-colors">{s.name}</p>
                        {s.note && <p className="truncate text-xs text-[#8a949e]">{s.note}</p>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FilterBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
        active
          ? 'bg-[#39A751] text-white shadow-md shadow-[#39A751]/20'
          : 'border border-[#1e261d] bg-[#141714] text-[#d2d7dc] hover:border-[#39A751]/40 hover:text-white'
      }`}
    >
      {children}
    </button>
  )
}
