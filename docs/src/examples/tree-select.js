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
  if (state.multiple) lines.push('    :multiple=\${true}')
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
