export const basic = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'

const query = pulse('')
const sort = pulse('new')
const chips = pulse([{ key: 'active', label: 'Active' }])

export <view>
  <FilterBar
    bind-query=\${query}
    bind-sort=\${sort}
    bind-chips=\${chips}
    :sortOptions=\${[{ value: 'new', label: 'Newest' }, { value: 'name', label: 'Name' }]}
  />
</view>`

export const chipsExample = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'

const query = pulse('')
const sort = pulse('name')
const chips = pulse([
  { key: 'active', label: 'Active' },
  { key: 'beta', label: 'Beta' },
  { key: 'owner', label: 'Owned by me' },
])

export <view>
  <FilterBar
    bind-query=\${query}
    bind-sort=\${sort}
    bind-chips=\${chips}
    :sortOptions=\${[
      { value: 'new', label: 'Newest' },
      { value: 'name', label: 'Name' },
      { value: 'updated', label: 'Recently updated' },
    ]}
  />
</view>`

export const searchOnly = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'

const query = pulse('jacaré')

export <view>
  <FilterBar
    :placeholder=\${'Search projects…'}
    bind-query=\${query}
  />
</view>`

export const debounceExample = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const query = pulse('')
const sort = pulse('new')
const chips = pulse([{ key: 'open', label: 'Open' }])
const debounce = pulse(250)
const lastSearch = pulse('Idle')
const debounceOptions = [
  { value: 0, label: '0ms' },
  { value: 150, label: '150ms' },
  { value: 250, label: '250ms' },
  { value: 500, label: '500ms' },
]

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${debounce} :options=\${debounceOptions} :block=\${true} />
    <FilterBar
      bind-query=\${query}
      bind-sort=\${sort}
      bind-chips=\${chips}
      :debounce=\${debounce}
      :sortOptions=\${[{ value: 'new', label: 'Newest' }, { value: 'name', label: 'Name' }]}
      on-search=\${(next) => lastSearch.set(next ? 'search "' + next + '"' : 'cleared')}
    />
    <Text :tone=\${'muted'}>Active debounce: \${debounce}ms · \${lastSearch}</Text>
  </Stack>
</view>`

export const actionsExample = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'

const query = pulse('')
const sort = pulse('new')
const chips = pulse([{ key: 'draft', label: 'Draft' }])

export <view>
  <FilterBar
    bind-query=\${query}
    bind-sort=\${sort}
    bind-chips=\${chips}
    :sortOptions=\${[{ value: 'new', label: 'Newest' }, { value: 'name', label: 'Name' }]}
  >
    <button type="button" slot="actions">Export</button>
  </FilterBar>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'

const query = pulse('locked')
const sort = pulse('name')
const chips = pulse([{ key: 'active', label: 'Active' }])

export <view>
  <FilterBar
    :disabled=\${true}
    bind-query=\${query}
    bind-sort=\${sort}
    bind-chips=\${chips}
    :sortOptions=\${[{ value: 'new', label: 'Newest' }, { value: 'name', label: 'Name' }]}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import FilterBar from '@jacare/ui/FilterBar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const query = pulse('')
const sort = pulse('new')
const chips = pulse([
  { key: 'active', label: 'Active' },
  { key: 'mine', label: 'Mine' },
])
const status = pulse('Idle')

export <view>
  <Stack :gap=\${'md'}>
    <FilterBar
      bind-query=\${query}
      bind-sort=\${sort}
      bind-chips=\${chips}
      :sortOptions=\${[
        { value: 'new', label: 'Newest' },
        { value: 'name', label: 'Name' },
      ]}
      on-change=\${(next) => status.set('q="' + (next.query || '') + '" · sort=' + (next.sort || 'none') + ' · ' + ((next.chips || []).length) + ' chip(s)')}
    />
    <Text :tone=\${'muted'}>\${status}</Text>
  </Stack>
</view>`
