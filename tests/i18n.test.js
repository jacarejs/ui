import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  LOCALE_STORAGE_KEY,
  addMessages,
  availableLocales,
  createI18n,
  getI18n,
  locale,
  localeBootScript,
  localeText,
  propText,
  readStoredLocale,
  resetI18n,
  setLocale,
  t,
  te,
  translate,
  uiMessages,
  useI18n,
  writeStoredLocale,
} from '../src/i18n/index.js'

afterEach(() => {
  localStorage.clear()
  if (typeof document !== 'undefined') {
    document.documentElement?.removeAttribute('lang')
  }
  resetI18n()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('i18n', () => {
  it('creates a reactive translator with nested keys and params', () => {
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
      persist: false,
      messages: {
        en: {
          hello: 'Hello, {name}!',
          save: 'Save',
          app: { title: 'Jacaré UI' },
        },
        'pt-BR': {
          hello: 'Olá, {name}!',
          save: 'Salvar',
          app: { title: 'Jacaré UI' },
        },
      },
    })

    expect(typeof i18n.t('hello', { name: 'Heber' })).toBe('function')
    expect(i18n.t('hello', { name: 'Heber' })()).toBe('Hello, Heber!')
    expect(i18n.t('app.title')()).toBe('Jacaré UI')
    expect(i18n.te('save')).toBe(true)
    expect(i18n.te('missing')).toBe(false)
    expect(i18n.availableLocales()).toEqual(['en', 'pt-BR'])

    i18n.setLocale('pt-BR')
    expect(i18n.locale()).toBe('pt-BR')
    expect(document.documentElement.lang).toBe('pt-BR')
    expect(i18n.t('hello', { name: 'Heber' })()).toBe('Olá, Heber!')
    expect(t('save')()).toBe('Salvar')
    expect(translate('save')).toBe('Salvar')
    expect(locale()).toBe('pt-BR')
  })

  it('falls back to fallbackLocale and returns the key when missing', () => {
    createI18n({
      locale: 'pt-BR',
      fallbackLocale: 'en',
      persist: false,
      messages: {
        en: { onlyEn: 'English only', shared: 'Hello', 'flat.key': 'Flat' },
        'pt-BR': { shared: 'Olá' },
      },
    })

    expect(t('shared')()).toBe('Olá')
    expect(t('onlyEn')()).toBe('English only')
    expect(t('flat.key')()).toBe('Flat')
    expect(t('missing.key')()).toBe('missing.key')
    expect(t(null)()).toBe('')
    expect(t('')()).toBe('')
    expect(te('onlyEn')).toBe(true)
    expect(te('gone')).toBe(false)
  })

  it('keeps unresolved params and ignores bad params bags', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: { hi: 'Hi {name}', nested: { deep: { value: 1 } } } },
    })
    expect(t('hi', { other: 'x' })()).toBe('Hi {name}')
    expect(t('hi', null)()).toBe('Hi {name}')
    expect(t('nested.deep.value')()).toBe('nested.deep.value')
    expect(t('nested.deep.missing')()).toBe('nested.deep.missing')
  })

  it('merges messages and exposes helpers', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: { a: 'A' } },
    })
    expect(addMessages('en', { b: 'B' })).toMatchObject({ a: 'A', b: 'B' })
    expect(addMessages('es', { hola: 'Hola' })).toEqual({ hola: 'Hola' })
    expect(addMessages('', { z: 'Z' })).toMatchObject({ a: 'A', b: 'B', z: 'Z' })
    expect(availableLocales()).toContain('es')
    expect(useI18n().t('b')()).toBe('B')
    expect(getI18n()).toBeTruthy()
  })

  it('reuses the same derive for the same key and params', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: { hello: 'Hello, {name}!' }, pt: { hello: 'Olá, {name}!' } },
    })
    const first = t('hello', { name: 'Heber' })
    const second = t('hello', { name: 'Heber' })
    expect(first).toBe(second)
    expect(first()).toBe('Hello, Heber!')
    setLocale('pt')
    expect(first()).toBe('Olá, Heber!')
  })

  it('persists locale when enabled', () => {
    createI18n({
      locale: 'en',
      messages: { en: { ok: 'OK' }, pt: { ok: 'OK' } },
    })
    setLocale('pt')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('pt')
    expect(readStoredLocale()).toBe('pt')

    createI18n({
      locale: 'en',
      messages: { en: { ok: 'OK' }, pt: { ok: 'OK' } },
    })
    expect(locale()).toBe('pt')
  })

  it('skips persistence when disabled', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: {}, fr: {} },
    })
    setLocale('fr')
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull()
  })

  it('reads and writes storage helpers safely', () => {
    expect(readStoredLocale('en')).toBe('en')
    writeStoredLocale('de')
    expect(readStoredLocale()).toBe('de')
    localStorage.setItem(LOCALE_STORAGE_KEY, '')
    expect(readStoredLocale('en')).toBe('en')

    const script = localeBootScript()
    expect(script).toContain(LOCALE_STORAGE_KEY)
    expect(script).toContain('document.documentElement.lang')
    expect(localeBootScript('custom-key')).toContain('custom-key')
  })

  it('handles missing localStorage and document', () => {
    const originalStorage = globalThis.localStorage
    const originalDocument = globalThis.document

    vi.stubGlobal('localStorage', undefined)
    expect(readStoredLocale('en')).toBe('en')
    writeStoredLocale('x')
    createI18n({
      locale: 'en',
      persist: true,
      messages: { en: { a: 'A' } },
    })
    expect(setLocale('en')).toBe('en')

    vi.stubGlobal('document', undefined)
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: { a: 'A' } },
    })
    expect(setLocale('en')).toBe('en')

    vi.stubGlobal('localStorage', originalStorage)
    vi.stubGlobal('document', originalDocument)
  })

  it('defaults options and covers inactive helpers', () => {
    createI18n({})
    expect(t('x')()).toBe('x')
    expect(te('j.common.select')).toBe(true)
    expect(setLocale('')).toBe('en')
    expect(addMessages(null, null)).toMatchObject(uiMessages.en)

    resetI18n()
    expect(getI18n()).toBeNull()
    expect(t('hello')()).toBe('hello')
    expect(t(null)()).toBe('')
    expect(translate('hello')).toBe('hello')
    expect(te('hello')).toBe(false)
    expect(locale()).toBe('')
    expect(setLocale('pt')).toBe('pt')
    expect(setLocale('')).toBe('')
    expect(addMessages('pt', { a: 'A' })).toBeNull()
    expect(availableLocales()).toEqual([])
    expect(() => useI18n()).toThrow(/createI18n/)
  })

  it('accepts non-object messages bags and still ships UI strings', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: null,
    })
    expect(availableLocales()).toEqual(['en', 'pt-BR'])
    expect(t('j.common.cancel')()).toBe('Cancel')
    expect(t('x')()).toBe('x')
  })

  it('localizes component chrome via localeText and propText', () => {
    createI18n({
      locale: 'en',
      persist: false,
      messages: { en: { app: { title: 'App' } } },
    })
    expect(localeText('j.common.select', 'Select')).toBe('Select')
    expect(propText('Select', 'j.common.select', 'Select')).toBe('Select')
    expect(propText('Custom', 'j.common.select', 'Select')).toBe('Custom')
    setLocale('pt-BR')
    expect(localeText('j.common.select', 'Select')).toBe('Selecionar')
    expect(propText('Select', 'j.common.select', 'Select')).toBe('Selecionar')
    expect(propText('Custom', 'j.common.select', 'Select')).toBe('Custom')
    expect(t('app.title')()).toBe('App')
  })

  it('can disable UI message packs', () => {
    createI18n({
      locale: 'en',
      persist: false,
      includeUiMessages: false,
      messages: { en: { hello: 'Hi' } },
    })
    expect(te('j.common.select')).toBe(false)
    expect(localeText('j.common.select', 'Select')).toBe('Select')
    expect(t('hello')()).toBe('Hi')
  })
})
