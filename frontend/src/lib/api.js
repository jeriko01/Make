// Thin fetch wrapper around the FastAPI backend.
const BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

// Normalize: callers pass paths like "/public/bootstrap" (without the /api prefix)
// unless VITE_API_BASE_URL already ends in /api. We build "<BASE><path>".
function url(path) {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`
}

async function request(path, { method = 'GET', body, token, headers = {}, isForm = false } = {}) {
  const opts = { method, headers: { ...headers } }
  if (token) opts.headers.Authorization = `Bearer ${token}`
  if (body !== undefined) {
    if (isForm) {
      opts.body = body // FormData; let the browser set the content-type
    } else {
      opts.headers['Content-Type'] = 'application/json'
      opts.body = JSON.stringify(body)
    }
  }
  const res = await fetch(url(path), opts)
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }
  if (!res.ok) {
    const detail =
      (data && (data.detail || data.message)) ||
      (typeof data === 'string' ? data : null) ||
      `Request failed (${res.status})`
    const err = new Error(Array.isArray(detail) ? detail.map((d) => d.msg).join(', ') : detail)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const api = {
  get: (path, token) => request(path, { token }),
  post: (path, body, token) => request(path, { method: 'POST', body, token }),
  put: (path, body, token) => request(path, { method: 'PUT', body, token }),
  patch: (path, body, token) => request(path, { method: 'PATCH', body, token }),
  del: (path, token) => request(path, { method: 'DELETE', token }),
  upload: (path, formData, token) =>
    request(path, { method: 'POST', body: formData, token, isForm: true }),
}
