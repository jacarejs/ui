export const basic = `import { pulse } from '@jacare/core'
import Checkbox from '@jacare/ui/Checkbox'

const checked = pulse(true)

export <view>
  <Checkbox :label=\${'Accept terms'} bind-checked=\${checked} />
</view>`
