export function useSession() {
  const name = useState('session:name', () => '')
  // email del staff cuando la sesión es un "ver como"; vacío en la sesión normal del cliente
  const staff = useState('session:staff', () => '')
  const { logout } = useAuth()

  async function loadName() {
    if (name.value) return
    try {
      const usuario = await apiFetch('/auth/session')
      name.value = usuario?.nombre || ''
      staff.value = usuario?.staff || ''
    } catch {
      reset()
    }
  }

  function reset() {
    name.value = ''
    staff.value = ''
  }

  async function signOut() {
    const wasStaff = Boolean(staff.value)
    await logout()
    reset()
    await navigateTo(wasStaff ? '/admin' : '/login')
  }

  return { name, staff, loadName, signOut, reset }
}
