export const tokenGroups = [
  {
    id: 'brand',
    title: 'Brand colors',
    blurb: 'Canopy greens that define Jacaré. Override these first when rebranding.',
    layout: 'swatches',
    items: [
      { name: '--j-deep', kind: 'color', role: 'Deepest ink' },
      { name: '--j-forest', kind: 'color', role: 'Headings / forest' },
      { name: '--j-primary', kind: 'color', role: 'Primary action' },
      { name: '--j-leaf', kind: 'color', role: 'Hover / leaf' },
      { name: '--j-bright', kind: 'color', role: 'Bright accent' },
      { name: '--j-lime', kind: 'color', role: 'Highlight lime' },
      { name: '--j-mint', kind: 'color', role: 'Soft wash' },
    ],
  },
  {
    id: 'surfaces',
    title: 'Surfaces and text',
    blurb: 'Canvas, elevated panels, borders, and readable copy.',
    layout: 'swatches',
    items: [
      { name: '--j-surface', kind: 'color', role: 'Page canvas' },
      { name: '--j-surface-2', kind: 'color', role: 'Elevated panel' },
      { name: '--j-border', kind: 'color', role: 'Hairline border' },
      { name: '--j-text', kind: 'color', role: 'Body text' },
      { name: '--j-muted', kind: 'color', role: 'Secondary text' },
    ],
  },
  {
    id: 'status',
    title: 'Status colors',
    blurb: 'Feedback tones shared by Alert, Field errors, and badges.',
    layout: 'swatches',
    items: [
      { name: '--j-danger', kind: 'color', role: 'Danger' },
      { name: '--j-warn', kind: 'color', role: 'Warning' },
      { name: '--j-info', kind: 'color', role: 'Info' },
      { name: '--j-success', kind: 'color', role: 'Success' },
    ],
  },
  {
    id: 'semantic',
    title: 'Semantic aliases',
    blurb: 'Role tokens that map to brand colors so components stay brand-agnostic.',
    layout: 'swatches',
    items: [
      { name: '--j-bg', kind: 'color', role: '→ --j-surface' },
      { name: '--j-bg-elevated', kind: 'color', role: '→ --j-surface-2' },
      { name: '--j-fg', kind: 'color', role: '→ --j-text' },
      { name: '--j-fg-muted', kind: 'color', role: '→ --j-muted' },
      { name: '--j-accent', kind: 'color', role: '→ --j-primary' },
      { name: '--j-accent-hover', kind: 'color', role: '→ --j-leaf' },
      { name: '--j-ring', kind: 'focus', role: '→ --j-focus' },
      { name: '--j-error', kind: 'color', role: '→ --j-danger' },
      { name: '--j-warning', kind: 'color', role: '→ --j-warn' },
    ],
  },
  {
    id: 'shape',
    title: 'Radius, shadow, focus',
    blurb: 'Corner roundness, elevation, and keyboard focus rings.',
    layout: 'shape',
    items: [
      { name: '--j-radius', kind: 'radius', role: 'Default radius' },
      { name: '--j-radius-sm', kind: 'radius', role: 'Compact radius' },
      { name: '--j-radius-pill', kind: 'radius', role: 'Pill' },
      { name: '--j-shadow', kind: 'shadow', role: 'Raised panel' },
      { name: '--j-shadow-sm', kind: 'shadow', role: 'Soft lift' },
      { name: '--j-focus', kind: 'focus', role: 'Focus ring' },
    ],
  },
  {
    id: 'space',
    title: 'Space scale',
    blurb: 'Spacing steps used by Stack, Flex, Form, and component padding.',
    layout: 'space',
    items: [
      { name: '--j-space-1', kind: 'space', role: '2xs' },
      { name: '--j-space-2', kind: 'space', role: 'xs' },
      { name: '--j-space-3', kind: 'space', role: 'sm' },
      { name: '--j-space-4', kind: 'space', role: 'md' },
      { name: '--j-space-5', kind: 'space', role: 'lg' },
      { name: '--j-space-6', kind: 'space', role: 'xl' },
    ],
  },
  {
    id: 'controls',
    title: 'Control sizing',
    blurb: 'Density-aware height, padding, touch targets, breakpoints, and safe-area insets.',
    layout: 'space',
    items: [
      { name: '--j-density', kind: 'space', role: 'Density multiplier' },
      { name: '--j-control-height', kind: 'space', role: 'Control min-height' },
      { name: '--j-control-padding-x', kind: 'space', role: 'Control padding X' },
      { name: '--j-control-padding-y', kind: 'space', role: 'Control padding Y' },
      { name: '--j-touch-target', kind: 'space', role: 'Touch target (44px)' },
      { name: '--j-touch-target-sm', kind: 'space', role: 'Touch target sm' },
      { name: '--j-bp-sm', kind: 'space', role: 'Breakpoint sm (640px)' },
      { name: '--j-bp-md', kind: 'space', role: 'Breakpoint md (768px)' },
      { name: '--j-safe-top', kind: 'space', role: 'Safe area top' },
      { name: '--j-safe-right', kind: 'space', role: 'Safe area right' },
      { name: '--j-safe-bottom', kind: 'space', role: 'Safe area bottom' },
      { name: '--j-safe-left', kind: 'space', role: 'Safe area left' },
    ],
  },
  {
    id: 'motion',
    title: 'Motion and type',
    blurb: 'Durations, easing, and font stacks. Respects prefers-reduced-motion.',
    layout: 'motion',
    items: [
      { name: '--j-duration-fast', kind: 'motion', role: 'Fast' },
      { name: '--j-duration-normal', kind: 'motion', role: 'Normal' },
      { name: '--j-duration-slow', kind: 'motion', role: 'Slow' },
      { name: '--j-ease-out', kind: 'motion', role: 'Ease out' },
      { name: '--j-ease-in-out', kind: 'motion', role: 'Ease in-out' },
      { name: '--j-font', kind: 'font', role: 'UI sans' },
      { name: '--j-font-mono', kind: 'font', role: 'Mono' },
    ],
  },
]

