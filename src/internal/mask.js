export const MASK_PRESETS = {
  cpf: '###.###.###-##',
  cnpj: '##.###.###/####-##',
  phone: '(##) #####-####',
  'phone-landline': '(##) ####-####',
  cep: '#####-###',
  date: '##/##/####',
  time: '##:##',
  card: '#### #### #### ####',
  cvv: '###',
  rg: '##.###.###-#',
  pis: '###.#####.##-#',
}

export function resolveMask(mask, preset) {
  const custom = String(mask ?? '').trim()
  if (custom) return custom
  const key = String(preset ?? '').trim()
  return MASK_PRESETS[key] || ''
}

export function isMaskToken(char) {
  return char === '#' || char === 'A' || char === '*'
}

export function matchesMaskToken(char, token) {
  if (!char) return false
  if (token === '#') return /\d/.test(char)
  if (token === 'A') return /[a-zA-Z]/.test(char)
  if (token === '*') return /[a-zA-Z0-9]/.test(char)
  return false
}

export function extractMaskRaw(value, mask) {
  const pattern = String(mask || '')
  const source = String(value ?? '')
  if (!pattern) return source

  const tokens = [...pattern].filter(isMaskToken)
  if (!tokens.length) return source

  let tokenIndex = 0
  let raw = ''
  for (const char of source) {
    if (tokenIndex >= tokens.length) break
    const token = tokens[tokenIndex]
    if (matchesMaskToken(char, token)) {
      raw += char
      tokenIndex += 1
    }
  }
  return raw
}

export function applyMask(value, mask) {
  const pattern = String(mask || '')
  if (!pattern) return String(value ?? '')

  const raw = extractMaskRaw(value, pattern)
  let result = ''
  let rawIndex = 0

  for (const char of pattern) {
    if (rawIndex >= raw.length) break
    if (isMaskToken(char)) {
      result += raw[rawIndex]
      rawIndex += 1
    } else {
      result += char
    }
  }

  return result
}

export function unmaskValue(value, mask) {
  const pattern = String(mask || '')
  if (!pattern) return String(value ?? '')
  return extractMaskRaw(value, pattern)
}

export function moneyDigits(value) {
  return String(value ?? '').replace(/\D/g, '')
}

export function parseMoneyInput(value, precision = 2, allowNegative = false) {
  const text = String(value ?? '')
  const negative = allowNegative && /^-/.test(text.trim())
  const digits = moneyDigits(text)
  if (!digits) return 0
  const places = Math.max(0, Math.round(Number(precision) || 0))
  const amount = Number(digits) / 10 ** places
  if (!Number.isFinite(amount)) return 0
  return negative ? -amount : amount
}

export function formatMoney(amount, options = {}) {
  const {
    locale = 'pt-BR',
    currency = 'BRL',
    precision = 2,
    currencyDisplay = 'symbol',
  } = options
  const places = Math.max(0, Math.round(Number(precision) || 0))
  const number = Number(amount)
  const safe = Number.isFinite(number) ? number : 0

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
      minimumFractionDigits: places,
      maximumFractionDigits: places,
    }).format(safe)
  } catch {
    return safe.toFixed(places)
  }
}

export function formatMoneyFromDigits(digits, options = {}) {
  return formatMoney(parseMoneyInput(digits, options.precision, options.allowNegative), options)
}
