export const basic = `import { pulse } from '@jacare/core'
import TreeSelect from '@jacare/ui/TreeSelect'

const value = pulse('')
const data = [
  {
    value: 'docs',
    label: 'Docs',
    children: [
      { value: 'guide', label: 'Guide' },
      { value: 'api', label: 'API' },
    ],
  },
  {
    value: 'components',
    label: 'Components',
    children: [
      { value: 'form', label: 'Form', children: [
        { value: 'input', label: 'Input' },
        { value: 'select', label: 'Select' },
      ]},
      { value: 'feedback', label: 'Feedback' },
    ],
  },
]

export <view>
  <TreeSelect
    :label=\${'Page'}
    :data=\${data}
    bind-value=\${value}
  />
</view>`

export const multiple = `import { pulse } from '@jacare/core'
import TreeSelect from '@jacare/ui/TreeSelect'

const value = pulse(['input', 'select'])
const data = [
  { value: 'forms', label: 'Forms', children: [
    { value: 'input', label: 'Input' },
    { value: 'select', label: 'Select' },
  ]},
]

export <view>
  <TreeSelect :label=\${'Components'} :data=\${data} :multiple=\${true} bind-value=\${value} />
</view>`

export const strict = `import { pulse } from '@jacare/core'
import TreeSelect from '@jacare/ui/TreeSelect'

const value = pulse(['forms'])
const data = [
  { value: 'forms', label: 'Forms', children: [
    { value: 'input', label: 'Input' },
    { value: 'select', label: 'Select' },
  ]},
]

export <view>
  <TreeSelect :label=\${'Independent nodes'} :data=\${data} :multiple=\${true} :checkStrictly=\${true} bind-value=\${value} />
</view>`

export const states = `import { pulse } from '@jacare/core'
import TreeSelect from '@jacare/ui/TreeSelect'
import Stack from '@jacare/ui/Stack'

const invalid = pulse('')
const locked = pulse('api')
const data = [{ value: 'docs', label: 'Docs', children: [{ value: 'api', label: 'API' }] }]

export <view>
  <Stack :gap=\${'md'}>
    <TreeSelect :label=\${'Page'} :data=\${data} :placeholder=\${'Choose a page'} :clearable=\${false} :error=\${'Select a page'} bind-value=\${invalid} />
    <TreeSelect :label=\${'Locked page'} :data=\${data} :disabled=\${true} bind-value=\${locked} />
  </Stack>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import TreeSelect from '@jacare/ui/TreeSelect'",
    '',
    `const value = pulse(${state.multiple ? '[]' : `'${quote(state.value || '')}'`})`,
    'const data = [/* tree nodes */]',
    '',
    'export <view>',
    '  <TreeSelect',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  lines.push('    :data=\${data}')
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.multiple) lines.push('    :multiple=\${true}')
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.checkStrictly) lines.push('    :checkStrictly=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
