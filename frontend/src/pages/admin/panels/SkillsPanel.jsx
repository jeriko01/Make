import { useEffect, useState } from 'react'
import CollectionManager from '../../../components/admin/CollectionManager'
import { useAdminApi } from '../../../components/admin/useAdmin'

const TYPES = ['language', 'framework', 'library', 'database', 'tool', 'platform']

const categoryFields = [
  { name: 'name', label: 'Category name', type: 'text', required: true },
]

export default function SkillsPanel() {
  const admin = useAdminApi()
  const [categories, setCategories] = useState([])

  async function loadCats() {
    try {
      setCategories(await admin.get('/admin/skill-categories'))
    } catch {
      setCategories([])
    }
  }
  useEffect(() => {
    loadCats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skillFields = [
    { name: 'name', label: 'Skill name', type: 'text', required: true },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      allowEmpty: true,
      options: categories.map((c) => ({ value: c.id, label: c.name })),
      help: categories.length ? undefined : 'Create a category first, then reload.',
    },
    { name: 'type', label: 'Type', type: 'select', options: TYPES.map((t) => ({ value: t, label: t })) },
    { name: 'icon', label: 'Icon name', type: 'text', help: 'lucide-react icon, e.g. Atom, Database' },
    { name: 'experience_label', label: 'Experience label', type: 'text', help: 'e.g. Comfortable, Familiar, Learning' },
    { name: 'proficiency', label: 'Proficiency (0–100, optional)', type: 'number', min: 0, max: 100 },
  ]

  return (
    <div className="space-y-12">
      <CollectionManager
        title="Skill categories"
        description="Group skills (Frontend Web, Backend, Mobile, …). Reload the page after adding categories to pick them in skills."
        endpoint="/admin/skill-categories"
        emptyItem={{ name: '', is_published: true }}
        fields={categoryFields}
        renderRow={(c) => <p className="font-medium text-white">{c.name}</p>}
      />
      <CollectionManager
        title="Skills"
        description="Individual technologies. Label types accurately (language, framework, database, tool, platform)."
        endpoint="/admin/skills"
        emptyItem={{ name: '', category_id: categories[0]?.id ?? null, type: 'tool', icon: '', experience_label: '', proficiency: null, is_published: true }}
        fields={skillFields}
        renderRow={(s) => (
          <div>
            <p className="font-medium text-white">{s.name}</p>
            <p className="text-xs text-slate-400">
              {s.type}{s.experience_label ? ` · ${s.experience_label}` : ''}
              {categories.find((c) => c.id === s.category_id) ? ` · ${categories.find((c) => c.id === s.category_id).name}` : ''}
            </p>
          </div>
        )}
      />
    </div>
  )
}
