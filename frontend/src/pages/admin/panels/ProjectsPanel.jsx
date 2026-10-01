import { useEffect, useState } from 'react'
import CollectionManager from '../../../components/admin/CollectionManager'
import { useAdminApi } from '../../../components/admin/useAdmin'

const PLATFORMS = [
  { value: 'web', label: 'Web' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
  { value: 'cross_platform', label: 'Cross-Platform' },
]

const categoryFields = [
  { name: 'name', label: 'Category name', type: 'text', required: true },
  { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'lowercase-with-dashes' },
]

function slugify(s) {
  return (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function ProjectsPanel() {
  const admin = useAdminApi()
  const [categories, setCategories] = useState([])

  async function loadCats() {
    try {
      setCategories(await admin.get('/admin/project-categories'))
    } catch {
      setCategories([])
    }
  }
  useEffect(() => {
    loadCats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const projectFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'lowercase-with-dashes, unique' },
    { name: 'platform', label: 'Platform', type: 'select', options: PLATFORMS },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      allowEmpty: true,
      options: categories.filter((c) => c.slug !== 'all').map((c) => ({ value: c.id, label: c.name })),
    },
    { name: 'summary', label: 'Short summary', type: 'textarea', rows: 2, full: true },
    { name: 'description', label: 'Full description', type: 'textarea', rows: 5, full: true },
    { name: 'cover_image_url', label: 'Cover image', type: 'image', folder: 'projects' },
    { name: 'tech_tags', label: 'Technology tags', type: 'tags', full: true },
    { name: 'metrics', label: 'Metrics (optional, honest)', type: 'keyvalue', full: true },
    { name: 'live_url', label: 'Live URL', type: 'url' },
    { name: 'github_url', label: 'GitHub URL', type: 'url' },
    { name: 'app_store_url', label: 'App Store URL', type: 'url' },
    { name: 'google_play_url', label: 'Google Play URL', type: 'url' },
    { name: 'is_featured', label: 'Featured', type: 'checkbox', checkboxLabel: 'Show a Featured badge' },
  ]

  function validate(v) {
    const e = {}
    if (!v.title?.trim()) e.title = 'Required.'
    if (!v.slug?.trim()) e.slug = 'Required.'
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug)) e.slug = 'Use lowercase letters, numbers, and dashes.'
    return e
  }

  function beforeSave(v) {
    const out = { ...v, slug: slugify(v.slug || v.title) }
    // Drop empty optional URLs so buttons stay hidden rather than broken.
    for (const k of ['live_url', 'github_url', 'app_store_url', 'google_play_url', 'cover_image_url']) {
      if (!out[k]) out[k] = null
    }
    if (!out.metrics || out.metrics.length === 0) out.metrics = null
    else out.metrics = out.metrics.filter((m) => m.label && m.value)
    return out
  }

  return (
    <div className="space-y-12">
      <CollectionManager
        title="Project categories"
        description="Optional filter categories (Web, Mobile, Full-Stack…). Reload after adding to pick them in projects."
        endpoint="/admin/project-categories"
        emptyItem={{ name: '', slug: '', is_published: true }}
        fields={categoryFields}
        beforeSave={(v) => ({ ...v, slug: slugify(v.slug || v.name) })}
        renderRow={(c) => (
          <div>
            <p className="font-medium text-white">{c.name}</p>
            <p className="text-xs text-slate-400">/{c.slug}</p>
          </div>
        )}
      />
      <CollectionManager
        title="Projects"
        description="Empty optional links are hidden on the public site (no broken buttons)."
        endpoint="/admin/projects"
        emptyItem={{ title: '', slug: '', platform: 'web', category_id: null, summary: '', description: '', cover_image_url: null, tech_tags: [], metrics: null, live_url: null, github_url: null, app_store_url: null, google_play_url: null, is_featured: false, is_published: true }}
        fields={projectFields}
        validate={validate}
        beforeSave={beforeSave}
        renderRow={(p) => (
          <div>
            <p className="font-medium text-white">{p.title}</p>
            <p className="text-xs text-slate-400">{p.platform} · /{p.slug}</p>
          </div>
        )}
      />
    </div>
  )
}
