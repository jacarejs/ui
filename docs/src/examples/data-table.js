export const basic = `import DataTable from '@jacare/ui/DataTable'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready' },
  { id: 2, name: 'Docs', status: 'Draft' },
  { id: 3, name: 'Site', status: 'Queued' },
]

export <view>
  <DataTable :columns=\${columns} :data=\${data} />
</view>`

export const sortable = `import { pulse } from '@jacare/core'
import DataTable from '@jacare/ui/DataTable'

const sortField = pulse('name')
const sortOrder = pulse(1)
const columns = [
  { prop: 'name', label: 'Name', sortable: true, width: 160 },
  { prop: 'status', label: 'Status', sortable: true, width: 120 },
]
const data = [
  { id: 1, name: 'Theme', status: 'Ready' },
  { id: 2, name: 'API', status: 'Draft' },
  { id: 3, name: 'Docs', status: 'Queued' },
]

export <view>
  <DataTable
    :columns=\${columns}
    :data=\${data}
    bind-sortField=\${sortField}
    bind-sortOrder=\${sortOrder}
    :border=\${true}
  />
</view>`

export const selectable = `import { pulse } from '@jacare/core'
import DataTable from '@jacare/ui/DataTable'

const selection = pulse(['2'])
const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'owner', label: 'Owner', width: 140 },
]
const data = [
  { id: 1, name: 'Roadmap', owner: 'Product' },
  { id: 2, name: 'Changelog', owner: 'Docs' },
  { id: 3, name: 'Tokens', owner: 'Design' },
]

export <view>
  <DataTable
    :columns=\${columns}
    :data=\${data}
    :selectable=\${true}
    bind-selection=\${selection}
    :striped=\${true}
  />
</view>`

export const styled = `import DataTable from '@jacare/ui/DataTable'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready' },
  { id: 2, name: 'Docs', status: 'Draft' },
]

export <view>
  <DataTable
    :columns=\${columns}
    :data=\${data}
    :striped=\${true}
    :border=\${true}
    :size=\${'sm'}
  />
</view>`

export const empty = `import DataTable from '@jacare/ui/DataTable'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]

export <view>
  <DataTable :columns=\${columns} :data=\${[]} :emptyText=\${'No rows found'} :border=\${true} />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import DataTable from '@jacare/ui/DataTable'",
    '',
    'const columns = [',
    "  { prop: 'name', label: 'Name', sortable: true, width: 160 },",
    "  { prop: 'status', label: 'Status', sortable: true, width: 120 },",
    ']',
    'const data = [',
    "  { id: 1, name: 'API', status: 'Ready' },",
    "  { id: 2, name: 'Docs', status: 'Draft' },",
    "  { id: 3, name: 'Site', status: 'Queued' },",
    ']',
    '',
    'export <view>',
    '  <DataTable',
    '    :columns=\${columns}',
    '    :data=\${data}',
  ]
  if (state.selectable) {
    lines.push('    :selectable=\${true}')
    lines.push(`    bind-selection=\${pulse(${JSON.stringify(state.selection || [])})}`)
  }
  if (state.striped) lines.push('    :striped=\${true}')
  if (state.border) lines.push('    :border=\${true}')
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${state.size}'}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
