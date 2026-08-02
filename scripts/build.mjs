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
mkdirSync(join(distDir, 'validation'), { recursive: true })
mkdirSync(join(distDir, 'feedback'), { recursive: true })

copyFileSync(join(srcDir, 'theme', 'index.css'), join(distDir, 'theme.css'))
cpSync(join(srcDir, 'theme'), join(distDir, 'theme'), { recursive: true })
cpSync(join(srcDir, 'i18n'), join(distDir, 'i18n'), { recursive: true })
cpSync(join(srcDir, 'validation'), join(distDir, 'validation'), { recursive: true })
cpSync(join(srcDir, 'feedback'), join(distDir, 'feedback'), { recursive: true })
copyFileSync(join(srcDir, 'internal', 'utils.js'), join(distDir, 'internal', 'utils.js'))
copyFileSync(join(srcDir, 'internal', 'overlay.js'), join(distDir, 'internal', 'overlay.js'))
copyFileSync(join(srcDir, 'internal', 'mask.js'), join(distDir, 'internal', 'mask.js'))
copyFileSync(join(srcDir, 'internal', 'qrcode.js'), join(distDir, 'internal', 'qrcode.js'))
copyFileSync(join(srcDir, 'internal', 'empty-image.js'), join(distDir, 'internal', 'empty-image.js'))
copyFileSync(join(srcDir, 'internal', 'highlight.js'), join(distDir, 'internal', 'highlight.js'))
if (readdirSync(join(srcDir, 'internal')).includes('charts.js')) {
  copyFileSync(join(srcDir, 'internal', 'charts.js'), join(distDir, 'internal', 'charts.js'))
}
writeFileSync(join(distDir, 'internal', 'utils.d.ts'), utilsDts())
writeFileSync(join(distDir, 'internal', 'overlay.d.ts'), overlayDts())
writeFileSync(join(distDir, 'internal', 'mask.d.ts'), maskDts())
writeFileSync(join(distDir, 'internal', 'qrcode.d.ts'), qrcodeDts())
writeFileSync(join(distDir, 'internal', 'empty-image.d.ts'), emptyImageDts())
writeFileSync(join(distDir, 'internal', 'highlight.d.ts'), highlightDts())
writeFileSync(join(distDir, 'theme', 'index.d.ts'), themeDts())
writeFileSync(join(distDir, 'i18n', 'index.d.ts'), i18nDts())
writeFileSync(join(distDir, 'validation', 'index.d.ts'), validationDts())
writeFileSync(join(distDir, 'feedback', 'index.d.ts'), feedbackDts())

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
  code = code.replaceAll("from '../i18n/locales/", "from './i18n/locales/")
  code = code.replaceAll("from '../validation/index.js'", "from './validation/index.js'")
  code = code.replaceAll("from '../internal/utils.js'", "from './internal/utils.js'")
  code = code.replaceAll("from '../internal/overlay.js'", "from './internal/overlay.js'")
  code = code.replaceAll("from '../internal/mask.js'", "from './internal/mask.js'")
  code = code.replaceAll("from '../internal/qrcode.js'", "from './internal/qrcode.js'")
  code = code.replaceAll("from '../internal/empty-image.js'", "from './internal/empty-image.js'")
  code = code.replaceAll("from '../internal/highlight.js'", "from './internal/highlight.js'")
  code = code.replaceAll("from '../internal/charts.js'", "from './internal/charts.js'")
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
  lines.push(`export * from './internal/mask.js'`)
  lines.push(`export * from './theme/index.js'`)
  lines.push(`export * from './i18n/index.js'`)
  lines.push(`export * from './validation/index.js'`)
  lines.push(`export * from './feedback/index.js'`)
  return lines.join('\n') + '\n'
}

function barrelDts(names) {
  const lines = names.map((name) => `export { default as ${name} } from './${name}.js'`)
  lines.push(`export * from './internal/utils.js'`)
  lines.push(`export * from './internal/mask.js'`)
  lines.push(`export * from './theme/index.js'`)
  lines.push(`export * from './i18n/index.js'`)
  lines.push(`export * from './validation/index.js'`)
  lines.push(`export * from './feedback/index.js'`)
  return lines.join('\n') + '\n'
}

