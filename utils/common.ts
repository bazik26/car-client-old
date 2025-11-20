import { NextRouter } from 'next/router'

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

const normalizeNumericInput = (value: number | string | null | undefined, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const cleaned = value.replace(/\s+/g, '')
    const parsed = Number(cleaned)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const formatPrice = (value: number | string | null | undefined): string => {
  const numeric = normalizeNumericInput(value)
  return new Intl.NumberFormat('ru-RU').format(numeric)
}

export const safeNumber = (value: number | string | null | undefined, fallback = 0): number =>
  normalizeNumericInput(value, fallback)

export const normalizeImages = (value: unknown): string[] => {
  console.log('🖼️ normalizeImages called with:', typeof value, value)
  
  if (Array.isArray(value)) {
    const filtered = value.filter((src): src is string => typeof src === 'string' && src.trim().length > 0)
    console.log('✅ normalizeImages returning array:', filtered.length, 'images')
    return filtered
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed || trimmed === '[]' || trimmed.toLowerCase() === 'null') {
      console.log('⚠️ normalizeImages: empty or null string')
      return []
    }

    try {
      const parsed = JSON.parse(trimmed)
      console.log('📦 normalizeImages parsed JSON:', Array.isArray(parsed) ? `${parsed.length} items` : typeof parsed)
      if (Array.isArray(parsed)) {
        const filtered = parsed.filter((src): src is string => typeof src === 'string' && src.trim().length > 0)
        console.log('✅ normalizeImages returning parsed array:', filtered.length, 'images', filtered[0])
        return filtered
      }
    } catch (error) {
      console.error('❌ Error parsing images value:', error, 'Value:', trimmed.substring(0, 100))
    }
  }

  console.log('⚠️ normalizeImages: returning empty array')
  return []
}

export const createSelectOption = (value: string | number) => ({
  value,
  label: value,
})

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const getQueryParamOnFirstRender = (
  queryName: string,
  router: NextRouter
) =>
  router.query[queryName] ||
  router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))

export const toggleClassNamesForOverlayAndBody = (
  overlayClassName = 'open'
) => {
  document.querySelector('.overlay')?.classList.toggle(overlayClassName)
  document.querySelector('.body')?.classList.toggle('overflow-hidden')
}

export const removeClassNamesForOverlayAndBody = () => {
  document.querySelector('.overlay')?.classList.remove('open')
  document.querySelector('.overlay')?.classList.remove('open-search')
  document.querySelector('.body')?.classList.remove('overflow-hidden')
}
