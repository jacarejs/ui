import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, copyFileSync, cpSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compile } from '@jacare/compiler'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'src')
const componentsDir = join(srcDir, 'components')
const distDir = join(root, 'dist')

const COMPONENT_NAMES = readdirSync(componentsDir)
  .filter((name) => name.endsWith('.jcr'))
  .map((name) => basename(name, '.jcr'))
  .sort()

rmSync(distDir, { recursive: true, force: true })
mkdirSync(distDir, { recursive: true })
mkdirSync(join(distDir, 'internal'), { recursive: true })
mkdirSync(join(distDir, 'theme'), { recursive: true })
mkdirSync(join(distDir, 'i18n'), { recursive: true })

copyFileSync(join(srcDir, 'theme', 'index.css'), join(distDir, 'theme.css'))
cpSync(join(srcDir, 'theme'), join(distDir, 'theme'), { recursive: true })
cpSync(join(srcDir, 'i18n'), join(distDir, 'i18n'), { recursive: true })
copyFileSync(join(srcDir, 'internal', 'utils.js'), join(distDir, 'internal', 'utils.js'))
writeFileSync(join(distDir, 'internal', 'utils.d.ts'), utilsDts())
writeFileSync(join(distDir, 'theme', 'index.d.ts'), themeDts())
writeFileSync(join(distDir, 'i18n', 'index.d.ts'), i18nDts())

// Flatten published theme.css so consumers do not need nested @imports
writeFileSync(
  join(distDir, 'theme.css'),
  [
    readFileSync(join(srcDir, 'theme', 'tokens.css'), 'utf8'),
    readFileSync(join(srcDir, 'theme', 'tokens.dark.css'), 'utf8'),
    readFileSync(join(srcDir, 'theme', 'semantic.css'), 'utf8'),
    readFileSync(join(srcDir, 'theme', 'index.css'), 'utf8')
      .split('\n')
      .filter((line) => !line.startsWith('@import'))
      .join('\n'),
  ].join('\n'),
)

