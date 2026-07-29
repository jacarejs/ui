export const motionDefaults = {
  fast: 120,
  normal: 200,
  slow: 320,
}

export const easePresets = [
  {
    id: 'out',
    label: 'Ease out',
    value: 'cubic-bezier(0.16, 1, 0.3, 1)',
    token: '--j-ease-out',
  },
  {
    id: 'in-out',
    label: 'Ease in-out',
    value: 'cubic-bezier(0.65, 0, 0.35, 1)',
    token: '--j-ease-in-out',
  },
  {
    id: 'linear',
    label: 'Linear',
    value: 'linear',
    token: null,
  },
]

export const motionModes = [
  { id: 'system', label: 'System', blurb: 'Honor prefers-reduced-motion' },
  { id: 'full', label: 'Full motion', blurb: 'Force animated durations' },
  { id: 'reduce', label: 'Reduce', blurb: 'Zero durations in this stage' },
]

export function motionExportCss({ fast, normal, slow, ease, mode = 'system' }) {
  return `import { applyMotion } from '@jacare/ui/theme'

applyMotion('${mode}')

/* Matching CSS tokens */
:root {
  --j-duration-fast: ${fast}ms;
  --j-duration-normal: ${normal}ms;
  --j-duration-slow: ${slow}ms;
  --j-ease-out: ${ease};
}

@media (prefers-reduced-motion: reduce) {
  :root:not([data-j-motion='full']) {
    --j-duration-fast: 0ms;
    --j-duration-normal: 0ms;
    --j-duration-slow: 0ms;
  }
}`
}
