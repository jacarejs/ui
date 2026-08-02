export const basic = `import { pulse } from '@jacare/core'
import Autocomplete from '@jacare/ui/Autocomplete'

const value = pulse('')
const suggestions = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry']

export <view>
  <Autocomplete
    :label=\${'Fruit'}
    :suggestions=\${suggestions}
    :placeholder=\${'Search fruit'}
    bind-value=\${value}
  />
</view>`

export const objectSuggestions = `import { pulse } from '@jacare/core'
import Autocomplete from '@jacare/ui/Autocomplete'

const value = pulse('')
const suggestions = [
  { value: 'gru', label: 'Guarulhos' },
  { value: 'gig', label: 'Rio de Janeiro' },
  { value: 'lis', label: 'Lisbon' },
]

export <view>
  <Autocomplete :label=\${'Airport'} :suggestions=\${suggestions} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Autocomplete from '@jacare/ui/Autocomplete'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('Banana')
const suggestions = ['Apple', 'Banana', 'Cherry']

export <view>
  <Stack :gap=\${'md'}>
    <Autocomplete :label=\${'Fruit'} :suggestions=\${suggestions} :error=\${'Choose a listed fruit'} bind-value=\${invalid} />
    <Autocomplete :label=\${'Locked fruit'} :suggestions=\${suggestions} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`

export const asyncLoading = `import { pulse } from '@jacare/core'
import Autocomplete from '@jacare/ui/Autocomplete'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const value = pulse('')
const loading = pulse(false)
const results = pulse([])
const debounce = pulse(250)
const catalog = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Dragonfruit', 'Grape', 'Mango']
const debounceOptions = [
  { value: 0, label: '0ms' },
  { value: 150, label: '150ms' },
  { value: 250, label: '250ms' },
  { value: 500, label: '500ms' },
  { value: 800, label: '800ms' },
]
let requestId = 0

function searchFruits(query) {
  const id = ++requestId
  loading.set(true)
  results.set([])
  window.setTimeout(() => {
    if (id !== requestId) return
    const q = String(query || '').trim().toLowerCase()
    results.set(!q ? catalog.slice() : catalog.filter((item) => item.toLowerCase().includes(q)))
    loading.set(false)
  }, 550)
}

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${debounce} :options=\${debounceOptions} :block=\${true} />
    <Autocomplete
      :label=\${'Fruit'}
      :placeholder=\${'Type to search…'}
      :suggestions=\${results}
      :remote=\${true}
      :loading=\${loading}
      :debounce=\${debounce}
      :hint=\${'search waits for debounce, then shows loading while results resolve'}
      bind-value=\${value}
      on-search=\${searchFruits}
    />
    <Text :tone=\${'muted'}>Active debounce: \${debounce}ms</Text>
  </Stack>
</view>`

export const serverSide = `import { pulse } from '@jacare/core'
import Autocomplete from '@jacare/ui/Autocomplete'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const value = pulse('')
const loading = pulse(false)
const results = pulse([])
const debounce = pulse(300)
const status = pulse('Idle — type to query the API')
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
]

async function fetchCities(query) {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  const q = String(query || '').trim().toLowerCase()
  if (!q) return []
  return CITY_DB.filter((city) => city.label.toLowerCase().includes(q))
}

async function searchCities(query) {
  const id = ++requestId
  const q = String(query || '').trim()
  if (!q) {
    results.set([])
    loading.set(false)
    status.set('Idle — type to query the API')
    return
  }
  loading.set(true)
  results.set([])
  status.set(\`Requesting /cities?q=\${q}…\`)
  const matches = await fetchCities(q)
  if (id !== requestId) return
  results.set(matches)
  loading.set(false)
  status.set(\`API returned \${matches.length} city(ies) for "\${q}"\`)
}

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${debounce} :options=\${debounceOptions} :block=\${true} />
    <Autocomplete
      :label=\${'City'}
      :placeholder=\${'Search cities…'}
      :suggestions=\${results}
      :remote=\${true}
      :loading=\${loading}
      :debounce=\${debounce}
      :hint=\${'Debounce controls how soon the server request starts'}
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
  const debounce = Number(state.debounce)
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Autocomplete from '@jacare/ui/Autocomplete'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    "const suggestions = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry']",
    '',
    'export <view>',
    '  <Autocomplete',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :suggestions=\${suggestions}')
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (Number.isFinite(debounce) && debounce !== 150) lines.push(`    :debounce=\${${debounce}}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
