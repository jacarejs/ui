export const EMPTY_IMAGE_TYPES = [
  'default',
  'search',
  'inbox',
  'error',
  'success',
  'box',
  'folder',
  'cloud',
  'files',
  'users',
]

const glyphs = {
  default:
    '<rect x="20" y="28" width="80" height="60" rx="14" fill="COLOR" opacity="0.14"/><path d="M32 74l18-20 14 12 12-14 22 22H32z" fill="COLOR" opacity="0.55"/><circle cx="46" cy="48" r="8" fill="COLOR" opacity="0.7"/><rect x="36" y="94" width="48" height="7" rx="3.5" fill="COLOR" opacity="0.28"/>',
  search:
    '<circle cx="52" cy="52" r="26" fill="COLOR" opacity="0.12"/><circle cx="52" cy="52" r="22" fill="none" stroke="COLOR" stroke-width="7"/><path d="M70 70l24 24" stroke="COLOR" stroke-width="9" stroke-linecap="round"/>',
  inbox:
    '<path d="M20 50h80l-9 40a12 12 0 0 1-12 9H41a12 12 0 0 1-12-9L20 50z" fill="COLOR" opacity="0.18"/><path d="M16 50h88L76 24H44L16 50z" fill="COLOR" opacity="0.55"/><path d="M20 50h28l8 16h16l8-16h28" fill="none" stroke="COLOR" stroke-width="5" stroke-linejoin="round"/>',
  error:
    '<circle cx="60" cy="60" r="32" fill="COLOR" opacity="0.14"/><path d="M42 42l36 36M78 42 42 78" stroke="COLOR" stroke-width="9" stroke-linecap="round"/>',
  success:
    '<circle cx="60" cy="60" r="32" fill="COLOR" opacity="0.14"/><path d="M38 62l14 14 30-34" fill="none" stroke="COLOR" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
  box:
    '<rect x="28" y="38" width="64" height="48" rx="8" fill="COLOR" opacity="0.16"/><path d="M28 52h64" stroke="COLOR" stroke-width="5"/><path d="M44 38V30h32v8" fill="none" stroke="COLOR" stroke-width="5" stroke-linejoin="round"/><rect x="50" y="58" width="20" height="12" rx="3" fill="COLOR" opacity="0.55"/>',
  folder:
    '<path d="M22 44h28l8 10h40v40a8 8 0 0 1-8 8H30a8 8 0 0 1-8-8V44z" fill="COLOR" opacity="0.18"/><path d="M22 44V36a8 8 0 0 1 8-8h18l8 10H22z" fill="COLOR" opacity="0.55"/>',
  cloud:
    '<path d="M38 78h46a18 18 0 0 0 3-35.7A24 24 0 0 0 42 34a20 20 0 0 0-4 44z" fill="COLOR" opacity="0.2"/><path d="M38 78h46a18 18 0 0 0 3-35.7A24 24 0 0 0 42 34a20 20 0 0 0-4 44z" fill="none" stroke="COLOR" stroke-width="5" stroke-linejoin="round"/>',
  files:
    '<rect x="34" y="24" width="42" height="54" rx="8" fill="COLOR" opacity="0.16"/><rect x="44" y="34" width="42" height="54" rx="8" fill="COLOR" opacity="0.28"/><rect x="54" y="44" width="42" height="54" rx="8" fill="COLOR" opacity="0.55"/><path d="M64 58h22M64 68h18M64 78h14" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.85"/>',
  users:
    '<circle cx="46" cy="44" r="14" fill="COLOR" opacity="0.55"/><circle cx="76" cy="48" r="11" fill="COLOR" opacity="0.28"/><path d="M22 90c2-16 12-24 24-24s22 8 24 24" fill="COLOR" opacity="0.2"/><path d="M62 90c1-12 8-18 16-18s14 6 16 18" fill="COLOR" opacity="0.12"/>',
}

const maskGlyphs = {
  default:
    '<rect x="20" y="28" width="80" height="60" rx="14" fill="white" opacity="0.14"/><path d="M32 74l18-20 14 12 12-14 22 22H32z" fill="white" opacity="0.55"/><circle cx="46" cy="48" r="8" fill="white" opacity="0.7"/><rect x="36" y="94" width="48" height="7" rx="3.5" fill="white" opacity="0.28"/>',
  search:
    '<circle cx="52" cy="52" r="26" fill="white" opacity="0.12"/><circle cx="52" cy="52" r="22" fill="none" stroke="white" stroke-width="7"/><path d="M70 70l24 24" stroke="white" stroke-width="9" stroke-linecap="round"/>',
  inbox:
    '<path d="M20 50h80l-9 40a12 12 0 0 1-12 9H41a12 12 0 0 1-12-9L20 50z" fill="white" opacity="0.18"/><path d="M16 50h88L76 24H44L16 50z" fill="white" opacity="0.55"/><path d="M20 50h28l8 16h16l8-16h28" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/>',
  error:
    '<circle cx="60" cy="60" r="32" fill="white" opacity="0.14"/><path d="M42 42l36 36M78 42 42 78" stroke="white" stroke-width="9" stroke-linecap="round"/>',
  success:
    '<circle cx="60" cy="60" r="32" fill="white" opacity="0.14"/><path d="M38 62l14 14 30-34" fill="none" stroke="white" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>',
}

export function typeOfEmptyImage(value) {
  const next = String(value || 'default')
  return EMPTY_IMAGE_TYPES.includes(next) ? next : 'default'
}

export function sizeOfEmptyImage(value) {
  const next = Math.round(Number(value))
  return Number.isFinite(next) && next >= 48 ? next : 160
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function resolveColor(value, fallback) {
  const next = String(value || '').trim()
  return next || fallback
}

function glyphBody(type, color) {
  const key = typeOfEmptyImage(type)
  const template = glyphs[key] || glyphs.default
  return template.replaceAll('COLOR', escapeXml(color))
}

export function buildEmptyImageMaskUrl(type) {
  const key = typeOfEmptyImage(type)
  const body = maskGlyphs[key] || maskGlyphs.default
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${body}</svg>`
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`
}

export function buildEmptyImageSvg(options = {}) {
  const type = typeOfEmptyImage(options.type)
  const size = sizeOfEmptyImage(options.size)
  const color = resolveColor(options.color, '#c45c26')
  const background = resolveColor(options.background, '')
  const halo = options.halo !== false
  const parts = []

  if (background) {
    parts.push(
      `<rect width="120" height="120" rx="24" fill="${escapeXml(background)}"/>`,
    )
  }

  if (halo) {
    parts.push(
      `<circle cx="60" cy="60" r="54" fill="${escapeXml(color)}" opacity="0.1"/>`,
      `<circle cx="60" cy="60" r="54" fill="none" stroke="${escapeXml(color)}" stroke-width="1.5" opacity="0.22"/>`,
    )
  }

  parts.push(glyphBody(type, color))

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">${parts.join('')}</svg>`
}

export function buildEmptyImageDataUrl(options = {}) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildEmptyImageSvg(options))}`
}

export function downloadEmptyImage(dataUrl, filename = 'empty-image.svg') {
  if (!dataUrl) return
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  link.click()
}

export function svgDataUrlToPng(dataUrl, size, callback) {
  const px = sizeOfEmptyImage(size)
  const image = new Image()
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = px
    canvas.height = px
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      callback('')
      return
    }
    ctx.clearRect(0, 0, px, px)
    ctx.drawImage(image, 0, 0, px, px)
    callback(canvas.toDataURL('image/png'))
  }
  image.onerror = () => callback('')
  image.src = dataUrl
}
