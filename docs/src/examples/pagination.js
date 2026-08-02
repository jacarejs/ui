export const basic = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(2)

export <view>
  <Pagination :total=\${120} bind-currentPage=\${page} :pageSize=\${10} />
</view>`

export const simple = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(1)

export <view>
  <Pagination
    :total=\${60}
    bind-currentPage=\${page}
    :pageSize=\${10}
    :showTotal=\${false}
  />
</view>`

export const withTotal = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(3)

export <view>
  <Pagination
    :total=\${96}
    bind-currentPage=\${page}
    :pageSize=\${12}
    :showTotal=\${true}
  />
</view>`

export const background = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(1)

export <view>
  <Pagination
    :total=\${80}
    bind-currentPage=\${page}
    :pageSize=\${10}
    :background=\${true}
  />
</view>`

export const full = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(2)
const size = pulse(20)

export <view>
  <Pagination
    :total=\${320}
    bind-currentPage=\${page}
    bind-pageSize=\${size}
    :pageSizes=\${[10, 20, 50, 100]}
    :background=\${true}
    :showTotal=\${true}
  />
</view>`

export const manyPages = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(8)

export <view>
  <Pagination
    :total=\${1000}
    bind-currentPage=\${page}
    :pageSize=\${10}
    :pagerCount=\${7}
    :background=\${true}
  />
</view>`

export const pageSizes = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(1)
const size = pulse(10)

export <view>
  <Pagination
    :total=\${240}
    bind-currentPage=\${page}
    bind-pageSize=\${size}
    :pageSizes=\${[10, 20, 50, 100]}
    :background=\${true}
  />
</view>`

export const compact = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(4)

export <view>
  <Pagination
    :total=\${500}
    bind-currentPage=\${page}
    :pageSize=\${20}
    :pagerCount=\${5}
  />
</view>`

export const fewPages = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'

const page = pulse(2)

export <view>
  <Pagination
    :total=\${36}
    bind-currentPage=\${page}
    :pageSize=\${12}
    :background=\${true}
  />
</view>`

export const disabled = `import Pagination from '@jacare/ui/Pagination'

export <view>
  <Pagination
    :total=\${120}
    :currentPage=\${3}
    :pageSize=\${10}
    :disabled=\${true}
    :background=\${true}
  />
</view>`

export const hideSingle = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const page = pulse(1)

export <view>
  <Stack :gap=\${'md'}>
    <Text>Hidden when only one page (8 items / 10)</Text>
    <Pagination
      :total=\${8}
      bind-currentPage=\${page}
      :pageSize=\${10}
      :hideOnSinglePage=\${true}
      :background=\${true}
    />
    <Text>Visible with more items</Text>
    <Pagination
      :total=\${48}
      :currentPage=\${1}
      :pageSize=\${10}
      :hideOnSinglePage=\${true}
      :background=\${true}
    />
  </Stack>
</view>`

export const tableFooter = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'
import Stack from '@jacare/ui/Stack'
import Table from '@jacare/ui/Table'
import Text from '@jacare/ui/Text'

const page = pulse(1)
const size = pulse(3)

const columns = [
  { prop: 'name', label: 'Name', width: 160 },
  { prop: 'status', label: 'Status', width: 120 },
]
const rows = [
  { id: 1, name: 'API', status: 'Ready' },
  { id: 2, name: 'Docs', status: 'Draft' },
  { id: 3, name: 'Site', status: 'Queued' },
  { id: 4, name: 'Theme', status: 'Ready' },
  { id: 5, name: 'Tokens', status: 'Draft' },
  { id: 6, name: 'Charts', status: 'Ready' },
]

function visibleRows() {
  const start = (page() - 1) * size()
  return rows.slice(start, start + size())
}

export <view>
  <Stack :gap=\${'md'}>
    <Table :columns=\${columns} :data=\${() => visibleRows()} :border=\${true} />
    <Pagination
      :total=\${rows.length}
      bind-currentPage=\${page}
      bind-pageSize=\${size}
      :pageSizes=\${[3, 5, 10]}
      :background=\${true}
    />
  </Stack>
