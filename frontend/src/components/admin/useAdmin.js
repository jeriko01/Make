import { useCallback } from 'react'
import { api } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

/** Returns API methods bound to the current admin's access token. */
export function useAdminApi() {
  const { token } = useAuth()
  return {
    get: useCallback((p) => api.get(p, token), [token]),
    post: useCallback((p, b) => api.post(p, b, token), [token]),
    put: useCallback((p, b) => api.put(p, b, token), [token]),
    patch: useCallback((p, b) => api.patch(p, b, token), [token]),
    del: useCallback((p) => api.del(p, token), [token]),
    upload: useCallback((p, fd) => api.upload(p, fd, token), [token]),
  }
}
