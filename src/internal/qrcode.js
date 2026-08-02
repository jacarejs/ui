import qrcode from 'qrcode-generator'

function toUtf8Bytes(text) {
  const value = String(text ?? '')
  if (typeof TextEncoder !== 'undefined') {
    return Array.from(new TextEncoder().encode(value))
  }
  const bytes = []
  for (let index = 0; index < value.length; index += 1) {
    let code = value.charCodeAt(index)
    if (code < 0x80) {
      bytes.push(code)
      continue
    }
    if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f))
      continue
    }
    if (code >= 0xd800 && code <= 0xdbff && index + 1 < value.length) {
      const next = value.charCodeAt(index + 1)
      if (next >= 0xdc00 && next <= 0xdfff) {
        code = 0x10000 + ((code - 0xd800) << 10) + (next - 0xdc00)
        index += 1
        bytes.push(
          0xf0 | (code >> 18),
          0x80 | ((code >> 12) & 0x3f),
          0x80 | ((code >> 6) & 0x3f),
          0x80 | (code & 0x3f),
        )
        continue
      }
    }
    bytes.push(
      0xe0 | (code >> 12),
      0x80 | ((code >> 6) & 0x3f),
      0x80 | (code & 0x3f),
    )
  }
  return bytes
}

qrcode.stringToBytes = toUtf8Bytes

export function createQrMatrix(text, level = 'M') {
  const ecc = ['L', 'M', 'Q', 'H'].includes(String(level || '').toUpperCase())
    ? String(level).toUpperCase()
    : 'M'
  const qr = qrcode(0, ecc)
  qr.addData(String(text || ' '), 'Byte')
  qr.make()
  return qr
}

export function paintQrCanvas(canvas, text, options = {}) {
  if (!canvas) return ''
  const size = Math.max(64, Math.round(Number(options.size) || 180))
  const margin = Math.max(0, Math.min(8, Math.round(Number(options.margin) || 2)))
  const dark = String(options.darkColor || '#111827')
  const light = String(options.lightColor || '#ffffff')
  const qr = createQrMatrix(text, options.level)
  const count = qr.getModuleCount()
  const modules = count + margin * 2
  const cell = size / modules
  const ratio = Math.max(1, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)
  canvas.width = Math.round(size * ratio)
  canvas.height = Math.round(size * ratio)
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  ctx.fillStyle = light
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = dark
  for (let row = 0; row < count; row += 1) {
    for (let col = 0; col < count; col += 1) {
      if (!qr.isDark(row, col)) continue
      ctx.fillRect((col + margin) * cell, (row + margin) * cell, cell + 0.5, cell + 0.5)
    }
  }
  return canvas.toDataURL('image/png')
}