export function readToken(name) {
  if (typeof getComputedStyle !== 'function') return ''
  return getComputedStyle(globalThis.document.documentElement).getPropertyValue(name).trim()
}

export function matchesQuery(item, raw) {
  const q = String(raw || '').trim().toLowerCase()
  if (!q) return true
  return `${item.name} ${item.kind} ${item.role || ''}`.toLowerCase().includes(q)
}

export function filterItems(items, raw) {
  return items.filter((item) => matchesQuery(item, raw))
}

export function filterGroups(groups, raw) {
  return groups
    .map((group) => ({ ...group, items: filterItems(group.items, raw) }))
    .filter((group) => group.items.length > 0)
}

export function swatchStyle(item) {
  const name = item.name
  if (item.kind === 'radius') {
    return `--docs-token-fill:var(--j-primary);border-radius:var(${name})`
  }
  if (item.kind === 'shadow') {
    return `--docs-token-fill:var(--j-surface-2);box-shadow:var(${name})`
  }
  if (item.kind === 'focus') {
    return `--docs-token-fill:var(--j-surface-2);box-shadow:var(${name})`
  }
  if (item.kind === 'space') {
    return `--docs-token-space:var(${name})`
  }
  if (item.kind === 'motion') {
    if (item.name === '--j-ease-out') {
      return '--docs-token-motion:var(--j-duration-normal);--docs-token-ease:var(--j-ease-out)'
    }
    return `--docs-token-motion:var(${name});--docs-token-ease:var(--j-ease-out)`
  }
  if (item.kind === 'font') {
    return `--docs-token-font:var(${name})`
  }
  return `--docs-token-fill:var(${name})`
}

export async function copyToken(name) {
  try {
    await navigator.clipboard.writeText(name)
    return true
  } catch {
    return false
  }
}
