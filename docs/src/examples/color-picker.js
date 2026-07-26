export const basic = `import { pulse } from '@jacare/core'
import ColorPicker from '@jacare/ui/ColorPicker'

const color = pulse('#189030')
const presets = [
  '#189030',
  '#30a830',
  '#1f6feb',
  '#7c4dff',
  '#c62828',
  '#e65100',
  '#c47a00',
  '#00897b',
  '#5d4037',
  '#001818',
]

export <view>
  <ColorPicker
    :label=\${'Primary'}
    :hint=\${'Used for buttons and focus rings'}
    :presets=\${presets}
    bind-value=\${color}
  />
</view>`

export const presets = `import { pulse } from '@jacare/core'
import ColorPicker from '@jacare/ui/ColorPicker'

const color = pulse('#189030')
const brand = [
  '#189030',
  '#30a830',
  '#1f6feb',
  '#7c4dff',
  '#c62828',
  '#e65100',
  '#c47a00',
  '#00897b',
  '#5d4037',
  '#001818',
]

export <view>
  <ColorPicker
    :label=\${'Brand color'}
    :presets=\${brand}
    bind-value=\${color}
  />
</view>`
