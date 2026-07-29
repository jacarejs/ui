export const basic = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'

const value = pulse(3)

export <view>
  <Rate bind-value=\${value} />
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Rate from '@jacare/ui/Rate'",
    '',
    `const value = pulse(${Number(state.value) || 0})`,
    '',
    'export <view>',
    '  <Rate',
  ]
  if (state.max && Number(state.max) !== 5) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.allowHalf) lines.push('    :allowHalf=\${true}')
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.showText) lines.push('    :showText=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
