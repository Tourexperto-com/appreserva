export function useSession() {
  const name = useState('session:name', () => '')
  const email = useState('session:email', () => '')
  // email del staff cuando la sesión es un "ver como"; vacío en la sesión normal del cliente
  const staff = useState('session:staff', () => '')
  const { logout } = useAuth()

  function apply(usuario) {
    name.value = usuario?.nombre || ''
    email.value = usuario?.email || ''
    staff.value = usuario?.staff || ''
  }

  async function loadName() {
    if (name.value) return
    try {
      apply(await apiFetch('/auth/session'))
    } catch {
      reset()
    }
  }

  function reset() {
    apply(null)
  }

  async function signOut() {
    const wasStaff = Boolean(staff.value)
    await logout()
    reset()
    await navigateTo(wasStaff ? '/admin' : '/login')
  }

  return { name, email, staff, apply, loadName, signOut, reset }
}
