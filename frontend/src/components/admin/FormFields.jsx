import { Plus, X } from 'lucide-react'
import { Field, Input, Textarea, Select, Toggle } from './AdminUI'
import ImageUpload from './ImageUpload'

/**
 * Render a set of fields against a `values` object.
 * fields: [{ name, label, type, required, options, folder, help, placeholder, min, max, full }]
 * types: text | textarea | number | url | date | select | checkbox | tags | keyvalue | image
 */
export default function FormFields({ fields, values, setValues, errors = {} }) {
  const set = (name, v) => setValues((prev) => ({ ...prev, [name]: v }))

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const v = values[f.name]
        const common = { id: f.name, required: f.required }
        const wrapCls = f.full || ['textarea', 'tags', 'keyvalue', 'image'].includes(f.type)
          ? 'sm:col-span-2'
          : ''

        let control
        switch (f.type) {
          case 'textarea':
            control = <Textarea {...common} value={v || ''} placeholder={f.placeholder} rows={f.rows || 4}
              onChange={(e) => set(f.name, e.target.value)} />
            break
          case 'number':
            control = <Input {...common} type="number" min={f.min} max={f.max} value={v ?? ''}
              onChange={(e) => set(f.name, e.target.value === '' ? null : Number(e.target.value))} />
            break
          case 'url':
            control = <Input {...common} type="url" placeholder={f.placeholder || 'https://…'} value={v || ''}
              onChange={(e) => set(f.name, e.target.value)} />
            break
          case 'date':
            control = <Input {...common} type="date" value={v || ''} onChange={(e) => set(f.name, e.target.value)} />
            break
          case 'select':
            control = (
              <Select {...common} value={v ?? ''} onChange={(e) => set(f.name, e.target.value || null)}>
                {f.allowEmpty && <option value="">— none —</option>}
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            )
            break
          case 'checkbox':
            control = <Toggle checked={!!v} onChange={(nv) => set(f.name, nv)} label={f.checkboxLabel} />
            break
          case 'tags':
            control = (
              <Input
                {...common}
                value={Array.isArray(v) ? v.join(', ') : v || ''}
                placeholder={f.placeholder || 'Comma, separated, tags'}
                onChange={(e) =>
                  set(f.name, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
                }
              />
            )
            break
          case 'keyvalue':
            control = <KeyValueEditor value={Array.isArray(v) ? v : []} onChange={(nv) => set(f.name, nv)} />
            break
          case 'image':
            control = <ImageUpload value={v || ''} folder={f.folder} label="" onChange={(url) => set(f.name, url)} />
            break
          default:
            control = <Input {...common} value={v || ''} placeholder={f.placeholder}
              onChange={(e) => set(f.name, e.target.value)} />
        }

        return (
          <div key={f.name} className={wrapCls}>
            <Field label={f.type === 'checkbox' ? undefined : f.label} required={f.required} help={f.help} error={errors[f.name]}>
              {control}
            </Field>
          </div>
        )
      })}
    </div>
  )
}

function KeyValueEditor({ value, onChange }) {
  const rows = value.length ? value : []
  const update = (i, key, val) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r))
    onChange(next)
  }
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          <Input placeholder="Label" value={r.label || ''} onChange={(e) => update(i, 'label', e.target.value)} />
          <Input placeholder="Value" value={r.value || ''} onChange={(e) => update(i, 'value', e.target.value)} />
          <button type="button" className="btn-ghost !px-3" onClick={() => onChange(rows.filter((_, idx) => idx !== i))} aria-label="Remove">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button type="button" className="btn-ghost !py-2 text-sm" onClick={() => onChange([...rows, { label: '', value: '' }])}>
        <Plus className="h-4 w-4" /> Add metric
      </button>
    </div>
  )
}
