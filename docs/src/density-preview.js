export const densityModes = [
  {
    id: 'compact',
    label: 'Compact',
    blurb: '0.84× controls — denser tables and toolbars',
    value: 0.84,
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    blurb: 'Default 1× control height and padding',
    value: 1,
  },
  {
    id: 'spacious',
    label: 'Spacious',
    blurb: '1.12× — roomier touch and marketing surfaces',
    value: 1.12,
  },
]

export function densityExportCss(mode = 'comfortable') {
  return `import { applyDensity } from '@jacare/ui/theme'

applyDensity('${mode}')

/* Or set the attribute on an island */
document.documentElement.dataset.jDensity = '${mode}'`
}
