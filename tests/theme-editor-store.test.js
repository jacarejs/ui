import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { darkDefaults, lightDefaults, themePresets } from '../docs/src/theme-presets.js'
import {
  THEME_CUSTOM_STORAGE_KEY,
  THEME_EDITOR_STORAGE_KEY,
  THEME_OVERRIDE_STORAGE_KEY,
  allThemes,
  applyThemeTokens,
  builtInThemesResolved,
  clearBuiltInOverride,
  clearThemeEditorState,
  deleteCustomTheme,
  factoryPresetById,
  hasBuiltInOverride,
  isBuiltInThemeId,
  presetById,
  readCustomThemes,
  readThemeEditorState,
  readThemeOverrides,
  restoreThemeEditorFromStorage,
  saveBuiltInOverride,
  saveCustomTheme,
  writeThemeEditorState,
} from '../docs/src/theme-editor-store.js'

beforeEach(() => {
  localStorage.clear()
  document.getElementById('jui-theme-editor-style')?.remove()
})

afterEach(() => {
  localStorage.clear()
  document.getElementById('jui-theme-editor-style')?.remove()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('theme-presets', () => {
  it('ships unique presets with light and dark palettes', () => {
    const ids = themePresets.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(themePresets.length).toBeGreaterThan(10)
    for (const preset of themePresets) {
      expect(preset.light['--j-primary']).toBeTruthy()
      expect(preset.dark['--j-primary']).toBeTruthy()
      expect(preset.light['--j-success']).toBe(preset.light['--j-primary'])
    }
    expect(lightDefaults['--j-primary']).toBe('#189030')
    expect(darkDefaults['--j-primary']).toBe('#3dd068')
  })
})

describe('theme-editor-store', () => {
  it('resolves built-in presets and rejects unknown ids', () => {
    expect(isBuiltInThemeId('jacare')).toBe(true)
    expect(isBuiltInThemeId('missing')).toBe(false)
    expect(factoryPresetById('ocean').id).toBe('ocean')
    expect(factoryPresetById('missing').id).toBe('jacare')
    expect(presetById('jacare').id).toBe('jacare')
  })

  it('reads and writes editor state', () => {
    expect(readThemeEditorState()).toBeNull()

    writeThemeEditorState({
      presetId: 'ocean',
      light: { ...lightDefaults, '--j-primary': '#111111' },
      dark: { ...darkDefaults, '--j-primary': '#222222' },
    })

    const stored = readThemeEditorState()
    expect(stored.presetId).toBe('ocean')
    expect(stored.light['--j-primary']).toBe('#111111')
    expect(stored.dark['--j-primary']).toBe('#222222')

    localStorage.setItem(THEME_EDITOR_STORAGE_KEY, '{bad')
    expect(readThemeEditorState()).toBeNull()

    localStorage.setItem(THEME_EDITOR_STORAGE_KEY, JSON.stringify({ presetId: 'x' }))
    expect(readThemeEditorState()).toBeNull()
  })

  it('applies tokens and restores them from storage', () => {
    writeThemeEditorState({
      presetId: 'custom',
      light: lightDefaults,
      dark: darkDefaults,
    })

    const restored = restoreThemeEditorFromStorage()
    expect(restored.presetId).toBe('custom')
    const style = document.getElementById('jui-theme-editor-style')
    expect(style).toBeTruthy()
    expect(style.textContent).toContain(':root')
    expect(style.textContent).toContain("[data-j-theme='dark']")
    expect(style.textContent).toContain('--j-accent:')

    clearThemeEditorState()
    expect(localStorage.getItem(THEME_EDITOR_STORAGE_KEY)).toBeNull()
    expect(document.getElementById('jui-theme-editor-style')).toBeNull()
  })

  it('saves and clears built-in overrides', () => {
    expect(saveBuiltInOverride('missing', { light: lightDefaults, dark: darkDefaults })).toBeNull()

    const saved = saveBuiltInOverride('jacare', {
      light: { ...lightDefaults, '--j-primary': '#aaaaaa' },
      dark: { ...darkDefaults, '--j-primary': '#bbbbbb' },
    })
    expect(saved.overridden).toBe(true)
    expect(hasBuiltInOverride('jacare')).toBe(true)
    expect(readThemeOverrides().jacare.light['--j-primary']).toBe('#aaaaaa')

    const resolved = builtInThemesResolved().find((item) => item.id === 'jacare')
    expect(resolved.overridden).toBe(true)
    expect(resolved.blurb).toContain('edited')
    expect(resolved.light['--j-primary']).toBe('#aaaaaa')

    expect(clearBuiltInOverride('jacare')).toBe(true)
    expect(hasBuiltInOverride('jacare')).toBe(false)
    expect(clearBuiltInOverride('jacare')).toBe(false)

    localStorage.setItem(THEME_OVERRIDE_STORAGE_KEY, '{bad')
    expect(readThemeOverrides()).toEqual({})
  })

  it('creates, updates, and deletes custom themes', () => {
    const created = saveCustomTheme({
      label: 'My Sunset!!',
      blurb: 'Warm evening',
      light: { ...lightDefaults, '--j-primary': '#ff6600' },
      dark: darkDefaults,
    })
    expect(created.custom).toBe(true)
    expect(created.id).toContain('custom-my-sunset')
    expect(created.label).toBe('My Sunset!!')
    expect(readCustomThemes()).toHaveLength(1)
    expect(allThemes().some((item) => item.id === created.id)).toBe(true)
    expect(presetById(created.id).id).toBe(created.id)

    const updated = saveCustomTheme({
      id: created.id,
      label: 'Sunset 2',
      light: { ...lightDefaults, '--j-primary': '#ff8800' },
      dark: darkDefaults,
    })
    expect(updated.label).toBe('Sunset 2')
    expect(readCustomThemes()).toHaveLength(1)
    expect(readCustomThemes()[0].light['--j-primary']).toBe('#ff8800')

    deleteCustomTheme(created.id)
    expect(readCustomThemes()).toHaveLength(0)

    localStorage.setItem(THEME_CUSTOM_STORAGE_KEY, '{bad')
    expect(readCustomThemes()).toEqual([])

    localStorage.setItem(THEME_CUSTOM_STORAGE_KEY, JSON.stringify([{ id: 'x' }]))
    expect(readCustomThemes()).toEqual([])
  })

  it('applies theme tokens without duplicating the style element', () => {
    applyThemeTokens(lightDefaults, darkDefaults)
    applyThemeTokens(
      { ...lightDefaults, '--j-primary': '#123456' },
      darkDefaults,
    )
    expect(document.querySelectorAll('#jui-theme-editor-style')).toHaveLength(1)
    expect(document.getElementById('jui-theme-editor-style').textContent).toContain('#123456')
  })

  it('fills semantic aliases when optional tokens are missing', () => {
    applyThemeTokens(
      {
        '--j-primary': '#111111',
        '--j-danger': '#ff0000',
        '--j-warn': '#f59e0b',
        '--j-surface': '#ffffff',
        '--j-surface-2': '#f5f5f5',
        '--j-text': '#101010',
        '--j-muted': '#666666',
      },
      {
        '--j-primary': '#22c55e',
        '--j-leaf': '#16a34a',
        '--j-danger': '#f87171',
        '--j-warn': '#fbbf24',
        '--j-info': '#38bdf8',
        '--j-surface': '#0b1220',
        '--j-surface-2': '#111827',
        '--j-text': '#f8fafc',
        '--j-muted': '#94a3b8',
        '--j-bright': '#a3e635',
        '--j-lime': '#84cc16',
        '--j-focus': '0 0 0 2px red',
      },
    )
    const css = document.getElementById('jui-theme-editor-style').textContent
    expect(css).toContain('--j-accent: #111111')
    expect(css).toContain('--j-bright: #111111')
    expect(css).toContain('--j-info: #111111')
    expect(css).toContain('--j-accent-hover: #16a34a')
    expect(css).toContain('--j-info: #38bdf8')
    expect(css).toContain('--j-bright: #a3e635')
    expect(css).toContain('--j-focus: 0 0 0 2px red')
  })

  it('defaults editor preset id and custom theme labels', () => {
    localStorage.setItem(
      THEME_EDITOR_STORAGE_KEY,
      JSON.stringify({
        presetId: 12,
        light: lightDefaults,
        dark: darkDefaults,
      }),
    )
    expect(readThemeEditorState().presetId).toBe('custom')

    writeThemeEditorState({
      light: lightDefaults,
      dark: darkDefaults,
    })
    expect(JSON.parse(localStorage.getItem(THEME_EDITOR_STORAGE_KEY)).presetId).toBe('custom')

    const created = saveCustomTheme({
      label: '   ',
      blurb: '   ',
      light: lightDefaults,
      dark: darkDefaults,
    })
    expect(created.label).toBe('Custom')
    expect(created.blurb).toBe('Saved from Theme Editor')
    expect(created.id).toContain('custom-custom-')

    localStorage.setItem(THEME_CUSTOM_STORAGE_KEY, JSON.stringify('nope'))
    expect(readCustomThemes()).toEqual([])

    localStorage.setItem(THEME_OVERRIDE_STORAGE_KEY, JSON.stringify('nope'))
    expect(readThemeOverrides()).toEqual({})

    localStorage.setItem(THEME_EDITOR_STORAGE_KEY, JSON.stringify('nope'))
    expect(readThemeEditorState()).toBeNull()

    expect(restoreThemeEditorFromStorage()).toBeNull()
    expect(presetById('missing-custom').id).toBe('jacare')
  })

  it('clears editor styles safely when the style node is absent', () => {
    writeThemeEditorState({
      presetId: 'custom',
      light: lightDefaults,
      dark: darkDefaults,
    })
    clearThemeEditorState()
    expect(localStorage.getItem(THEME_EDITOR_STORAGE_KEY)).toBeNull()
    clearThemeEditorState()
  })

  it('no-ops storage helpers when localStorage is unavailable', () => {
    const original = globalThis.localStorage
    vi.stubGlobal('localStorage', undefined)

    expect(readThemeEditorState()).toBeNull()
    expect(readThemeOverrides()).toEqual({})
    expect(readCustomThemes()).toEqual([])
    writeThemeEditorState({
      presetId: 'custom',
      light: lightDefaults,
      dark: darkDefaults,
    })
    clearThemeEditorState()
    expect(saveBuiltInOverride('jacare', { light: lightDefaults, dark: darkDefaults })).toBeTruthy()
    expect(hasBuiltInOverride('jacare')).toBe(false)
    expect(
      saveCustomTheme({
        label: 'Offline',
        light: lightDefaults,
        dark: darkDefaults,
      }).label,
    ).toBe('Offline')

    vi.stubGlobal('localStorage', original)
  })

  it('fills missing custom theme fields when reading storage', () => {
    localStorage.setItem(
      THEME_CUSTOM_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'custom-bare',
          light: { '--j-primary': '#111111' },
          dark: { '--j-primary': '#222222' },
        },
      ]),
    )
    const [theme] = readCustomThemes()
    expect(theme.label).toBe('custom-bare')
    expect(theme.blurb).toBe('Custom theme')
    expect(theme.createdAt).toBe(0)
  })

  it('no-ops document helpers when document is unavailable', () => {
    const originalDocument = globalThis.document
    vi.stubGlobal('document', undefined)

    expect(() => applyThemeTokens(lightDefaults, darkDefaults)).not.toThrow()
    expect(() => clearThemeEditorState()).not.toThrow()

    vi.stubGlobal('document', originalDocument)
  })

  it('slugifies empty labels when creating custom theme ids', () => {
    const created = saveCustomTheme({
      light: lightDefaults,
      dark: darkDefaults,
    })
    expect(created.label).toBe('Custom')
    expect(created.blurb).toBe('Saved from Theme Editor')
    expect(created.id).toMatch(/^custom-custom-/)
  })
})