</view>`

export const controlled = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Pagination from '@jacare/ui/Pagination'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const page = pulse(1)
const size = pulse(10)
const last = pulse('—')

function jump(next) {
  page.set(next)
}

export <view>
  <Stack :gap=\${'md'}>
    <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
      <Button :size=\${'sm'} on-press=\${() => jump(1)}>First</Button>
      <Button :size=\${'sm'} on-press=\${() => jump(5)}>Page 5</Button>
      <Button :size=\${'sm'} on-press=\${() => jump(12)}>Last</Button>
    </Stack>
    <Pagination
      :total=\${120}
      bind-currentPage=\${page}
      bind-pageSize=\${size}
      :background=\${true}
      on-change=\${(payload) => last.set('page ' + payload.page + ' · size ' + payload.pageSize)}
    />
    <Text :tone=\${'muted'}>Last change: \${() => last()}</Text>
  </Stack>
</view>`

export const cardToolbar = `import { pulse } from '@jacare/core'
import Card from '@jacare/ui/Card'
import Pagination from '@jacare/ui/Pagination'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const page = pulse(1)

export <view>
  <Card :title=\${'Releases'} :subtitle=\${'Paginated activity'}>
    <Stack :gap=\${'md'}>
      <Text :tone=\${'muted'}>Showing a page of release notes in the card body.</Text>
      <Pagination
        :total=\${48}
        bind-currentPage=\${page}
        :pageSize=\${8}
        :background=\${true}
        :showTotal=\${true}
      />
    </Stack>
  </Card>
</view>`

export const serverSide = `import { pulse } from '@jacare/core'
import Pagination from '@jacare/ui/Pagination'
import Stack from '@jacare/ui/Stack'
import Table from '@jacare/ui/Table'
import Text from '@jacare/ui/Text'

const page = pulse(1)
const size = pulse(5)
const total = pulse(0)
const rows = pulse([])
const loading = pulse(false)
const status = pulse('Loading…')

const columns = [
  { prop: 'name', label: 'Project', width: 160 },
  { prop: 'owner', label: 'Owner', width: 120 },
  { prop: 'status', label: 'Status', width: 100 },
]

const catalog = Array.from({ length: 87 }, (_, index) => ({
  id: index + 1,
  name: 'Project ' + (index + 1),
  owner: ['Alex', 'Jordan', 'Sam', 'Riley'][index % 4],
  status: ['Ready', 'Draft', 'Queued'][index % 3],
}))

let requestId = 0

async function fetchPage(nextPage, nextSize) {
  const id = ++requestId
  loading.set(true)
  status.set('Fetching page ' + nextPage + '…')
  await new Promise((resolve) => window.setTimeout(resolve, 450))
  if (id !== requestId) return
  const start = (nextPage - 1) * nextSize
  rows.set(catalog.slice(start, start + nextSize))
  total.set(catalog.length)
  loading.set(false)
  status.set('Loaded page ' + nextPage + ' · ' + nextSize + ' / page')
}

function onChange(payload) {
  fetchPage(payload.page, payload.pageSize)
}

fetchPage(page(), size())

export <view>
  <Stack :gap=\${'md'}>
    <Text :tone=\${'muted'} aria-live=\${'polite'}>\${() => status()}</Text>
    <Table :columns=\${columns} :data=\${rows} :border=\${true} />
    <Pagination
      :total=\${total}
      bind-currentPage=\${page}
      bind-pageSize=\${size}
      :pageSizes=\${[5, 10, 20]}
      :background=\${true}
      :disabled=\${loading}
      on-change=\${onChange}
    />
  </Stack>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Pagination from '@jacare/ui/Pagination'",
    '',
    `const page = pulse(${Number(state.currentPage) || 1})`,
    `const size = pulse(${Number(state.pageSize) || 10})`,
    '',
    'export <view>',
    '  <Pagination',
    `    :total=\${${Number(state.total) || 0}}`,
    '    bind-currentPage=\${page}',
    '    bind-pageSize=\${size}',
  ]
  if (state.showTotal === false) lines.push('    :showTotal=\${false}')
  if (state.background) lines.push('    :background=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hideOnSinglePage) lines.push('    :hideOnSinglePage=\${true}')
  if (state.showSizes) lines.push('    :pageSizes=\${[10, 20, 50, 100]}')
  if (state.pagerCount && Number(state.pagerCount) !== 7) {
    lines.push(`    :pagerCount=\${${Number(state.pagerCount)}}`)
  }
  lines.push('  />', '</view>')
  return lines.join('\n')
}
