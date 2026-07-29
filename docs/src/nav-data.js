export function componentHref(name) {
  return `/components/${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
}

export const docsSiteUrl = 'https://jacarejs.github.io/ui/'
export const uiRepoUrl = 'https://github.com/jacarejs/ui'
export const coreRepoUrl = 'https://github.com/jacarejs/core'

export const componentGroupOrder = [
  'Actions',
  'Forms',
  'Data display',
  'Feedback',
  'Overlay',
  'Layout',
  'Primitives',
]

const navHiddenComponents = ['ThemeScope', 'ThemeToggle', 'VisuallyHidden', 'FormItem']
const catalogHiddenComponents = ['ThemeScope', 'ThemeToggle', 'VisuallyHidden']

export const shippedComponents = [
  { name: 'Alert', group: 'Feedback', blurb: 'Inline status for info, success, warn, danger' },
  { name: 'Autocomplete', group: 'Forms', blurb: 'Text field with filtered suggestions' },
  { name: 'Avatar', group: 'Data display', blurb: 'Initials or image for people and entities' },
  { name: 'Badge', group: 'Data display', blurb: 'Compact tone pills for status and tags' },
  { name: 'Button', group: 'Actions', blurb: 'Variants, sizes, loading, and press events' },
  { name: 'Card', group: 'Data display', blurb: 'Elevated surface for grouped content' },
  { name: 'Cascader', group: 'Forms', blurb: 'Multi-level path picker for nested options' },
  { name: 'Checkbox', group: 'Forms', blurb: 'Boolean choice with pulse binding' },
  { name: 'ColorPicker', group: 'Forms', blurb: 'Hex + swatch color field for tokens' },
  { name: 'ColorPickerPanel', group: 'Forms', blurb: 'Standalone color panel with presets' },
  { name: 'Confirm', group: 'Overlay', blurb: 'Modal confirmation with danger and busy states' },
  { name: 'DatePicker', group: 'Forms', blurb: 'Typed or calendar date and range picker' },
  { name: 'DatePickerPanel', group: 'Forms', blurb: 'Inline calendar surface without the field chrome' },
  { name: 'DateTimePicker', group: 'Forms', blurb: 'Combined date and time value in one control' },
  { name: 'Dialog', group: 'Overlay', blurb: 'General modal with title, body, and footer actions' },
  { name: 'Divider', group: 'Layout', blurb: 'Quiet separator between sections' },
  { name: 'Field', group: 'Forms', blurb: 'Labeled input with hint and error' },
  { name: 'Flex', group: 'Layout', blurb: 'Full flexbox positioning with token gaps' },
  { name: 'Form', group: 'Forms', blurb: 'Form layout wrapper with label position and gap' },
  { name: 'FormItem', group: 'Forms', blurb: 'Labeled form row used inside Form' },
  { name: 'Grid', group: 'Layout', blurb: 'CSS grid tracks for page positioning' },
  { name: 'Icon', group: 'Primitives', blurb: 'Stroke glyphs with sizes, tones, and labels' },
  { name: 'Input', group: 'Forms', blurb: 'Text field with clear, sizes, and affix slots' },
  { name: 'InputNumber', group: 'Forms', blurb: 'Numeric stepper with min, max, and step' },
  { name: 'InputOtp', group: 'Forms', blurb: 'One-time code boxes with paste support' },
  { name: 'InputTag', group: 'Forms', blurb: 'Tag chips collected from keyboard input' },
  { name: 'Mention', group: 'Forms', blurb: 'Textarea that suggests people after @' },
  { name: 'Progress', group: 'Feedback', blurb: 'Determinate 0–100 completion bar' },
  { name: 'Radio', group: 'Forms', blurb: 'Single radio option with shared model binding' },
  { name: 'RadioGroup', group: 'Forms', blurb: 'Single choice list or selectable cards' },
  { name: 'Rate', group: 'Forms', blurb: 'Star rating with optional half values' },
  { name: 'Select', group: 'Forms', blurb: 'Searchable single or multi select dropdown' },
  { name: 'SelectV2', group: 'Forms', blurb: 'Virtualized select for very large option lists' },
  { name: 'Slider', group: 'Forms', blurb: 'Continuous or range value on a track' },
  { name: 'Spinner', group: 'Feedback', blurb: 'Indeterminate loading indicator' },
  { name: 'Stack', group: 'Layout', blurb: 'Simple flex gap layout for rows and columns' },
  { name: 'Switch', group: 'Forms', blurb: 'Immediate on/off toggle control' },
  { name: 'Text', group: 'Data display', blurb: 'On-token typography primitive' },
  { name: 'Textarea', group: 'Forms', blurb: 'Multiline field with count and resize' },
  { name: 'ThemeScope', group: 'Primitives', blurb: 'Scoped light/dark theme island' },
  { name: 'ThemeToggle', group: 'Primitives', blurb: 'Light, dark, or system control' },
  { name: 'TimePicker', group: 'Forms', blurb: 'Hour, minute, and optional second spinner' },
  { name: 'TimeSelect', group: 'Forms', blurb: 'Discrete time options from a step list' },
  { name: 'Transfer', group: 'Forms', blurb: 'Move items between source and target lists' },
  { name: 'TreeSelect', group: 'Forms', blurb: 'Select a node from an expandable tree' },
  { name: 'Upload', group: 'Forms', blurb: 'File picker with list or picture layout' },
  { name: 'VisuallyHidden', group: 'Primitives', blurb: 'Hide visually, keep for AT' },
]

export function componentsByGroup(hiddenNames = catalogHiddenComponents) {
  const hide = new Set(hiddenNames)
  const buckets = new Map()
  for (const item of shippedComponents) {
    if (hide.has(item.name)) continue
    const list = buckets.get(item.group) || []
    list.push(item)
    buckets.set(item.group, list)
  }
  return componentGroupOrder
    .filter((group) => (buckets.get(group) || []).length > 0)
    .map((group) => ({
      title: group,
      items: (buckets.get(group) || []).slice().sort((a, b) => a.name.localeCompare(b.name)),
    }))
}

function componentNavSections() {
  return componentsByGroup(navHiddenComponents).map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({
      href: componentHref(item.name),
      label: item.name,
      blurb: item.blurb,
    })),
  }))
}

export const docsNav = [
  {
    title: 'Getting started',
    items: [
      { href: '/', label: 'Introduction', blurb: 'What @jacare/ui is and why it exists' },
      { href: '/install', label: 'Installation', blurb: 'Packages, Vite plugin, and theme.css' },
      { href: '/quick-start', label: 'Quick start', blurb: 'Install, configure, and render a Button' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { href: '/theme', label: 'Theme', blurb: 'Tokens, overrides, applyTheme' },
      { href: '/dark-mode', label: 'Dark mode', blurb: 'ThemeToggle, ThemeScope, data-j-theme' },
      { href: '/tokens', label: 'Token reference', blurb: 'Brand, semantic, space, and motion' },
      { href: '/layouts', label: 'Layouts', blurb: 'Shell, sidebar, split, and gallery models' },
      { href: '/accessibility', label: 'Accessibility', blurb: 'Focus, keyboard, ARIA baseline' },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/components', label: 'Overview', blurb: 'Catalog of shipped primitives by category' },
    ],
  },
  ...componentNavSections(),
  {
    title: 'Tools',
    items: [
      { href: '/theme-editor', label: 'Theme Editor', blurb: 'Tune tokens and export CSS' },
      { href: '/changelog', label: 'Changelog', blurb: 'What changed between releases' },
    ],
  },
]

export function flatNavLinks() {
  return docsNav.flatMap((section) => section.items)
}

export function previousNext(href) {
  const links = flatNavLinks()
  const index = links.findIndex((item) => item.href === href)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: index > 0 ? links[index - 1] : null,
    next: index < links.length - 1 ? links[index + 1] : null,
  }
}
