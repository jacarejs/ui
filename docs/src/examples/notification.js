export const basic = `import Notification from '@jacare/ui/Notification'

export <view>
  <Notification :title=\${'Release published'} :message=\${'Version 1.4 is now available.'} />
</view>`

export const types = `import Notification from '@jacare/ui/Notification'

export <view>
  <div style="display:grid;gap:0.75rem">
    <Notification :type=\${'primary'} :title=\${'Primary'} :message=\${'A primary update.'} />
    <Notification :type=\${'success'} :title=\${'Complete'} :message=\${'All checks passed.'} />
    <Notification :type=\${'warning'} :title=\${'Attention'} :message=\${'Two checks need review.'} />
    <Notification :type=\${'info'} :title=\${'Information'} :message=\${'A new version is available.'} />
    <Notification :type=\${'error'} :title=\${'Failed'} :message=\${'Deployment failed.'} />
  </div>
</view>`

export const close = `import { pulse } from '@jacare/core'
import Notification from '@jacare/ui/Notification'

const visible = pulse(true)

export <view>
  #if visible()
    <Notification :title=\${'Sync active'} :message=\${'Close when acknowledged.'} on-close=\${() => visible.set(false)} />
  #end
</view>`

export const service = `import { Notification } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

export <view>
  <Button on-press=\${() => Notification.success({
    title: 'Deployment complete',
    message: 'Production is healthy.',
    position: 'bottom-right',
  })}>Show notification</Button>
</view>`

export const positions = `import { Notification } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

export <view>
  #for ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as position
    <Button on-press=\${() => Notification({ title: position, message: 'Corner placement', position })}>\${position}</Button>
  #end
</view>`

export const sticky = `import { Notification } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

function showSticky() {
  Notification.warning({ title: 'Sticky notice', message: 'Use Close all to dismiss.', duration: 0, showClose: false })
}

export <view>
  <Button on-press=\${showSticky}>Show sticky</Button>
  <Button on-press=\${Notification.closeAll}>Close all</Button>
</view>`
