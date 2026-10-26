import es from '~/locales/es'
import pt from '~/locales/pt'

const MESSAGES = { es, pt }

export const DATE_LOCALES = { es: 'es-AR', pt: 'pt-BR' }

export function useLocale() {
  const cookie = useCookie('pwa_idioma', { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  const locale = useState('locale', () => (MESSAGES[cookie.value] ? cookie.value : 'es'))

  function setLocale(value) {
    if (!MESSAGES[value]) return
    locale.value = value
    cookie.value = value
  }

  function t(key, params = {}) {
    const value = lookup(MESSAGES[locale.value], key) ?? lookup(es, key) ?? key
    if (typeof value !== 'string') return value
    return value.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? '')
  }

  return { locale, setLocale, t }
}

function lookup(messages, key) {
  return key.split('.').reduce((node, part) => node?.[part], messages)
}
