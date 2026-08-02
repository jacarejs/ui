export const basic = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse([])
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'disciplines', label: 'Disciplines', children: [
        { value: 'consistency', label: 'Consistency' },
        { value: 'feedback', label: 'Feedback' },
      ]},
      { value: 'navigation', label: 'Navigation', children: [
        { value: 'side nav', label: 'Side Nav' },
        { value: 'top nav', label: 'Top Nav' },
      ]},
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      { value: 'form', label: 'Form', children: [
        { value: 'cascader', label: 'Cascader' },
        { value: 'select', label: 'Select' },
      ]},
    ],
  },
]

export <view>
  <Cascader
    :label=\${'Category'}
    :options=\${options}
    bind-value=\${value}
  />
</view>`

export const filterableExample = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse([])
const options = [
  { value: 'guide', label: 'Guide', children: [
    { value: 'api', label: 'API' },
    { value: 'patterns', label: 'Patterns' },
  ]},
  { value: 'component', label: 'Component', children: [
    { value: 'cascader', label: 'Cascader' },
    { value: 'select', label: 'Select' },
  ]},
]

export <view>
  <Cascader
    :label=\${'Search pages'}
    :options=\${options}
    :filterable=\${true}
    :hint=\${'Type to jump to a leaf path'}
    bind-value=\${value}
  />
</view>`

export const changeOnSelectExample = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse([])
const options = [
  { value: 'americas', label: 'Americas', children: [
    { value: 'brazil', label: 'Brazil', children: [
      { value: 'recife', label: 'Recife' },
      { value: 'sp', label: 'São Paulo' },
    ]},
  ]},
  { value: 'europe', label: 'Europe', children: [
    { value: 'portugal', label: 'Portugal' },
  ]},
]

export <view>
  <Cascader
    :label=\${'Region'}
    :options=\${options}
    :changeOnSelect=\${true}
    :hint=\${'Parents can be selected — model is still a path array'}
    bind-value=\${value}
  />
</view>`

export const multipleExample = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse([])
const options = [
  { value: 'guide', label: 'Guide', children: [
    { value: 'consistency', label: 'Consistency' },
    { value: 'feedback', label: 'Feedback' },
  ]},
  { value: 'component', label: 'Component', children: [
    { value: 'cascader', label: 'Cascader' },
    { value: 'select', label: 'Select' },
  ]},
]

export <view>
  <Cascader
    :label=\${'Topics'}
    :options=\${options}
    :multiple=\${true}
    :hint=\${'Model becomes an array of path arrays'}
    bind-value=\${value}
  />
</view>`

export const selectedPath = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse(['component', 'form', 'select'])
const options = [
  { value: 'component', label: 'Component', children: [
    { value: 'form', label: 'Form', children: [
      { value: 'select', label: 'Select' },
      { value: 'input', label: 'Input' },
    ]},
  ]},
]

export <view>
  <Cascader :label=\${'Component'} :options=\${options} bind-value=\${value} />
</view>`

export const customSeparator = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'

const value = pulse(['americas', 'brazil', 'recife'])
const options = [
  { value: 'americas', label: 'Americas', children: [
    { value: 'brazil', label: 'Brazil', children: [{ value: 'recife', label: 'Recife' }] },
  ]},
]

export <view>
  <Cascader :label=\${'Region'} :options=\${options} :separator=\${'›'} :hint=\${'Choose the most specific region'} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import Cascader from '@jacare/ui/Cascader'
import Stack from '@jacare/ui/Stack'

const invalid = pulse([])
const locked = pulse(['guide', 'api'])
const options = [{ value: 'guide', label: 'Guide', children: [{ value: 'api', label: 'API' }] }]

export <view>
  <Stack :gap=\${'md'}>
    <Cascader :label=\${'Destination'} :options=\${options} :clearable=\${false} :error=\${'Select a destination'} bind-value=\${invalid} />
    <Cascader :label=\${'Locked path'} :options=\${options} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Cascader from '@jacare/ui/Cascader'",
    '',
    'const value = pulse([])',
    'const options = [/* nested options */]',
    '',
    'export <view>',
    '  <Cascader',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :options=\${options}')
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.filterable) lines.push('    :filterable=\${true}')
  if (state.changeOnSelect) lines.push('    :changeOnSelect=\${true}')
  if (state.multiple) lines.push('    :multiple=\${true}')
  if (state.separator && state.separator !== '/') lines.push(`    :separator=\${'${quote(state.separator)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
