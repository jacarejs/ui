export const basic = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]
const period = pulse('week')

export <view>
  <Segmented bind-value=\${period} :options=\${options} />
</view>`

export const strings = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const view = pulse('List')

export <view>
  <Segmented bind-value=\${view} :options=\${['List', 'Grid', 'Board']} />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import Stack from '@jacare/ui/Stack'
import Segmented from '@jacare/ui/Segmented'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]
const sm = pulse('day')
const md = pulse('week')
const lg = pulse('month')

export <view>
  <Stack :gap=\${'md'}>
    <Segmented bind-value=\${sm} :options=\${options} :size=\${'sm'} />
    <Segmented bind-value=\${md} :options=\${options} :size=\${'md'} />
    <Segmented bind-value=\${lg} :options=\${options} :size=\${'lg'} />
  </Stack>
</view>`

export const block = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]
const period = pulse('week')

export <view>
  <Segmented bind-value=\${period} :options=\${options} :block=\${true} />
</view>`

export const optionDisabled = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const plan = pulse('free')

export <view>
  <Segmented
    bind-value=\${plan}
    :options=\${[
      { label: 'Free', value: 'free' },
      { label: 'Pro', value: 'pro' },
      { label: 'Enterprise', value: 'enterprise', disabled: true },
    ]}
  />
</view>`

export const disabled = `import Segmented from '@jacare/ui/Segmented'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]

export <view>
  <Segmented :value=\${'week'} :options=\${options} :disabled=\${true} />
</view>`

export const numeric = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const minutes = pulse(30)
const options = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '60 min', value: 60 },
]

export <view>
  <Segmented bind-value=\${minutes} :options=\${options} />
</view>`

export const change = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const mode = pulse('edit')
const last = pulse('edit')

function onChange(next) {
  last.set(String(next))
}

export <view>
  <Stack :gap=\${'sm'}>
    <Segmented
      bind-value=\${mode}
      :options=\${[
        { label: 'View', value: 'view' },
        { label: 'Edit', value: 'edit' },
        { label: 'Share', value: 'share' },
      ]}
      on-change=\${onChange}
    />
    <Text :tone=\${'muted'}>Last change: \${() => last() || '—'}</Text>
  </Stack>
</view>`

export const twoOptions = `import { pulse } from '@jacare/core'
import Segmented from '@jacare/ui/Segmented'

const theme = pulse('light')

export <view>
  <Segmented
    bind-value=\${theme}
    :options=\${[
      { label: 'Light', value: 'light' },
      { label: 'Dark', value: 'dark' },
    ]}
  />
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Segmented from '@jacare/ui/Segmented'",
    '',
    'const options = [',
    "  { label: 'Day', value: 'day' },",
    "  { label: 'Week', value: 'week' },",
    "  { label: 'Month', value: 'month' },",
    ']',
    `const value = pulse('${quote(state.value)}')`,
    '',
    'export <view>',
    '  <Segmented',
    '    bind-value=\${value}',
    '    :options=\${options}',
  ]
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${quote(state.size)}'}`)
  if (state.block) lines.push('    :block=\${true}')
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('  />', '</view>')
  return lines.join('\n')
}
