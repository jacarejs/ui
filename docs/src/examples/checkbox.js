export const basic = `import { pulse } from '@jacare/core'
import Checkbox from '@jacare/ui/Checkbox'

const checked = pulse(true)

export <view>
  <Checkbox :label=\${'Accept terms'} bind-checked=\${checked} />
</view>`

export const group = `import { pulse } from '@jacare/core'
import Checkbox from '@jacare/ui/Checkbox'
import Stack from '@jacare/ui/Stack'

const email = pulse(true)
const sms = pulse(false)
const push = pulse(true)

export <view>
  <Stack :gap=\${'sm'}>
    <Checkbox :label=\${'Email'} bind-checked=\${email} />
    <Checkbox :label=\${'SMS'} bind-checked=\${sms} />
    <Checkbox :label=\${'Push'} bind-checked=\${push} />
  </Stack>
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import Checkbox from '@jacare/ui/Checkbox'
import Stack from '@jacare/ui/Stack'

const on = pulse(true)
const off = pulse(false)

export <view>
  <Stack :gap=\${'sm'}>
    <Checkbox :label=\${'Enabled'} bind-checked=\${on} />
    <Checkbox :label=\${'Disabled on'} :disabled=\${true} bind-checked=\${on} />
    <Checkbox :label=\${'Disabled off'} :disabled=\${true} bind-checked=\${off} />
  </Stack>
</view>`

export const slotLabel = `import { pulse } from '@jacare/core'
import Checkbox from '@jacare/ui/Checkbox'
import Text from '@jacare/ui/Text'

const checked = pulse(false)

export <view>
  <Checkbox bind-checked=\${checked}>
    <Text :size=\${'sm'}>I agree to the <strong>terms of service</strong></Text>
  </Checkbox>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Checkbox from '@jacare/ui/Checkbox'",
    '',
    `const checked = pulse(${state.checked ? 'true' : 'false'})`,
    '',
    'export <view>',
    '  <Checkbox',
    `    :label=\${'${quote(state.label)}'}`,
  ]
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.name) lines.push(`    :name=\${'${quote(state.name)}'}`)
  lines.push('    bind-checked=\${checked}', '  />', '</view>')
  return lines.join('\n')
}
