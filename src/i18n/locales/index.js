import { en } from './en.js'
import { ptBR } from './pt-BR.js'

export { en, ptBR }

export const uiMessages = {
  en,
  'pt-BR': ptBR,
}

export function deepMergeMessages(base = {}, extra = {}) {
  const out = { ...base }
  for (const [key, value] of Object.entries(extra)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      out[key] &&
      typeof out[key] === 'object' &&
      !Array.isArray(out[key])
    ) {
      out[key] = deepMergeMessages(out[key], value)
    } else {
      out[key] = value
    }
  }
  return out
}

export function mergeUiMessages(appMessages = {}, ui = uiMessages) {
  const locales = new Set([...Object.keys(ui), ...Object.keys(appMessages || {})])
  const out = {}
  for (const locale of locales) {
    out[locale] = deepMergeMessages(ui[locale] || {}, appMessages?.[locale] || {})
  }
  return out
}
