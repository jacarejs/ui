export const basic = `import { pulse } from '@jacare/core'
import Slider from '@jacare/ui/Slider'

const value = pulse(40)

export <view>
  <Slider :min=\${0} :max=\${100} bind-value=\${value} />
</view>`

export const rangeExample = `import { pulse } from '@jacare/core'
import Slider from '@jacare/ui/Slider'

const value = pulse([25, 70])

export <view>
  <Slider :min=\${0} :max=\${100} :range=\${true} bind-value=\${value} />
</view>`

export const tooltipExample = `import { pulse } from '@jacare/core'
import Slider from '@jacare/ui/Slider'

const value = pulse(55)

export <view>
  <Slider :min=\${0} :max=\${100} :showTooltip=\${true} bind-value=\${value} />
</view>`

export function playgroundCode(state) {
  const initial = state.range
    ? `[${Number(state.lo) || 0}, ${Number(state.hi) || 100}]`
    : String(Number(state.value) || 0)
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Slider from '@jacare/ui/Slider'",
    '',
    `const value = pulse(${initial})`,
    '',
    'export <view>',
    '  <Slider',
  ]
  if (state.min !== undefined && Number(state.min) !== 0) lines.push(`    :min=\${${Number(state.min)}}`)
  if (state.max !== undefined && Number(state.max) !== 100) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.step && Number(state.step) !== 1) lines.push(`    :step=\${${Number(state.step)}}`)
  if (state.range) lines.push('    :range=\${true}')
  if (state.showTooltip) lines.push('    :showTooltip=\${true}')
  if (state.vertical) lines.push('    :vertical=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
