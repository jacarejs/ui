export const basic = `import { pulse } from '@jacare/core'
import Switch from '@jacare/ui/Switch'

const checked = pulse(true)

export <view>
  <Switch :label=\${'Notifications'} bind-checked=\${checked} />
</view>`

export const settings = `import { pulse } from '@jacare/core'
import Switch from '@jacare/ui/Switch'
import Stack from '@jacare/ui/Stack'

const dark = pulse(true)
const sync = pulse(false)
const sound = pulse(true)

export <view>
  <Stack :gap=\${'md'}>
    <Switch :label=\${'Dark mode'} bind-checked=\${dark} />
    <Switch :label=\${'Auto sync'} bind-checked=\${sync} />
    <Switch :label=\${'Sound effects'} bind-checked=\${sound} />
  </Stack>
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import Switch from '@jacare/ui/Switch'
import Stack from '@jacare/ui/Stack'

const on = pulse(true)
const off = pulse(false)

export <view>
  <Stack :gap=\${'md'}>
    <Switch :label=\${'Enabled'} bind-checked=\${on} />
    <Switch :label=\${'Disabled on'} :disabled=\${true} bind-checked=\${on} />
    <Switch :label=\${'Disabled off'} :disabled=\${true} bind-checked=\${off} />
  </Stack>
</view>`

export const slotLabel = `import { pulse } from '@jacare/core'
import Switch from '@jacare/ui/Switch'
import Text from '@jacare/ui/Text'

const checked = pulse(true)

export <view>
  <Switch bind-checked=\${checked}>
    <Text :size=\${'sm'}>Apply changes immediately</Text>
  </Switch>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Switch from '@jacare/ui/Switch'",
    '',
    `const checked = pulse(${state.checked ? 'true' : 'false'})`,
    '',
    'export <view>',
    '  <Switch',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.name) lines.push(`    :name=\${'${quote(state.name)}'}`)
  lines.push('    bind-checked=\${checked}', '  />', '</view>')
  return lines.join('\n')
}
