import { derive, pulse } from '@jacare/core'

export const LOCALE_STORAGE_KEY = 'j-locale'

let active = null

function readMessages(source) {
  return source && typeof source === 'object' ? source : {}
}

function getByPath(bag, key) {
  if (!bag || key == null || key === '') return undefined
  const path = String(key)
  if (Object.prototype.hasOwnProperty.call(bag, path) && typeof bag[path] === 'string') {
    return bag[path]
  }
  const parts = path.split('.')
  let current = bag
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = current[part]
  }
  return typeof current === 'string' ? current : undefined
}

function interpolate(template, params) {
  if (!params || typeof params !== 'object') return String(template)
  return String(template).replace(/\{(\w+)\}/g, (_, name) => {
    const value = params[name]
    return value == null ? `{${name}}` : String(value)
  })
}

function applyDocumentLang(locale) {
  if (typeof document === 'undefined' || !document.documentElement) return
  document.documentElement.lang = locale
}

function cacheKey(key, params) {
  if (!params || typeof params !== 'object') return String(key ?? '')
  return `${key}\0${JSON.stringify(params)}`
}

export function readStoredLocale(fallback = '') {
  if (typeof localStorage === 'undefined') return fallback
  const value = localStorage.getItem(LOCALE_STORAGE_KEY)
  return value == null || value === '' ? fallback : value
}

export function writeStoredLocale(locale) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(LOCALE_STORAGE_KEY, String(locale))
}

export function localeBootScript(storageKey = LOCALE_STORAGE_KEY) {
  return `(function(){try{var s=localStorage.getItem('${storageKey}');if(s)document.documentElement.lang=s}catch(e){}})();`
}

function createInstance(options = {}) {
  const fallbackLocale = String(options.fallbackLocale || options.locale || 'en')
  const messages = { ...readMessages(options.messages) }
  const persist = options.persist !== false
  const initial =
    (persist ? readStoredLocale('') : '') ||
    String(options.locale || fallbackLocale)
  const localePulse = pulse(initial)
  const revision = pulse(0)
  const translations = new Map()

  function resolveMessage(key, locale) {
    const direct = getByPath(messages[locale], key)
    if (direct != null) return direct
    if (locale !== fallbackLocale) return getByPath(messages[fallbackLocale], key)
    return undefined
  }

  function render(key, params) {
    revision()
    localePulse()
    const message = resolveMessage(key, localePulse())
    if (message == null) return String(key ?? '')
    return interpolate(message, params)
  }

  function t(key, params) {
    const id = cacheKey(key, params)
    let translated = translations.get(id)
    if (!translated) {
      translated = derive(() => render(key, params))
      translations.set(id, translated)
    }
    return translated
  }

  function te(key) {
    revision()
    localePulse()
    return resolveMessage(key, localePulse()) != null
  }

  function setLocale(next) {
    const locale = String(next || fallbackLocale)
    localePulse.set(locale)
    applyDocumentLang(locale)
    if (persist) writeStoredLocale(locale)
    return locale
  }

  function addMessages(locale, bag) {
    const id = String(locale || fallbackLocale)
    messages[id] = {
      ...readMessages(messages[id]),
      ...readMessages(bag),
    }
    revision.set(revision() + 1)
    return messages[id]
  }

  function availableLocales() {
    return Object.keys(messages)
  }

  applyDocumentLang(initial)

  return {
    t,
    te,
    locale: localePulse,
    setLocale,
    addMessages,
    availableLocales,
    messages,
    fallbackLocale,
  }
}

export function createI18n(options = {}) {
  active = createInstance(options)
  return active
}

export function resetI18n() {
  active = null
}

export function useI18n() {
  if (!active) {
    throw new Error('[jacare/ui i18n] Call createI18n() before useI18n().')
  }
  return active
}

export function getI18n() {
  return active
}

export function t(key, params) {
  if (active) return active.t(key, params)
  return derive(() => String(key ?? ''))
}

export function translate(key, params) {
  return t(key, params)()
}

export function te(key) {
  return active ? active.te(key) : false
}

export function locale() {
  return active ? active.locale() : ''
}

export function setLocale(next) {
  if (!active) return String(next || '')
  return active.setLocale(next)
}

export function addMessages(locale, bag) {
  if (!active) return null
  return active.addMessages(locale, bag)
}

export function availableLocales() {
  return active ? active.availableLocales() : []
}
