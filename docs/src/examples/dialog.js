export const basic = `import { pulse } from '@jacare/core'
import Dialog from '@jacare/ui/Dialog'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

const open = pulse(false)

export <view>
      <Button on-press=\${() => open.set(true)}>Open dialog</Button>
      <Dialog bind-open=\${open} :title=\${'Project details'}>
        <p>Review the project settings before saving.</p>
        <Space><Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Cancel</Button><Button on-press=\${() => open.set(false)}>Save</Button></Space>
      </Dialog>
</view>`

export const small = `import { pulse } from '@jacare/core'
import Dialog from '@jacare/ui/Dialog'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

const open = pulse(false)

export <view>
      <Button :size=\${'sm'} on-press=\${() => open.set(true)}>Open small</Button>
      <Dialog bind-open=\${open} :title=\${'Rename item'} :size=\${'sm'}>
        <p>Small keeps the task focused.</p>
      </Dialog>
</view>`

export const large = `import { pulse } from '@jacare/core'
import Dialog from '@jacare/ui/Dialog'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

const open = pulse(false)

export <view>
      <Button on-press=\${() => open.set(true)}>Open large</Button>
      <Dialog bind-open=\${open} :title=\${'Release review'} :size=\${'lg'}>
        <p>Use the larger surface for multi-section summaries, not simple confirmations.</p>
      </Dialog>
</view>`

export const medium = `import { pulse } from '@jacare/core'
import Dialog from '@jacare/ui/Dialog'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open medium</Button>
  <Dialog bind-open=\${open} :title=\${'Edit profile'} :size=\${'md'}>
    <p>Medium is the default size for most dialog content.</p>
  </Dialog>
</view>`
