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

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
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
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
