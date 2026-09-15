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

  // cierra la sesión de staff y también el "ver como" que hubiera abierto
  function logoutStaff() {
    return apiFetch('/staff/auth/logout', { method: 'POST' })
  }

  // search: nombre, email, número de oportunidad o programa; vacío trae los que viajan más pronto
  function listClients(search) {
    return apiFetch('/staff/clientes', { query: { q: search } })
  }

  // client: id del cliente (desde el listado), email o número de oportunidad
  function viewAs(client) {
    return apiFetch('/staff/ver-como', { method: 'POST', body: { busqueda: client } })
  }

  return { requestMagicLink, verify, logout, requestStaffLink, verifyStaff, getStaffSession, logoutStaff, listClients, viewAs }
}
