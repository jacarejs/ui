export const basic = `import Message from '@jacare/ui/Message'

export <view>
  <Message :message=\${'Your changes were saved.'} />
</view>`

export const types = `import Message from '@jacare/ui/Message'

export <view>
  <div style="display:grid;gap:0.75rem">
    <Message :type=\${'primary'} :message=\${'Primary action available'} />
    <Message :type=\${'success'} :message=\${'Deployment complete'} />
    <Message :type=\${'warning'} :message=\${'Review two fields'} />
    <Message :type=\${'info'} :message=\${'A new version is available'} />
    <Message :type=\${'error'} :message=\${'Could not save'} />
  </div>
</view>`

export const plain = `import Message from '@jacare/ui/Message'

export <view>
  <Message :type=\${'primary'} :plain=\${true} :message=\${'A quiet inline update'} />
</view>`

export const closable = `import { pulse } from '@jacare/core'
import Message from '@jacare/ui/Message'

const visible = pulse(true)

export <view>
  #if visible()
    <Message :showClose=\${true} :message=\${'Dismiss this message'} on-close=\${() => visible.set(false)} />
  #end
</view>`

export const service = `import { Message } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

export <view>
  <Button on-press=\${() => Message.success({ message: 'Saved', showClose: true })}>
    Show message
  </Button>
</view>`

export const placements = `import { Message } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

export <view>
  <div style="display:flex;gap:.5rem;flex-wrap:wrap">
    #for ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'] as placement
      <Button on-press=\${() => Message({ message: placement, placement, showClose: true })}>\${placement}</Button>
    #end
  </div>
</view>`

export const close_all = `import { Message } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

function openMany() {
  Message.primary({ message: 'Primary', duration: 0, plain: true })
  Message.info({ message: 'Information', duration: 0 })
  Message.error({ message: 'Error', duration: 0, showClose: true })
}

export <view>
  <Button on-press=\${openMany}>Open persistent messages</Button>
  <Button on-press=\${Message.closeAll}>Close all</Button>
</view>`
