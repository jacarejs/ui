const demoImage =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 160%22%3E%3Crect width=%22320%22 height=%22160%22 rx=%2216%22 fill=%22%23dcefe8%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23235548%22 font-size=%2224%22 font-family=%22Arial%22%3EJacare UI%3C/text%3E%3C/svg%3E'

export const basic = `import DataView from '@jacare/ui/DataView'

const data = [
  { key: '1', title: 'Design tokens', description: 'Color, spacing, and typography primitives.', meta: 'Docs' },
  { key: '2', title: 'Components', description: 'Accessible building blocks for product teams.', meta: 'UI' },
  { key: '3', title: 'Theme scope', description: 'Scoped light or dark islands inside one page.', meta: 'Theme' },
]

export <view>
  <DataView :data=\${data} />
</view>`

export const grid = `import { pulse } from '@jacare/core'
import DataView from '@jacare/ui/DataView'

const layout = pulse('grid')
const data = [
  { key: '1', title: 'Card layout', description: 'Grid cards for dense catalogs.', image: '${demoImage}' },
  { key: '2', title: 'List layout', description: 'Switch back to list for scanning.', image: '${demoImage}' },
  { key: '3', title: 'Responsive', description: 'Cards reflow on narrow viewports.', image: '${demoImage}' },
]

export <view>
  <DataView :data=\${data} bind-layout=\${layout} />
</view>`

export const paginated = `import { pulse } from '@jacare/core'
import DataView from '@jacare/ui/DataView'

const page = pulse(1)
const data = [
  { key: '1', title: 'Item 1', description: 'First page item.' },
  { key: '2', title: 'Item 2', description: 'Second page item.' },
  { key: '3', title: 'Item 3', description: 'Third page item.' },
  { key: '4', title: 'Item 4', description: 'Fourth page item.' },
  { key: '5', title: 'Item 5', description: 'Fifth page item.' },
]

export <view>
  <DataView :data=\${data} :rows=\${2} bind-page=\${page} />
</view>`

export const empty = `import DataView from '@jacare/ui/DataView'

export <view>
  <DataView :data=\${[]} :emptyText=\${'No releases yet'} />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import DataView from '@jacare/ui/DataView'",
    '',
    'const data = [',
    "  { key: '1', title: 'Design tokens', description: 'Color, spacing, and typography primitives.' },",
    "  { key: '2', title: 'Components', description: 'Accessible building blocks for product teams.' },",
    ']',
    '',
    'export <view>',
    '  <DataView',
    '    :data=\${data}',
  ]
  if (state.layout && state.layout !== 'list') lines.push(`    bind-layout=\${pulse('${state.layout}')}`)
  if (state.rows) lines.push(`    :rows=\${${state.rows}}`)
  if (state.emptyText) lines.push(`    :emptyText=\${${JSON.stringify(state.emptyText)}}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
