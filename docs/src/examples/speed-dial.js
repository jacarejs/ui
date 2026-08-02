export const sampleItems = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export const circleItems = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
  { label: 'Alert', icon: 'alert' },
]

export const basic = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const open = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <SpeedDial :items=\${items} bind-visible=\${open} />
</view>`

export const linear = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const up = pulse(false)
const down = pulse(false)
const left = pulse(false)
const right = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <div class="speed-dial-board">
    <div class="speed-dial-board__bottom-center">
      <SpeedDial :items=\${items} :direction=\${'up'} bind-visible=\${up} />
    </div>
    <div class="speed-dial-board__top-center">
      <SpeedDial :items=\${items} :direction=\${'down'} bind-visible=\${down} />
    </div>
    <div class="speed-dial-board__middle-right">
      <SpeedDial :items=\${items} :direction=\${'left'} bind-visible=\${left} />
    </div>
    <div class="speed-dial-board__middle-left">
      <SpeedDial :items=\${items} :direction=\${'right'} bind-visible=\${right} />
    </div>
  </div>
</view>`

export const circle = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const open = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
  { label: 'Alert', icon: 'alert' },
]

export <view>
  <SpeedDial :items=\${items} :type=\${'circle'} :radius=\${80} bind-visible=\${open} />
</view>`

export const semiCircle = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const up = pulse(false)
const down = pulse(false)
const left = pulse(false)
const right = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <div class="speed-dial-board">
    <div class="speed-dial-board__bottom-center">
      <SpeedDial :items=\${items} :type=\${'semi-circle'} :direction=\${'up'} :radius=\${80} bind-visible=\${up} />
    </div>
    <div class="speed-dial-board__top-center">
      <SpeedDial :items=\${items} :type=\${'semi-circle'} :direction=\${'down'} :radius=\${80} bind-visible=\${down} />
    </div>
    <div class="speed-dial-board__middle-right">
      <SpeedDial :items=\${items} :type=\${'semi-circle'} :direction=\${'left'} :radius=\${80} bind-visible=\${left} />
    </div>
    <div class="speed-dial-board__middle-left">
      <SpeedDial :items=\${items} :type=\${'semi-circle'} :direction=\${'right'} :radius=\${80} bind-visible=\${right} />
    </div>
  </div>
</view>`

export const quarterCircle = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const upLeft = pulse(false)
const upRight = pulse(false)
const downLeft = pulse(false)
const downRight = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <div class="speed-dial-board">
    <div class="speed-dial-board__bottom-right">
      <SpeedDial :items=\${items} :type=\${'quarter-circle'} :direction=\${'up-left'} :radius=\${80} bind-visible=\${upLeft} />
    </div>
    <div class="speed-dial-board__bottom-left">
      <SpeedDial :items=\${items} :type=\${'quarter-circle'} :direction=\${'up-right'} :radius=\${80} bind-visible=\${upRight} />
    </div>
    <div class="speed-dial-board__top-right">
      <SpeedDial :items=\${items} :type=\${'quarter-circle'} :direction=\${'down-left'} :radius=\${80} bind-visible=\${downLeft} />
    </div>
    <div class="speed-dial-board__top-left">
      <SpeedDial :items=\${items} :type=\${'quarter-circle'} :direction=\${'down-right'} :radius=\${80} bind-visible=\${downRight} />
    </div>
  </div>
</view>`

export const delayExample = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const open = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <SpeedDial :items=\${items} :transitionDelay=\${80} bind-visible=\${open} />
</view>`

export const tooltipExample = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const open = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <SpeedDial :items=\${items} :tooltip=\${true} :direction=\${'up'} bind-visible=\${open} />
</view>`

export const maskExample = `import { pulse } from '@jacare/core'
import SpeedDial from '@jacare/ui/SpeedDial'

const open = pulse(false)
const items = [
  { label: 'Add', icon: 'plus' },
  { label: 'Search', icon: 'search' },
  { label: 'Profile', icon: 'user' },
  { label: 'Info', icon: 'info' },
]

export <view>
  <SpeedDial :items=\${items} :mask=\${true} :direction=\${'up'} bind-visible=\${open} />
</view>`