for (const name of COMPONENT_NAMES) {
  const filename = join(componentsDir, `${name}.jcr`)
  const source = readFileSync(filename, 'utf8')
  const result = compile(source, {
    filename,
    mode: 'full',
    cpw: true,
    debug: false,
  })

  let code = result.code.replaceAll("from '../theme/index.js'", "from './theme/index.js'")
  code = code.replaceAll("from '../i18n/index.js'", "from './i18n/index.js'")
  code = code.replace(/from ['"]\.\/([A-Za-z0-9]+)\.jcr['"]/g, "from './$1.js'")
  writeFileSync(join(distDir, `${name}.js`), code)
  if (result.map) {
    writeFileSync(join(distDir, `${name}.js.map`), JSON.stringify(result.map))
  }
  writeFileSync(join(distDir, `${name}.d.ts`), componentDts(name, result.contract, result.props))
  console.log(`compiled ${name}`)
}

writeFileSync(join(distDir, 'index.js'), barrelJs(COMPONENT_NAMES))
writeFileSync(join(distDir, 'index.d.ts'), barrelDts(COMPONENT_NAMES))
writeFileSync(join(distDir, 'components.json'), JSON.stringify({ components: COMPONENT_NAMES }, null, 2) + '\n')

console.log(`built ${COMPONENT_NAMES.length} components → dist/`)

function barrelJs(names) {
  const lines = names.map((name) => `export { default as ${name} } from './${name}.js'`)
  lines.push(`export * from './internal/utils.js'`)
  lines.push(`export * from './theme/index.js'`)
  lines.push(`export * from './i18n/index.js'`)
  return lines.join('\n') + '\n'
}

function barrelDts(names) {
  const lines = names.map((name) => `export { default as ${name} } from './${name}.js'`)
  lines.push(`export * from './internal/utils.js'`)
  lines.push(`export * from './theme/index.js'`)
  lines.push(`export * from './i18n/index.js'`)
  return lines.join('\n') + '\n'
}

function utilsDts() {
  return `export function read<T>(value: T | (() => T)): T
export function cx(...parts: Array<string | false | null | undefined>): string
export function coalesce<T>(...values: Array<T | null | undefined>): T | undefined
`
}

function themeDts() {
  return `export function getSystemTheme(): 'light' | 'dark'
export function resolveTheme(mode?: 'light' | 'dark' | 'system'): 'light' | 'dark'
export function applyTheme(mode?: 'light' | 'dark' | 'system', target?: HTMLElement | null): 'light' | 'dark'
export function readStoredTheme(fallback?: 'light' | 'dark' | 'system'): 'light' | 'dark' | 'system'
export function watchSystemTheme(onChange: (theme: 'light' | 'dark') => void): () => void
export function themeBootScript(): string
export const themes: { light: 'light'; dark: 'dark'; system: 'system' }
export const densities: { compact: 'compact'; comfortable: 'comfortable'; spacious: 'spacious' }
export function resolveDensity(mode?: 'compact' | 'comfortable' | 'spacious'): 'compact' | 'comfortable' | 'spacious'
export function applyDensity(mode?: 'compact' | 'comfortable' | 'spacious', target?: HTMLElement | null): 'compact' | 'comfortable' | 'spacious'
export function readStoredDensity(fallback?: 'compact' | 'comfortable' | 'spacious'): 'compact' | 'comfortable' | 'spacious'
export const motionModes: { system: 'system'; full: 'full'; reduce: 'reduce' }
export function resolveMotion(mode?: 'system' | 'full' | 'reduce'): 'system' | 'full' | 'reduce'
export function applyMotion(mode?: 'system' | 'full' | 'reduce', target?: HTMLElement | null): 'system' | 'full' | 'reduce'
export function readStoredMotion(fallback?: 'system' | 'full' | 'reduce'): 'system' | 'full' | 'reduce'
`
}

function i18nDts() {
  return `export const LOCALE_STORAGE_KEY: 'j-locale'
export type I18nMessages = Record<string, Record<string, unknown>>
export type I18nParams = Record<string, string | number | boolean | null | undefined>
export interface I18nInstance {
  t(key: string, params?: I18nParams): string
  te(key: string): boolean
  locale: { (): string; set(value: string): void }
  setLocale(locale: string): string
  addMessages(locale: string, messages: Record<string, unknown>): Record<string, unknown>
  availableLocales(): string[]
  messages: I18nMessages
  fallbackLocale: string
}
export interface CreateI18nOptions {
  locale?: string
  fallbackLocale?: string
  messages?: I18nMessages
  persist?: boolean
}
export function readStoredLocale(fallback?: string): string
export function writeStoredLocale(locale: string): void
export function localeBootScript(storageKey?: string): string
export function createI18n(options?: CreateI18nOptions): I18nInstance
export function resetI18n(): void
export function useI18n(): I18nInstance
export function getI18n(): I18nInstance | null
export function t(key: string, params?: I18nParams): string
export function te(key: string): boolean
export function locale(): string
export function setLocale(locale: string): string
export function addMessages(locale: string, messages: Record<string, unknown>): Record<string, unknown> | null
export function availableLocales(): string[]
`
}

function componentDts(name, contract, props) {
  const propLines = []
  const propDefs = contract?.props ?? {}
  const pulses = contract?.pulses ?? {}
  const emits = contract?.emits ?? {}
  const slots = contract?.slots ?? []

  for (const key of Object.keys(propDefs).sort()) {
    const def = propDefs[key]
    const optional = !def.required
    const ts = contractType(def.type)
    propLines.push(`  ${key}${optional ? '?' : ''}: ${ts} | (() => ${ts})`)
  }

  for (const key of Object.keys(pulses).sort()) {
    const ts = contractType(pulses[key])
    propLines.push(`  ${key}: { (): ${ts}; set(value: ${ts}): void; update(fn: (value: ${ts}) => ${ts}): void }`)
  }

  if (slots.includes('default') || props?.includes('children')) {
    propLines.push(`  children?: (target: HTMLElement) => (() => void) | void`)
  }

  for (const key of Object.keys(emits).sort()) {
    propLines.push(`  ${key}?: (...payload: unknown[]) => void`)
  }

  return `export interface ${name}Props {
${propLines.join('\n') || '  [key: string]: unknown'}
}

export function mount(target: HTMLElement, props?: ${name}Props): () => void
export function render(props?: ${name}Props): string
export function resume(target: HTMLElement, state: unknown, props?: ${name}Props): () => void
declare const _default: typeof mount
export default _default
`
}

function contractType(type) {
  switch (type) {
    case 'string':
      return 'string'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'object':
      return 'Record<string, unknown>'
    default:
      return 'unknown'
  }
}
