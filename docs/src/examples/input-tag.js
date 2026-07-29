export const basic = `import { pulse } from '@jacare/core'
import InputTag from '@jacare/ui/InputTag'

const value = pulse(['vue', 'react'])

export <view>
  <InputTag :label=\${'Frameworks'} :placeholder=\${'Add a framework'} bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const tags = Array.isArray(state.value) ? state.value : []
  const tagsLiteral = `[${tags.map((tag) => `'${quote(tag)}'`).join(', ')}]`
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import InputTag from '@jacare/ui/InputTag'",
    '',
    `const value = pulse(${tagsLiteral})`,
    '',
    'export <view>',
    '  <InputTag',
  ]
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.placeholder) lines.push(`    :placeholder=\${'${quote(state.placeholder)}'}`)
  if (state.max) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
