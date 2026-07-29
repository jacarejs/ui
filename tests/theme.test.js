import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  applyTheme,
  applyDensity,
  applyMotion,
  densities,
  getSystemTheme,
  motionModes,
  readStoredDensity,
  readStoredMotion,
  readStoredTheme,
  resolveDensity,
  resolveMotion,
  resolveTheme,
  themeBootScript,
  themes,
  watchSystemTheme,
} from '../src/theme/index.js'

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-j-theme')
  document.documentElement.removeAttribute('data-j-density')
  document.documentElement.removeAttribute('data-j-motion')
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('theme', () => {
  it('exposes theme mode constants', () => {
    expect(themes).toEqual({ light: 'light', dark: 'dark', system: 'system' })
  })

  it('resolves explicit and system modes', () => {
    expect(resolveTheme('light')).toBe('light')
    expect(resolveTheme('dark')).toBe('dark')
    expect(['light', 'dark']).toContain(resolveTheme('system'))
    expect(['light', 'dark']).toContain(getSystemTheme())
    expect(resolveTheme('weird')).toEqual(getSystemTheme())
  })

  it('falls back to light when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    expect(getSystemTheme()).toBe('light')
    expect(watchSystemTheme(() => {})()).toBeUndefined()
  })

  it('applies theme to the document and stores preference', () => {
    expect(applyTheme('dark')).toBe('dark')
    expect(document.documentElement.dataset.jTheme).toBe('dark')
    expect(localStorage.getItem('j-theme')).toBe('dark')

    expect(applyTheme('light')).toBe('light')
    expect(document.documentElement.dataset.jTheme).toBe('light')
    expect(readStoredTheme()).toBe('light')

    expect(applyTheme('system')).toBe(getSystemTheme())
    expect(localStorage.getItem('j-theme')).toBe('system')
  })

  it('skips storage and target writes when unavailable', () => {
    expect(applyTheme('dark', null)).toBe('dark')
    expect(applyTheme('neon', null)).toBe(getSystemTheme())

    const target = document.createElement('div')
    expect(applyTheme('neon', target)).toBe(getSystemTheme())
    expect(target.dataset.jTheme).toBe(getSystemTheme())
    expect(localStorage.getItem('j-theme')).toBeNull()
  })

  it('returns fallback when stored theme is missing or invalid', () => {
    expect(readStoredTheme('system')).toBe('system')
    localStorage.setItem('j-theme', 'neon')
    expect(readStoredTheme('dark')).toBe('dark')
  })

  it('watches system theme changes', () => {
    const listeners = new Set()
    const media = {
      matches: false,
      addEventListener: (_event, handler) => listeners.add(handler),
      removeEventListener: (_event, handler) => listeners.delete(handler),
    }
    vi.stubGlobal('matchMedia', () => media)

    const onChange = vi.fn()
    const stop = watchSystemTheme(onChange)
    expect(listeners.size).toBe(1)

    for (const handler of listeners) handler()
    expect(onChange).toHaveBeenCalledWith('light')

    stop()
    expect(listeners.size).toBe(0)
  })

  it('falls back to addListener when addEventListener is unavailable', () => {
    const listeners = new Set()
    const media = {
      matches: true,
      addListener: (handler) => listeners.add(handler),
      removeListener: (handler) => listeners.delete(handler),
    }
    vi.stubGlobal('matchMedia', () => media)

    const onChange = vi.fn()
    const stop = watchSystemTheme(onChange)
    for (const handler of listeners) handler()
    expect(onChange).toHaveBeenCalledWith('dark')
    stop()
    expect(listeners.size).toBe(0)
  })

  it('emits a boot script for early theme paint', () => {
    const script = themeBootScript()
    expect(script).toContain("localStorage.getItem(k)")
    expect(script).toContain("k='j-theme'")
    expect(script).toContain('dataset.jTheme')
    expect(script).toContain('prefers-color-scheme: dark')
  })

  it('applies density and motion preferences', () => {
    expect(applyDensity('compact')).toBe('compact')
    expect(document.documentElement.dataset.jDensity).toBe('compact')
    expect(readStoredDensity()).toBe('compact')
    expect(resolveDensity('nope')).toBe('comfortable')
    expect(resolveDensity()).toBe('comfortable')
    expect(densities.spacious).toBe('spacious')
    expect(applyDensity('spacious', null)).toBe('spacious')

    expect(applyMotion('reduce')).toBe('reduce')
    expect(document.documentElement.dataset.jMotion).toBe('reduce')
    expect(readStoredMotion()).toBe('reduce')
    expect(applyMotion('system')).toBe('system')
    expect(document.documentElement.dataset.jMotion).toBeUndefined()
    expect(applyMotion('full')).toBe('full')
    expect(document.documentElement.dataset.jMotion).toBe('full')
    expect(resolveMotion('nope')).toBe('system')
    expect(resolveMotion()).toBe('system')
    expect(applyMotion('reduce', null)).toBe('reduce')
    expect(motionModes.full).toBe('full')
  })

  it('reads stored density and motion with fallbacks', () => {
    expect(readStoredDensity('spacious')).toBe('spacious')
    expect(readStoredMotion('full')).toBe('full')
    localStorage.setItem('j-density', 'nope')
    localStorage.setItem('j-motion', 'nope')
    expect(readStoredDensity()).toBe('comfortable')
    expect(readStoredMotion()).toBe('system')
  })

  it('falls back when localStorage is unavailable', () => {
    const original = globalThis.localStorage
    vi.stubGlobal('localStorage', undefined)

    expect(readStoredTheme('dark')).toBe('dark')
    expect(readStoredDensity('spacious')).toBe('spacious')
    expect(readStoredMotion('full')).toBe('full')

    const target = document.createElement('div')
    expect(applyTheme('dark', target)).toBe('dark')
    expect(applyDensity('compact', target)).toBe('compact')
    expect(applyMotion('reduce', target)).toBe('reduce')
    expect(applyMotion('system', target)).toBe('system')

    vi.stubGlobal('localStorage', original)
  })
})
