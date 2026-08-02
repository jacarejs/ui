export const basic = `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open drawer</Button>
  <Drawer bind-open=\${open} :title=\${'Project settings'}>Drawer content</Drawer>
</view>`

export const directions = `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open from left</Button>
  <Drawer bind-open=\${open} :title=\${'Navigation'} :direction=\${'ltr'} :size=\${'22rem'}>
    Workspace navigation
  </Drawer>
</view>`

export const bottom = `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open bottom sheet</Button>
  <Drawer bind-open=\${open} :title=\${'Quick actions'} :direction=\${'btt'} :size=\${'40%'}>
    Choose an action.
  </Drawer>
</view>`

export const persistent = `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open focused task</Button>
  <Drawer bind-open=\${open} :title=\${'Complete setup'} :closeOnClickModal=\${false} :showClose=\${false}>
    <Button on-press=\${() => open.set(false)}>Finish</Button>
  </Drawer>
</view>`

export function playgroundCode({ direction, size, closeOnClickModal, showClose }) {
  return `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open drawer</Button>
  <Drawer bind-open=\${open} :title=\${'Preview'} :direction=\${'${direction}'} :size=\${'${size}'} :closeOnClickModal=\${${closeOnClickModal}} :showClose=\${${showClose}}>
    Drawer content
  </Drawer>
</view>`
}

export const top = `import { pulse } from '@jacare/core'
import Drawer from '@jacare/ui/Drawer'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open top drawer</Button>
  <Drawer bind-open=\${open} :title=\${'Announcements'} :direction=\${'ttb'} :size=\${'16rem'}>
    New release available.
  </Drawer>
</view>`
