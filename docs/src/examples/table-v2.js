export const basic = `import TableV2 from '@jacare/ui/TableV2'

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
  <TableV2 :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const virtualized = `import TableV2 from '@jacare/ui/TableV2'

const columns = [
  { prop: 'id', label: 'ID', width: 72 },
  { prop: 'name', label: 'Package', width: 180 },
  { prop: 'owner', label: 'Owner', width: 140 },
  { prop: 'status', label: 'Status', width: 120 },
]

const data = Array.from({ length: 500 }, (item, index) => ({
  id: index + 1,
  name: 'pkg-' + (index + 1),
  owner: index % 2 ? 'Ada' : 'Grace',
  status: index % 3 ? 'Ready' : 'Queued',
}))

export <view>
  <TableV2
    :columns=\${columns}
    :data=\${data}
    :rowHeight=\${40}
    :maxHeight=\${320}
    :stripe=\${true}
    :border=\${true}
  />
</view>`

export const striped = `import TableV2 from '@jacare/ui/TableV2'

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
  <TableV2 :columns=\${columns} :data=\${data} :stripe=\${true} :border=\${true} />
</view>`

export const bordered = `import TableV2 from '@jacare/ui/TableV2'

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
  <TableV2 :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const options = `import TableV2 from '@jacare/ui/TableV2'

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
  <TableV2
    :columns=\${columns}
    :data=\${data}
    :stripe=\${true}
    :border=\${true}
    :size=\${'sm'}
    :rowHeight=\${36}
    :maxHeight=\${240}
  />
</view>`

export const sizes = `import Stack from '@jacare/ui/Stack'
import TableV2 from '@jacare/ui/TableV2'
import Text from '@jacare/ui/Text'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const data = [
  { id: 1, name: 'Compact', status: 'sm' },
  { id: 2, name: 'Default', status: 'md' },
  { id: 3, name: 'Comfort', status: 'lg' },
]

export <view>
  <Stack :gap=\${'lg'}>
    <Text :weight=\${'bold'}>Small</Text>
    <TableV2 :columns=\${columns} :data=\${data} :size=\${'sm'} :border=\${true} :rowHeight=\${36} />
    <Text :weight=\${'bold'}>Medium</Text>
    <TableV2 :columns=\${columns} :data=\${data} :size=\${'md'} :border=\${true} />
    <Text :weight=\${'bold'}>Large</Text>
    <TableV2 :columns=\${columns} :data=\${data} :size=\${'lg'} :border=\${true} :rowHeight=\${52} />
  </Stack>
</view>`

export const widths = `import TableV2 from '@jacare/ui/TableV2'

const columns = [
  { prop: 'sku', label: 'SKU', width: 96 },
  { prop: 'name', label: 'Product', width: 220 },
  { prop: 'qty', label: 'Qty', width: 72 },
  { prop: 'price', label: 'Price', width: 96 },
]

const data = [
  { id: 1, sku: 'JUI-01', name: 'Theme kit', qty: 12, price: '$24' },
  { id: 2, sku: 'JUI-02', name: 'Icon pack', qty: 40, price: '$12' },
  { id: 3, sku: 'JUI-03', name: 'Motion presets', qty: 8, price: '$18' },
]

export <view>
  <TableV2 :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const alignExample = `import TableV2 from '@jacare/ui/TableV2'

const columns = [
  { prop: 'name', label: 'Name', width: 180 },
  { prop: 'version', label: 'Version', width: 100, align: 'center' },
  { prop: 'downloads', label: 'Downloads', width: 120, align: 'end' },
]
const data = [
  { id: 1, name: 'Button', version: '0.1.3', downloads: '12.4k' },
  { id: 2, name: 'TableV2', version: '0.1.3', downloads: '8.1k' },
  { id: 3, name: 'Empty', version: '0.1.2', downloads: '3.6k' },
]

export <view>
  <TableV2 :columns=\${columns} :data=\${data} :border=\${true} />
</view>`

export const sortable = `import { pulse } from '@jacare/core'
import Stack from '@jacare/ui/Stack'
import TableV2 from '@jacare/ui/TableV2'
import Text from '@jacare/ui/Text'

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
    <TableV2
      :columns=\${columns}
      :data=\${data}
      bind-sortField=\${sortField}
      bind-sortOrder=\${sortOrder}
      :border=\${true}
      :stripe=\${true}
      :maxHeight=\${280}
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
import TableV2 from '@jacare/ui/TableV2'
import Text from '@jacare/ui/Text'

const query = pulse('')
const status = pulse('all')
const sortField = pulse('name')
const sortOrder = pulse(1)

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Queued', label: 'Queued' },
]
const columns = [
  { prop: 'id', label: 'ID', width: 72, sortable: true },
  { prop: 'name', label: 'Package', width: 180, sortable: true },
  { prop: 'owner', label: 'Owner', width: 140, sortable: true },
  { prop: 'status', label: 'Status', width: 120, sortable: true },
]

const data = Array.from({ length: 200 }, (item, index) => ({
  id: index + 1,
  name: 'pkg-' + (index + 1),
  owner: index % 2 ? 'Ada' : 'Grace',
  status: index % 3 ? 'Ready' : 'Queued',
}))

function rows() {
  const q = String(query() || '').trim().toLowerCase()
  const st = String(status() || 'all')
  return data.filter((row) => {
    const matchesQuery = !q || [row.name, row.owner, row.status].join(' ').toLowerCase().includes(q)
    const matchesStatus = st === 'all' || row.status === st
    return matchesQuery && matchesStatus
  })
}

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true} :align=\${'end'}>
      <FilterBar :placeholder=\${'Search packages…'} bind-query=\${query} />
      <Select :label=\${'Status'} :options=\${statusOptions} bind-value=\${status} />
    </Stack>
    <TableV2
      :columns=\${columns}
      :data=\${() => rows()}
      bind-sortField=\${sortField}
      bind-sortOrder=\${sortOrder}
      :rowHeight=\${40}
      :maxHeight=\${320}
      :border=\${true}
      :stripe=\${true}
      :emptyText=\${'No matching packages'}
    />
    <Text :tone=\${'muted'}>Filter first, then sort the virtualized window.</Text>
  </Stack>
</view>`

export const empty = `import TableV2 from '@jacare/ui/TableV2'

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]

export <view>
  <TableV2
    :columns=\${columns}
    :data=\${[]}
    :emptyText=\${'No packages yet'}
    :border=\${true}
    :maxHeight=\${220}
  />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import TableV2 from '@jacare/ui/TableV2'",
    '',
    'const columns = [',
    "  { prop: 'name', label: 'Name', sortable: true, width: 160 },",
    "  { prop: 'status', label: 'Status', sortable: true, width: 120 },",
    "  { prop: 'owner', label: 'Owner', width: 140 },",
    ']',
    'const data = [/* … */]',
    '',
    'export <view>',
    '  <TableV2',
    '    :columns=\${columns}',
    '    :data=\${data}',
  ]
  if (state.stripe) lines.push('    :stripe=\${true}')
  if (state.border) lines.push('    :border=\${true}')
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${state.size}'}`)
  if (state.rowHeight && state.rowHeight !== 44) lines.push(`    :rowHeight=\${${state.rowHeight}}`)
  if (state.maxHeight && state.maxHeight !== 360) lines.push(`    :maxHeight=\${${state.maxHeight}}`)
  lines.push('  />', '</view>')
  return lines.join('\n')
}
