import { useRef, useState } from 'react'
import { Upload, Trash2, ImageIcon } from 'lucide-react'
import { useAdminApi } from './useAdmin'
import { Spinner } from '../common/ui'

const MAX_MB = 5
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']

export default function ImageUpload({ value, onChange, folder = 'misc', label = 'Image' }) {
  const admin = useAdminApi()
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file) {
    setError('')
    if (!ALLOWED.includes(file.type)) {
      setError('Unsupported file type. Use JPG, PNG, WebP, GIF, or SVG.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File too large (max ${MAX_MB} MB).`)
      return
    }
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await admin.upload(`/admin/uploads?folder=${encodeURIComponent(folder)}`, fd)
      onChange(res.url)
    } catch (e) {
      setError(e.message || 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-300">{label}</span>
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {value ? (
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 text-slate-600" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-ghost !py-2 text-sm"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
          >
            {busy ? <Spinner className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
            {value ? 'Replace' : 'Upload'}
          </button>
          {value && (
            <button type="button" className="btn-ghost !py-2 text-sm text-red-400" onClick={() => onChange('')}>
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED.join(',')}
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  )
}
