export const basic = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#189030')

export <view>
  <ColorPickerPanel bind-value=\${value} />
</view>`

export const presets = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#2563eb')
const brandColors = ['#189030', '#0f766e', '#2563eb', '#7c3aed', '#db2777']

export <view>
  <ColorPickerPanel :presets=\${brandColors} bind-value=\${value} />
</view>`

export const swatchOnly = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#7c3aed')

export <view>
  <ColorPickerPanel :showInput=\${false} bind-value=\${value} />
</view>`

export const alpha = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#db2777')

export <view>
  <ColorPickerPanel :showAlpha=\${true} bind-value=\${value} />
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import ColorPickerPanel from '@jacare/ui/ColorPickerPanel'

const value = pulse('#ea580c')

export <view>
  <ColorPickerPanel :disabled=\${true} bind-value=\${value} />
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
  if (state.showAlpha) lines.push('    :showAlpha=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.presets) lines.push(`    :presets=\${${JSON.stringify(state.presets)}}`)
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
