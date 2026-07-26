export const basic = `import { pulse } from '@jacare/core'
import Switch from '@jacare/ui/Switch'

const checked = pulse(true)

export <view>
  <Switch :label=\${'Notifications'} bind-checked=\${checked} />
</view>`