function feedbackDts() {
  return `export type MessageType = 'primary' | 'success' | 'warning' | 'info' | 'error'
export type MessagePlacement = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface MessageOptions {
  message?: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  plain?: boolean
  placement?: MessagePlacement
  onClose?: () => void
}

export interface NotificationOptions {
  title?: string
  message?: string
  type?: MessageType | ''
  duration?: number
  position?: NotificationPosition
  showClose?: boolean
  offset?: number
  onClose?: () => void
  onClick?: () => void
}

export interface MessageBoxOptions {
  confirmButtonText?: string
  cancelButtonText?: string
  type?: MessageType | ''
  inputPlaceholder?: string
  inputValue?: string
  closeOnClickModal?: boolean
  showCancelButton?: boolean
}

export interface LoadingOptions {
  text?: string
  background?: string
  lock?: boolean
  target?: string | HTMLElement
}

export interface FeedbackHandle {
  close(): void
}

export interface MessageApi {
  (options?: string | MessageOptions): FeedbackHandle
  success(options?: string | MessageOptions): FeedbackHandle
  warning(options?: string | MessageOptions): FeedbackHandle
  info(options?: string | MessageOptions): FeedbackHandle
  error(options?: string | MessageOptions): FeedbackHandle
  primary(options?: string | MessageOptions): FeedbackHandle
  closeAll(): void
}

export interface NotificationApi {
  (options?: NotificationOptions): FeedbackHandle
  success(options?: NotificationOptions): FeedbackHandle
  warning(options?: NotificationOptions): FeedbackHandle
  info(options?: NotificationOptions): FeedbackHandle
  error(options?: NotificationOptions): FeedbackHandle
  primary(options?: NotificationOptions): FeedbackHandle
  closeAll(): void
}

export interface MessageBoxApi {
  alert(message: string, title?: string | MessageBoxOptions, options?: MessageBoxOptions): Promise<'confirm'>
  confirm(message: string, title?: string | MessageBoxOptions, options?: MessageBoxOptions): Promise<'confirm'>
  prompt(message: string, title?: string | MessageBoxOptions, options?: MessageBoxOptions): Promise<{ value: string }>
}

export declare const Message: MessageApi
export declare const Notification: NotificationApi
export declare const MessageBox: MessageBoxApi
export declare function showLoading(options?: LoadingOptions): FeedbackHandle
export declare function closeLoading(): void
`
}

function validationDts() {
  return `export function asArray<T>(value: T | T[] | null | undefined): T[]
export function normalizeTrigger(value: unknown): string[]
export function getByPath(source: unknown, path: string): unknown
export function setByPath(source: unknown, path: string, next: unknown): void
export function validateRule(rule: Record<string, unknown>, value: unknown, model?: unknown): Promise<string | null>
export function validateRules(rules: unknown, value: unknown, model?: unknown, trigger?: string): Promise<string | null>
export function createForm(options?: {
  model?: Record<string, unknown>
  rules?: Record<string, unknown> | { (): Record<string, unknown>; set: (value: Record<string, unknown>) => void }
  errors?: { (): Record<string, string>; set: (value: Record<string, string>) => void }
}): {
  model: Record<string, unknown>
  rules: { (): Record<string, unknown>; set: (value: Record<string, unknown>) => void }
  errors: { (): Record<string, string>; set: (value: Record<string, string>) => void }
  validate: (callback?: (valid: boolean, fields?: Record<string, Array<{ message: string; field: string }>>) => void) => Promise<boolean>
  validateField: (props?: string | string[], triggerOrCallback?: string | Function, maybeCallback?: Function) => Promise<boolean>
  resetFields: (props?: string | string[]) => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  setInitialValues: (nextModel?: Record<string, unknown>) => void
  getFieldValue: (prop: string) => unknown
  setFieldValue: (prop: string, value: unknown) => void
  registerField: (prop: string, field: Record<string, unknown>) => () => void
}
`
}

