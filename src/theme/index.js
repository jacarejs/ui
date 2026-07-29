const STORAGE_KEY = 'j-theme'
const DENSITY_KEY = 'j-density'
const MOTION_KEY = 'j-motion'

export function getSystemTheme() {
  if (typeof matchMedia !== 'function') return 'light'
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function resolveTheme(mode = 'system') {
  if (mode === 'light' || mode === 'dark') return mode
  return getSystemTheme()
}

export function applyTheme(mode = 'system', target = typeof document !== 'undefined' ? document.documentElement : null) {
  if (!target) return resolveTheme(mode)
  const resolved = resolveTheme(mode)
  target.dataset.jTheme = resolved
  if (typeof localStorage !== 'undefined' && (mode === 'light' || mode === 'dark' || mode === 'system')) {
    localStorage.setItem(STORAGE_KEY, mode)
  }
  return resolved
}

export function readStoredTheme(fallback = 'system') {
  if (typeof localStorage === 'undefined') return fallback
  const value = localStorage.getItem(STORAGE_KEY)
  if (value === 'light' || value === 'dark' || value === 'system') return value
  return fallback
}

export function watchSystemTheme(onChange) {
  if (typeof matchMedia !== 'function') return () => {}
  const media = matchMedia('(prefers-color-scheme: dark)')
  const handler = () => onChange(getSystemTheme())
  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }
  media.addListener(handler)
  return () => media.removeListener(handler)
}

export function themeBootScript() {
  return `(function(){try{var k='${STORAGE_KEY}';var s=localStorage.getItem(k);var d=matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:d?'dark':'light';document.documentElement.dataset.jTheme=t}catch(e){}})();`
}

export const themes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
}

export const densities = {
  compact: 'compact',
  comfortable: 'comfortable',
  spacious: 'spacious',
}

export function resolveDensity(mode = 'comfortable') {
  if (mode === 'compact' || mode === 'spacious' || mode === 'comfortable') return mode
  return 'comfortable'
}

export function applyDensity(mode = 'comfortable', target = typeof document !== 'undefined' ? document.documentElement : null) {
  const resolved = resolveDensity(mode)
  if (!target) return resolved
  target.dataset.jDensity = resolved
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(DENSITY_KEY, resolved)
  }
  return resolved
}

export function readStoredDensity(fallback = 'comfortable') {
  if (typeof localStorage === 'undefined') return resolveDensity(fallback)
  return resolveDensity(localStorage.getItem(DENSITY_KEY) || fallback)
}

export const motionModes = {
  system: 'system',
  full: 'full',
  reduce: 'reduce',
}

export function resolveMotion(mode = 'system') {
  if (mode === 'full' || mode === 'reduce' || mode === 'system') return mode
  return 'system'
}

export function applyMotion(mode = 'system', target = typeof document !== 'undefined' ? document.documentElement : null) {
  const resolved = resolveMotion(mode)
  if (!target) return resolved
  if (resolved === 'system') delete target.dataset.jMotion
  else target.dataset.jMotion = resolved
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(MOTION_KEY, resolved)
  }
  return resolved
}

export function readStoredMotion(fallback = 'system') {
  if (typeof localStorage === 'undefined') return resolveMotion(fallback)
  return resolveMotion(localStorage.getItem(MOTION_KEY) || fallback)
}
