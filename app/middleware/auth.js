export default defineNuxtRouteMiddleware(async () => {
  const { staff, apply, reset } = useSession()

  try {
    // Refresca la sesión en cada navegación: en un "ver como" otra pestaña puede haber cambiado de cliente
    apply(await apiFetch('/auth/session'))
  } catch (err) {
    const status = err?.response?.status
    if (status === 401 || status === 403) {
      // Si vencía un "ver como", volver al panel de staff y no al login de clientes
      const wasStaff = Boolean(staff.value)
      reset()
      return navigateTo(wasStaff ? '/admin' : '/login')
    }
  }
})
