export const basic = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#189030')

export <view>
  <ColorPickerPanel bind-value=\${value} />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'",
    '',
    `const value = pulse('${quote(state.value || '#189030')}')`,
    '',
    'export <view>',
    '  <ColorPickerPanel',
  ]
  if (state.showInput === false) lines.push('    :showInput=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.presets) lines.push(`    :presets=\${${JSON.stringify(state.presets)}}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
