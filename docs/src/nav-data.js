export function componentHref(name) {
  return `/components/${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
}

export const docsSiteUrl = 'https://jacarejs.github.io/ui/'


export const shippedComponents = [
  { name: 'Alert', group: 'Feedback', blurb: 'Inline status for info, success, warn, danger' },
  { name: 'Avatar', group: 'Data display', blurb: 'Initials or image for people and entities' },
  { name: 'Badge', group: 'Data display', blurb: 'Compact tone pills for status and tags' },
  { name: 'Button', group: 'Actions', blurb: 'Variants, sizes, loading, and press events' },
  { name: 'Card', group: 'Data display', blurb: 'Elevated surface for grouped content' },
  { name: 'Checkbox', group: 'Forms', blurb: 'Boolean choice with pulse binding' },
  { name: 'ColorPicker', group: 'Forms', blurb: 'Hex + swatch color field for tokens' },
  { name: 'Divider', group: 'Layout', blurb: 'Quiet separator between sections' },
  { name: 'Field', group: 'Forms', blurb: 'Labeled input with hint and error' },
  { name: 'Progress', group: 'Feedback', blurb: 'Determinate 0–100 completion bar' },
  { name: 'Spinner', group: 'Feedback', blurb: 'Indeterminate loading indicator' },
  { name: 'Stack', group: 'Layout', blurb: 'Flex gap layout for rows and columns' },
  { name: 'Switch', group: 'Forms', blurb: 'Immediate on/off toggle control' },
  { name: 'Text', group: 'Data display', blurb: 'On-token typography primitive' },
  { name: 'ThemeScope', group: 'Foundations', blurb: 'Scoped light/dark theme island' },
  { name: 'ThemeToggle', group: 'Foundations', blurb: 'Light, dark, or system control' },
  { name: 'VisuallyHidden', group: 'Foundations', blurb: 'Hide visually, keep for AT' },
]

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
      { href: '/accessibility', label: 'Accessibility', blurb: 'Focus, keyboard, ARIA baseline' },
    ],
  },
  {
    title: 'Components',
    items: [
      { href: '/components', label: 'Overview', blurb: 'Catalog of shipped primitives' },
      ...shippedComponents
        .filter((c) => !['ThemeScope', 'ThemeToggle', 'VisuallyHidden'].includes(c.name))
        .map((c) => ({
          href: componentHref(c.name),
          label: c.name,
          blurb: c.blurb,
        })),
    ],
  },
  {
    title: 'Tools',
    items: [
      { href: '/theme-editor', label: 'Theme Editor', blurb: 'Tune tokens and export CSS' },
      { href: '/playground', label: 'Playground', blurb: 'Local Vite sandbox for experiments' },
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
