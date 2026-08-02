export const basic = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'

const value = pulse('')
const bigOptions = Array.from({ length: 200 }, (_, i) => ({
  value: \`option-\${i + 1}\`,
  label: \`Option \${i + 1}\`,
}))

export <view>
  <SelectV2
    :label=\${'Large list'}
    :options=\${bigOptions}
    :searchable=\${true}
    bind-value=\${value}
  />
</view>`

export const objectOptions = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'

const value = pulse('pro')
const options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', tag: 'Popular' },
  { value: 'team', label: 'Team', tag: 'New' },
]

export <view>
  <SelectV2 :label=\${'Plan'} :options=\${options} bind-value=\${value} />
</view>`

export const compact = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'

const value = pulse('')
const options = ['Brazil', 'Canada', 'Germany', 'Japan', 'Portugal']

export <view>
  <SelectV2
    :label=\${'Country'}
    :options=\${options}
    :searchable=\${false}
    :height=\${144}
    :itemSize=\${36}
    bind-value=\${value}
  />
</view>`

export const states = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('pro')
const options = [{ value: 'free', label: 'Free' }, { value: 'pro', label: 'Pro' }]

export <view>
  <Stack :gap=\${'md'}>
    <SelectV2 :label=\${'Plan'} :options=\${options} :placeholder=\${'Choose a plan'} :error=\${'A plan is required'} bind-value=\${invalid} />
    <SelectV2 :label=\${'Locked plan'} :options=\${options} :disabled=\${true} :hint=\${'Managed by your organization'} bind-value=\${locked} />
  </Stack>
</view>`

export const loadingExample = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'

const value = pulse('')
const options = Array.from({ length: 40 }, (_, i) => ({
  value: \`user-\${i + 1}\`,
  label: \`User \${i + 1}\`,
}))

export <view>
  <SelectV2
    :label=\${'Assignee'}
    :options=\${options}
    :loading=\${true}
    :hint=\${'loading replaces the list with a Searching… state'}
    bind-value=\${value}
  />
</view>`

export const debounceExample = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const value = pulse('')
const debounce = pulse(250)
const options = Array.from({ length: 200 }, (_, i) => ({
  value: \`option-\${i + 1}\`,
  label: \`Option \${i + 1}\`,
}))
const debounceOptions = [
  { value: 0, label: '0ms' },
  { value: 150, label: '150ms' },
  { value: 250, label: '250ms' },
  { value: 500, label: '500ms' },
  { value: 800, label: '800ms' },
]

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${debounce} :options=\${debounceOptions} :block=\${true} />
    <SelectV2
      :label=\${'Local filter'}
      :options=\${options}
      :debounce=\${debounce}
      :hint=\${'Local filtering waits for debounce before applying the query'}
      bind-value=\${value}
    />
    <Text :tone=\${'muted'}>Active debounce: \${debounce}ms</Text>
  </Stack>
</view>`

export const serverSide = `import { pulse } from '@jacare/core'
import SelectV2 from '@jacare/ui/SelectV2'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const value = pulse('')
const loading = pulse(false)
const results = pulse([])
const debounce = pulse(300)
const status = pulse('Idle — open or type to query the API')
const debounceOptions = [
  { value: 0, label: '0ms' },
  { value: 150, label: '150ms' },
  { value: 300, label: '300ms' },
  { value: 500, label: '500ms' },
  { value: 800, label: '800ms' },
]
let requestId = 0

const CITY_DB = [
  { value: 'sao-paulo', label: 'São Paulo' },
  { value: 'rio', label: 'Rio de Janeiro' },
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'porto', label: 'Porto' },
  { value: 'madrid', label: 'Madrid' },
  { value: 'barcelona', label: 'Barcelona' },
  { value: 'buenos-aires', label: 'Buenos Aires' },
  { value: 'santiago', label: 'Santiago' },
  { value: 'mexico-city', label: 'Mexico City' },
  { value: 'bogota', label: 'Bogotá' },
]

async function fetchCities(query) {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  const q = String(query || '').trim().toLowerCase()
  if (!q) return CITY_DB.slice(0, 6)
  return CITY_DB.filter((city) => city.label.toLowerCase().includes(q))
}

async function searchCities(query) {
  const id = ++requestId
  loading.set(true)
  results.set([])
  const q = String(query || '').trim()
  status.set(q ? \`Requesting /cities?q=\${q}…\` : 'Requesting /cities…')
  const matches = await fetchCities(q)
  if (id !== requestId) return
  results.set(matches)
  loading.set(false)
  status.set(\`API returned \${matches.length} city(ies)\${q ? \` for "\${q}"\` : ''}\`)
}

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${debounce} :options=\${debounceOptions} :block=\${true} />
    <SelectV2
      :label=\${'City'}
      :options=\${results}
      :remote=\${true}
      :loading=\${loading}
      :debounce=\${debounce}
      :searchPlaceholder=\${'Search cities…'}
      :hint=\${'remote skips local filter and emits search after debounce'}
      bind-value=\${value}
      on-search=\${searchCities}
    />
    <Text :tone=\${'muted'}>Active debounce: \${debounce}ms · \${status}</Text>
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import SelectV2 from '@jacare/ui/SelectV2'",
    '',
    `const value = pulse('${quote(state.value || '')}')`,
    'const bigOptions = Array.from({ length: 200 }, (_, i) => ({',
    "  value: `option-${i + 1}`,",
    "  label: `Option ${i + 1}`,",
    '}))',
    '',
    'export <view>',
    '  <SelectV2',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :options=\${bigOptions}')
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.searchPlaceholder) lines.push(`    :searchPlaceholder=\${'${quote(state.searchPlaceholder)}'}`)
  if (state.searchable === false) lines.push('    :searchable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (Number(state.height) !== 274) lines.push(`    :height=\${${Number(state.height) || 274}}`)
  if (Number(state.itemSize) !== 44) lines.push(`    :itemSize=\${${Number(state.itemSize) || 44}}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
