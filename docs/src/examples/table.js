export const basic = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
  { prop: 'owner', label: 'Owner', width: 140 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready', owner: 'Platform' },
  { id: 2, name: 'Docs', status: 'Draft', owner: 'Design' },
  { id: 3, name: 'Site', status: 'Queued', owner: 'Growth' },
  { id: 4, name: 'Theme', status: 'Ready', owner: 'Design' },
]

export <view>
  <Table :columns=\${columns} :data=\${data} />
</view>`

export const striped = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready' },
  { id: 2, name: 'Docs', status: 'Draft' },
  { id: 3, name: 'Site', status: 'Queued' },
  { id: 4, name: 'Theme', status: 'Ready' },
]

export <view>
  <Table :columns=\${columns} :data=\${data} :stripe=\${true} />
</view>`

export const bordered = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready' },
  { id: 2, name: 'Docs', status: 'Draft' },
  { id: 3, name: 'Site', status: 'Queued' },
  { id: 4, name: 'Theme', status: 'Ready' },
]

export <view>
  <Table :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const options = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
  { prop: 'owner', label: 'Owner', width: 140 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready', owner: 'Platform' },
  { id: 2, name: 'Docs', status: 'Draft', owner: 'Design' },
  { id: 3, name: 'Site', status: 'Queued', owner: 'Growth' },
  { id: 4, name: 'Theme', status: 'Ready', owner: 'Design' },
]

export <view>
  <Table
    :columns=\${columns}
    :data=\${data}
    :stripe=\${true}
    :border=\${true}
    :size=\${'sm'}
  />
</view>`

export const sizes = `import Stack from '@jacare/ui/Stack'
import Table from '@jacare/ui/Table'
import Text from '@jacare/ui/Text'

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
  <Stack :gap=\${'lg'}>
    <Text :weight=\${'bold'}>Small</Text>
    <Table :columns=\${columns} :data=\${data} :size=\${'sm'} :border=\${true} />
    <Text :weight=\${'bold'}>Medium</Text>
    <Table :columns=\${columns} :data=\${data} :size=\${'md'} :border=\${true} />
    <Text :weight=\${'bold'}>Large</Text>
    <Table :columns=\${columns} :data=\${data} :size=\${'lg'} :border=\${true} />
  </Stack>
</view>`

export const sortable = `import { pulse } from '@jacare/core'
import Table from '@jacare/ui/Table'
import Text from '@jacare/ui/Text'
import Stack from '@jacare/ui/Stack'

const sortField = pulse('name')
const sortOrder = pulse(1)
const columns = [
  { prop: 'name', label: 'Name', sortable: true, width: 160 },
  { prop: 'status', label: 'Status', sortable: true, width: 120 },
  { prop: 'owner', label: 'Owner', sortable: true, width: 140 },
]
const data = [
  { id: 1, name: 'Theme', status: 'Ready', owner: 'Design' },
  { id: 2, name: 'API', status: 'Draft', owner: 'Platform' },
  { id: 3, name: 'Docs', status: 'Queued', owner: 'Design' },
  { id: 4, name: 'Site', status: 'Ready', owner: 'Growth' },
]

export <view>
  <Stack :gap=\${'sm'}>
    <Table
      :columns=\${columns}
      :data=\${data}
      bind-sortField=\${sortField}
      bind-sortOrder=\${sortOrder}
      :border=\${true}
      :stripe=\${true}
    />
    <Text :tone=\${'muted'}>
      Sorted by \${() => sortField()} (\${() => (sortOrder() === -1 ? 'desc' : 'asc')})
    </Text>
  </Stack>
</view>`

export const filterExample = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'
import Select from '@jacare/ui/Select'
import Stack from '@jacare/ui/Stack'
import Table from '@jacare/ui/Table'
import Text from '@jacare/ui/Text'

const query = pulse('')
const status = pulse('all')
const sortField = pulse('name')
const sortOrder = pulse(1)

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Draft', label: 'Draft' },
  { value: 'Queued', label: 'Queued' },
]
const columns = [
  { prop: 'name', label: 'Name', sortable: true, width: 160 },
  { prop: 'status', label: 'Status', sortable: true, width: 120 },
  { prop: 'owner', label: 'Owner', sortable: true, width: 140 },
]
const data = [
  { id: 1, name: 'API', status: 'Ready', owner: 'Platform' },
  { id: 2, name: 'Docs', status: 'Draft', owner: 'Design' },
  { id: 3, name: 'Site', status: 'Queued', owner: 'Growth' },
  { id: 4, name: 'Theme', status: 'Ready', owner: 'Design' },
  { id: 5, name: 'Tokens', status: 'Draft', owner: 'Design' },
]

function rows() {
  const q = String(query() || '').trim().toLowerCase()
  const st = String(status() || 'all')
  return data.filter((row) => {
    const matchesQuery = !q || [row.name, row.status, row.owner].join(' ').toLowerCase().includes(q)
    const matchesStatus = st === 'all' || row.status === st
    return matchesQuery && matchesStatus
  })
}

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true} :align=\${'end'}>
      <FilterBar :placeholder=\${'Search releases…'} bind-query=\${query} />
      <Select :label=\${'Status'} :options=\${statusOptions} bind-value=\${status} />
    </Stack>
    <Table
      :columns=\${columns}
      :data=\${() => rows()}
      bind-sortField=\${sortField}
      bind-sortOrder=\${sortOrder}
      :border=\${true}
      :stripe=\${true}
      :emptyText=\${'No matching releases'}
    />
    <Text :tone=\${'muted'}>Showing filtered rows. Click headers to change order.</Text>
  </Stack>
</view>`

export const alignExample = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 180 },
  { prop: 'version', label: 'Version', width: 100, align: 'center' },
  { prop: 'downloads', label: 'Downloads', width: 120, align: 'end' },
]
const data = [
  { id: 1, name: 'Button', version: '0.1.3', downloads: '12.4k' },
  { id: 2, name: 'Table', version: '0.1.3', downloads: '8.1k' },
  { id: 3, name: 'Empty', version: '0.1.2', downloads: '3.6k' },
]

export <view>
  <Table :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const empty = `import Table from '@jacare/ui/Table'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]

export <view>
  <Table :columns=\${columns} :data=\${[]} :emptyText=\${'No releases found'} :border=\${true} />
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Table from '@jacare/ui/Table'",
    '',
    'const columns = [',
    "  { prop: 'name', label: 'Name', sortable: true, width: 160 },",
    "  { prop: 'status', label: 'Status', sortable: true, width: 120 },",
    "  { prop: 'owner', label: 'Owner', width: 140 },",
    ']',
    'const data = [/* … */]',
    '',
    'export <view>',
    '  <Table',
    '    :columns=\${columns}',
    '    :data=\${data}',
  ]
  if (state.stripe) lines.push('    :stripe=\${true}')
  if (state.border) lines.push('    :border=\${true}')
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${state.size}'}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
