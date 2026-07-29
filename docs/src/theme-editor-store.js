import { themePresets, lightDefaults, darkDefaults } from './theme-presets.js'

export const THEME_EDITOR_STORAGE_KEY = 'jui-theme-editor'
export const THEME_CUSTOM_STORAGE_KEY = 'jui-theme-editor-custom'
export const THEME_OVERRIDE_STORAGE_KEY = 'jui-theme-editor-overrides'

const STYLE_ID = 'jui-theme-editor-style'

function cssBlock(selector, tokens) {
  const body = Object.entries(tokens)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
  return `${selector} {\n${body}\n}`
}

function slugify(label) {
  return String(label || 'custom')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'custom'
}

export function isBuiltInThemeId(id) {
  return themePresets.some((item) => item.id === id)
}

export function factoryPresetById(id) {
  return themePresets.find((item) => item.id === id) || themePresets[0]
}

export function readThemeEditorState() {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(THEME_EDITOR_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.light || !parsed.dark) return null
    return {
      presetId: typeof parsed.presetId === 'string' ? parsed.presetId : 'custom',
      light: { ...lightDefaults, ...parsed.light },
      dark: { ...darkDefaults, ...parsed.dark },
    }
  } catch {
    return null
  }
}

export function writeThemeEditorState(state) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(
    THEME_EDITOR_STORAGE_KEY,
    JSON.stringify({
      presetId: state.presetId || 'custom',
      light: state.light,
      dark: state.dark,
      updatedAt: Date.now(),
    }),
  )
}

export function clearThemeEditorState() {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(THEME_EDITOR_STORAGE_KEY)
  const el = typeof document !== 'undefined' ? document.getElementById(STYLE_ID) : null
  el?.remove()
}

export function readThemeOverrides() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(THEME_OVERRIDE_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeThemeOverrides(map) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(THEME_OVERRIDE_STORAGE_KEY, JSON.stringify(map))
}

export function saveBuiltInOverride(id, { light, dark }) {
  if (!isBuiltInThemeId(id)) return null
  const factory = factoryPresetById(id)
  const map = readThemeOverrides()
  map[id] = {
    light: { ...lightDefaults, ...light },
    dark: { ...darkDefaults, ...dark },
    updatedAt: Date.now(),
  }
  writeThemeOverrides(map)
  return {
    ...factory,
    light: map[id].light,
    dark: map[id].dark,
    overridden: true,
  }
}

export function clearBuiltInOverride(id) {
  const map = readThemeOverrides()
  if (!map[id]) return false
  delete map[id]
  writeThemeOverrides(map)
  return true
}

export function hasBuiltInOverride(id) {
  return !!readThemeOverrides()[id]
}

export function readCustomThemes() {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(THEME_CUSTOM_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && item.id && item.light && item.dark)
      .map((item) => ({
        id: String(item.id),
        label: String(item.label || item.id),
        blurb: String(item.blurb || 'Custom theme'),
        custom: true,
        light: { ...lightDefaults, ...item.light },
        dark: { ...darkDefaults, ...item.dark },
        createdAt: item.createdAt || 0,
      }))
  } catch {
    return []
  }
}

function writeCustomThemes(list) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(THEME_CUSTOM_STORAGE_KEY, JSON.stringify(list))
}

export function saveCustomTheme({ id, label, blurb, light, dark }) {
  const list = readCustomThemes()
  const nextId = id || `custom-${slugify(label)}-${Date.now().toString(36)}`
  const theme = {
    id: nextId,
    label: String(label || 'Custom').trim() || 'Custom',
    blurb: String(blurb || 'Saved from Theme Editor').trim() || 'Saved from Theme Editor',
    custom: true,
    light: { ...lightDefaults, ...light },
    dark: { ...darkDefaults, ...dark },
    createdAt: Date.now(),
  }
  const index = list.findIndex((item) => item.id === nextId)
  if (index >= 0) list[index] = theme
  else list.unshift(theme)
  writeCustomThemes(list)
  return theme
}

export function deleteCustomTheme(id) {
  writeCustomThemes(readCustomThemes().filter((item) => item.id !== id))
}

export function builtInThemesResolved() {
  const overrides = readThemeOverrides()
  return themePresets.map((preset) => {
    const override = overrides[preset.id]
    if (!override) return { ...preset, overridden: false }
    return {
      ...preset,
      light: { ...lightDefaults, ...override.light },
      dark: { ...darkDefaults, ...override.dark },
      overridden: true,
      blurb: `${preset.blurb} · edited`,
    }
  })
}

export function allThemes() {
  return [...builtInThemesResolved(), ...readCustomThemes()]
}

function withSemanticAliases(tokens) {
  const primary = tokens['--j-primary']
  const leaf = tokens['--j-leaf'] || primary
  const danger = tokens['--j-danger']
  const warn = tokens['--j-warn']
  const info = tokens['--j-info'] || primary
  return {
    ...tokens,
    '--j-bg': tokens['--j-surface'],
    '--j-bg-elevated': tokens['--j-surface-2'],
    '--j-fg': tokens['--j-text'],
    '--j-fg-muted': tokens['--j-muted'],
    '--j-accent': primary,
    '--j-accent-hover': leaf,
    '--j-deep': tokens['--j-text'],
    '--j-success': primary,
    '--j-bright': tokens['--j-bright'] || leaf,
    '--j-lime': tokens['--j-lime'] || leaf,
    '--j-info': info,
    '--j-error': danger,
    '--j-warning': warn,
    '--j-focus': tokens['--j-focus'] || `0 0 0 3px color-mix(in srgb, ${primary} 28%, transparent)`,
    '--j-ring': tokens['--j-focus'] || `0 0 0 3px color-mix(in srgb, ${primary} 28%, transparent)`,
  }
}

export function applyThemeTokens(light, dark) {
  if (typeof document === 'undefined') return
  let el = document.getElementById(STYLE_ID)
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  el.textContent = [
    cssBlock(':root', withSemanticAliases(light)),
    cssBlock("[data-j-theme='dark']", withSemanticAliases(dark)),
  ].join('\n')
}

export function presetById(id) {
  return allThemes().find((item) => item.id === id) || themePresets[0]
}

export function restoreThemeEditorFromStorage() {
  const stored = readThemeEditorState()
  if (!stored) return null
  applyThemeTokens(stored.light, stored.dark)
  return stored
}
