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
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
