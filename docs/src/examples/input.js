export const basic = `import { pulse } from '@jacare/core'
import Input from '@jacare/ui/Input'

const value = pulse('')

export <view>
  <Input :label=\${'Name'} :placeholder=\${'Jane Doe'} bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Input from '@jacare/ui/Input'",
    '',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <Input',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.clearable) lines.push('    :clearable=\${true}')
  if (state.required) lines.push('    :required=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
