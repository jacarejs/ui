export const basic = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1}>
    <Step :title=\${'Account'} :description=\${'Create your profile'} />
    <Step :title=\${'Plan'} :description=\${'Choose a workspace plan'} />
    <Step :title=\${'Finish'} :description=\${'Invite your team'} />
  </Steps>
</view>`

export const controlled = `import { pulse } from '@jacare/core'
import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'
import Button from '@jacare/ui/Button'

const active = pulse(0)

export <view>
  <Steps bind-active=\${active}>
    <Step :title=\${'Draft'} />
    <Step :title=\${'Review'} />
    <Step :title=\${'Publish'} />
  </Steps>
  <Button on-press=\${() => active.set(Math.min(active() + 1, 2))}>Next</Button>
</view>`

export const vertical = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1} :direction=\${'vertical'}>
    <Step :title=\${'Order received'} :description=\${'09:20'} />
    <Step :title=\${'Preparing'} :description=\${'In progress'} />
    <Step :title=\${'Delivered'} />
  </Steps>
</view>`

export const statuses = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${2} :finishStatus=\${'success'} :processStatus=\${'error'}>
    <Step :title=\${'Upload'} />
    <Step :title=\${'Validate'} />
    <Step :title=\${'Deploy'} />
  </Steps>
</view>`

export const simple = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1} :simple=\${true} :alignCenter=\${true}>
    <Step :title=\${'Details'} />
    <Step :title=\${'Payment'} />
    <Step :title=\${'Done'} />
  </Steps>
</view>`

export const centered = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1} :direction=\${'horizontal'} :alignCenter=\${true}>
    <Step :title=\${'Account'} :description=\${'Complete'} :icon=\${'✓'} />
    <Step :title=\${'Profile'} :description=\${'In progress'} :icon=\${'2'} />
    <Step :title=\${'Launch'} :description=\${'Waiting'} :icon=\${'★'} />
  </Steps>
</view>`

export const error_finish = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${2} :finishStatus=\${'error'} :processStatus=\${'success'}>
    <Step :title=\${'Upload'} />
    <Step :title=\${'Scan'} />
    <Step :title=\${'Resolved'} />
  </Steps>
</view>`
