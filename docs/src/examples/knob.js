export const basic = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(50)

export <view>
  <Knob bind-value=\${value} />
</view>`

export const minMax = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(10)

export <view>
  <Knob :min=\${-50} :max=\${50} bind-value=\${value} />
</view>`

export const stepExample = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(50)

export <view>
  <Knob :step=\${10} bind-value=\${value} />
</view>`

export const templateExample = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(60)

export <view>
  <Knob :valueTemplate=\${'{value}%'} bind-value=\${value} />
</view>`

export const strokeExample = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(40)

export <view>
  <Knob :strokeWidth=\${5} bind-value=\${value} />
</view>`

export const sizeExample = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(60)

export <view>
  <Knob :size=\${200} bind-value=\${value} />
</view>`

export const colorExample = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'

const value = pulse(50)

export <view>
  <Knob
    :valueColor=\${'PeachPuff'}
    :rangeColor=\${'MediumTurquoise'}
    :textColor=\${'#0f172a'}
    bind-value=\${value}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Knob from '@jacare/ui/Knob'
import Stack from '@jacare/ui/Stack'

const value = pulse(0)

export <view>
  <Stack :gap=\${'md'}>
    <Knob :size=\${150} :readonly=\${true} bind-value=\${value} />
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button
        :label=\${'+'}
        :iconOnly=\${true}
        :disabled=\${() => value() >= 100}
        on-click=\${() => value.set(Math.min(100, value() + 1))}
      />
      <Button
        :label=\${'−'}
        :iconOnly=\${true}
        :disabled=\${() => value() <= 0}
        on-click=\${() => value.set(Math.max(0, value() - 1))}
      />
    </Stack>
  </Stack>
</view>`

export const states = `import { pulse } from '@jacare/core'
import Knob from '@jacare/ui/Knob'
import Stack from '@jacare/ui/Stack'

const locked = pulse(50)
const off = pulse(75)

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'}>
    <Knob :label=\${'Read only'} :readonly=\${true} bind-value=\${locked} />
    <Knob :label=\${'Disabled'} :disabled=\${true} bind-value=\${off} />
  </Stack>
</view>`
