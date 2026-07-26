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

export const sizes = `import { pulse } from '@jacare/core'
import ColorPicker from '@jacare/ui/ColorPicker'
import Stack from '@jacare/ui/Stack'

const sm = pulse('#1f6feb')
const md = pulse('#189030')
const lg = pulse('#7c4dff')

export <view>
  <Stack :gap=\${'md'}>
    <ColorPicker :label=\${'Small'} :size=\${'sm'} bind-value=\${sm} />
    <ColorPicker :label=\${'Medium'} :size=\${'md'} bind-value=\${md} />
    <ColorPicker :label=\${'Large'} :size=\${'lg'} bind-value=\${lg} />
  </Stack>
</view>`

export const states = `import { pulse } from '@jacare/core'
import ColorPicker from '@jacare/ui/ColorPicker'
import Stack from '@jacare/ui/Stack'

const error = pulse('#c62828')
const disabled = pulse('#5d4037')
const swatchOnly = pulse('#00897b')

export <view>
  <Stack :gap=\${'md'}>
    <ColorPicker
      :label=\${'With error'}
      :error=\${'Pick a brand-safe green'}
      bind-value=\${error}
    />
    <ColorPicker
      :label=\${'Disabled'}
      :disabled=\${true}
      bind-value=\${disabled}
    />
    <ColorPicker
      :label=\${'Swatch only'}
      :showInput=\${false}
      bind-value=\${swatchOnly}
    />
  </Stack>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import ColorPicker from '@jacare/ui/ColorPicker'",
    '',
    `const color = pulse('${quote(state.value)}')`,
  ]
  if (state.presets?.length) {
    lines.push(`const presets = ${JSON.stringify(state.presets)}`, '')
  } else {
    lines.push('')
  }
  lines.push('export <view>', '  <ColorPicker')
  if (state.label) lines.push(`    :label=\${'${quote(state.label)}'}`)
  if (state.hint) lines.push(`    :hint=\${'${quote(state.hint)}'}`)
  if (state.error) lines.push(`    :error=\${'${quote(state.error)}'}`)
  lines.push(`    :size=\${'${state.size}'}`)
  if (!state.showInput) lines.push('    :showInput=\${false}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.presets?.length) lines.push('    :presets=\${presets}')
  lines.push('    bind-value=\${color}', '  />', '</view>')
  return lines.join('\n')
}
