import CollectionManager from '../../../components/admin/CollectionManager'

const cardFields = [
  { name: 'icon', label: 'Icon name', type: 'text', help: 'lucide-react icon name, e.g. Globe, Smartphone, Server' },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
]

const statFields = [
  { name: 'label', label: 'Label', type: 'text', required: true },
  { name: 'value', label: 'Value', type: 'text', required: true },
]

export default function AboutPanel() {
  return (
    <div className="space-y-12">
      <CollectionManager
        title="About info cards"
        description="The small feature cards next to your biography. Edit the biography itself under Profile."
        endpoint="/admin/about-cards"
        emptyItem={{ icon: 'Sparkles', title: '', description: '', is_published: true }}
        fields={cardFields}
        renderRow={(c) => (
          <div>
            <p className="font-medium text-white">{c.title}</p>
            <p className="truncate text-xs text-slate-400">{c.description}</p>
          </div>
        )}
      />
      <CollectionManager
        title="About stats"
        description="Honest stats shown under your biography."
        endpoint="/admin/about-stats"
        emptyItem={{ label: '', value: '', is_published: true }}
        fields={statFields}
        renderRow={(s) => (
          <div>
            <p className="font-medium text-white">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        )}
      />
    </div>
  )
}
