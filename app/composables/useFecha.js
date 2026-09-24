export function formatFecha(iso) {
  if (!iso) return ''
  // a mediodía: el back manda la fecha a medianoche UTC y acá se leía un día antes
  const d = new Date(String(iso).substring(0, 10) + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatShortDate(iso) {
  if (!iso) return ''
  const d = new Date(iso.substring(0, 10) + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }).replace('.', '')
}

export function formatDayMonth(iso) {
  if (!iso) return ''
  const d = new Date(iso.substring(0, 10) + 'T12:00:00')
  const day = d.toLocaleDateString('es-AR', { day: 'numeric' })
  const month = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')
  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`
}

export function useImageUrl() {
  const { public: { imagesUrl } } = useRuntimeConfig()

  function imgSrc(img, fallback = null) {
    const src = img || fallback
    if (!src) return ''
    if (src.startsWith('http') || src.startsWith('/')) return src
    return `${imagesUrl}${src}`
  }

  return { imgSrc }
}
