export function useAuth() {
  function requestMagicLink(email) {
    return apiFetch('/auth/magic-link', { method: 'POST', body: { email } })
  }

  function verify(token) {
    return apiFetch('/auth/verify', { query: { token } })
  }

  function logout() {
    return apiFetch('/auth/logout', { method: 'POST' })
  }

  function requestStaffLink(email) {
    return apiFetch('/staff/auth/magic-link', { method: 'POST', body: { email } })
  }

  function verifyStaff(token) {
    return apiFetch('/staff/auth/verify', { query: { token } })
  }

  function getStaffSession() {
    return apiFetch('/staff/session')
  }

  // search: email del cliente o número de oportunidad
  function viewAs(search) {
    return apiFetch('/staff/ver-como', { method: 'POST', body: { busqueda: search } })
  }

  return { requestMagicLink, verify, logout, requestStaffLink, verifyStaff, getStaffSession, viewAs }
}