function utilsDts() {
  return `export function read<T>(value: T | (() => T)): T
export function cx(...parts: Array<string | false | null | undefined>): string
export function coalesce<T>(...values: Array<T | null | undefined>): T | undefined
`
}

function overlayDts() {
  return `export function uniqueId(prefix: string, emitFn: Record<string, unknown>, key?: string): string
export function focusableElements(root: ParentNode | null | undefined): HTMLElement[]
export function trapFocus(root: HTMLElement | null | undefined, event: KeyboardEvent): void
export function activateFocusTrap(
  root: HTMLElement | null | undefined,
  options?: { onEscape?: (event: KeyboardEvent) => void },
): () => void
`
}

function qrcodeDts() {
  return `export function createQrMatrix(text: string, level?: string): {
  getModuleCount(): number
  isDark(row: number, col: number): boolean
}
export function paintQrCanvas(
  canvas: HTMLCanvasElement | null,
  text: string,
  options?: {
    size?: number
    level?: string
    margin?: number
    darkColor?: string
    lightColor?: string
  },
): string
`
}

function emptyImageDts() {
  return `export const EMPTY_IMAGE_TYPES: string[]
export function typeOfEmptyImage(value?: unknown): string
export function sizeOfEmptyImage(value?: unknown): number
export function buildEmptyImageMaskUrl(type?: unknown): string
export function buildEmptyImageSvg(options?: {
  type?: string
  size?: number
  color?: string
  background?: string
  halo?: boolean
}): string
export function buildEmptyImageDataUrl(options?: {
  type?: string
  size?: number
  color?: string
  background?: string
  halo?: boolean
}): string
export function downloadEmptyImage(dataUrl?: string, filename?: string): void
export function svgDataUrlToPng(
  dataUrl: string,
  size: number,
  callback: (pngUrl: string) => void,
): void
`
}

function highlightDts() {
  return `export function escapeHtml(value?: unknown): string
export function highlightCode(source?: unknown, language?: unknown): string
`
}

function maskDts() {
  return `export const MASK_PRESETS: Record<string, string>
export function resolveMask(mask?: string, preset?: string): string
export function isMaskToken(char: string): boolean
export function matchesMaskToken(char: string, token: string): boolean
export function extractMaskRaw(value: unknown, mask: string): string
export function applyMask(value: unknown, mask: string): string
export function unmaskValue(value: unknown, mask: string): string
export function moneyDigits(value: unknown): string
export function parseMoneyInput(value: unknown, precision?: number, allowNegative?: boolean): number
export function formatMoney(amount: unknown, options?: {
  locale?: string
  currency?: string
  precision?: number
  currencyDisplay?: string
}): string
export function formatMoneyFromDigits(digits: unknown, options?: {
  locale?: string
  currency?: string
  precision?: number
  allowNegative?: boolean
  currencyDisplay?: string
}): string
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
export type Translation = { (): string }
export interface I18nInstance {
  t(key: string, params?: I18nParams): Translation
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
  includeUiMessages?: boolean
}
export function readStoredLocale(fallback?: string): string
export function writeStoredLocale(locale: string): void
export function localeBootScript(storageKey?: string): string
export function createI18n(options?: CreateI18nOptions): I18nInstance
export function resetI18n(): void
export function useI18n(): I18nInstance
export function getI18n(): I18nInstance | null
export function t(key: string, params?: I18nParams): Translation
export function translate(key: string, params?: I18nParams): string
export function te(key: string): boolean
export function locale(): string
export function setLocale(locale: string): string
export function addMessages(locale: string, messages: Record<string, unknown>): Record<string, unknown> | null
export function availableLocales(): string[]
export function localeText(key: string, fallback?: string, params?: I18nParams): string
export function localeT(key: string, fallback?: string, params?: I18nParams): Translation
export function propText(prop: unknown, key: string, fallback?: string, params?: I18nParams): string
export const en: Record<string, unknown>
export const ptBR: Record<string, unknown>
export const uiMessages: I18nMessages
export function deepMergeMessages(base?: Record<string, unknown>, extra?: Record<string, unknown>): Record<string, unknown>
export function mergeUiMessages(appMessages?: I18nMessages, ui?: I18nMessages): I18nMessages
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
