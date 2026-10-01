import CollectionManager from '../../../components/admin/CollectionManager'

const SIZES = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large (tall)' },
  { value: 'wide', label: 'Wide' },
]
const ACCENTS = ['violet', 'indigo', 'fuchsia', 'sky', 'emerald'].map((c) => ({ value: c, label: c }))

const fields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'icon', label: 'Icon name', type: 'text', help: 'lucide-react icon, e.g. Globe, Smartphone, Layers' },
  { name: 'size', label: 'Card size (bento)', type: 'select', options: SIZES },
  { name: 'accent', label: 'Accent color', type: 'select', options: ACCENTS },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
]

export default function ServicesPanel() {
  return (
    <CollectionManager
      title="Services"
      description="The bento grid of what you offer. Mix card sizes for visual variety."
      endpoint="/admin/services"
      emptyItem={{ title: '', icon: 'Layers', size: 'medium', accent: 'violet', description: '', is_published: true }}
      fields={fields}
      renderRow={(s) => (
        <div>
          <p className="font-medium text-white">{s.title}</p>
          <p className="text-xs text-slate-400">{s.size} · {s.accent}</p>
        </div>
      )}
    />
  )
}
