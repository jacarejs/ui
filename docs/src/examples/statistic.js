export const basic = `import Statistic from '@jacare/ui/Statistic'

export <view>
<Statistic :title=\${'Revenue'} :value=\${12840.5} :prefix=\${'$'} :precision=\${1} />
</view>`

export const suffix = `import Statistic from '@jacare/ui/Statistic'

export <view>
<Statistic :title=\${'Availability'} :value=\${99.95} :suffix=\${'%'} :precision=\${2} />
</view>`

export const precision = `import Stack from '@jacare/ui/Stack'
import Statistic from '@jacare/ui/Statistic'

export <view>
<Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Statistic :title=\${'Whole'} :value=\${42.875} :precision=\${0} />
    <Statistic :title=\${'One decimal'} :value=\${42.875} :precision=\${1} />
    <Statistic :title=\${'Three decimals'} :value=\${42.875} :precision=\${3} />
  </Stack>
</view>`

export const string = `import Statistic from '@jacare/ui/Statistic'

export <view>
<Statistic :title=\${'Release'} :value=\${'v2.4.0'} />
</view>`

export const dashboard = `import Stack from '@jacare/ui/Stack'
import Statistic from '@jacare/ui/Statistic'

export <view>
<Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Statistic :title=\${'Downloads'} :value=\${24800} />
    <Statistic :title=\${'Errors'} :value=\${0.12} :suffix=\${'%'} :precision=\${2} />
    <Statistic :title=\${'MRR'} :value=\${18420} :prefix=\${'$'} />
  </Stack>
</view>`

export const animation = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Statistic from '@jacare/ui/Statistic'
import Stack from '@jacare/ui/Stack'

const value = pulse(268500)

function toggle() {
  value.set(value() === 268500 ? 12840 : 268500)
}

export <view>
  <Stack :gap=\${'md'}>
    <Statistic :title=\${'Active users'} :value=\${value} :duration=\${1600} />
    <Button on-press=\${toggle}>Replay</Button>
  </Stack>
</view>`

export const noAnimation = `import Statistic from '@jacare/ui/Statistic'

export <view>
  <Statistic :title=\${'Static'} :value=\${9001} :duration=\${0} />
</view>`
