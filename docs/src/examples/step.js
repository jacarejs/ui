export const composition = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1}>
    <Step :title=\${'Profile'} :description=\${'Complete'} />
    <Step :title=\${'Verification'} :description=\${'In progress'} />
    <Step :title=\${'Ready'} />
  </Steps>
</view>`

export const overrides = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps>
    <Step :title=\${'Synced'} :status=\${'success'} :icon=\${'✓'} />
    <Step :title=\${'Needs attention'} :status=\${'error'} :icon=\${'!'} />
    <Step :title=\${'Queued'} :status=\${'wait'} />
  </Steps>
</view>`

export const all_statuses = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps>
    <Step :title=\${'Waiting'} :status=\${'wait'} />
    <Step :title=\${'Processing'} :status=\${'process'} />
    <Step :title=\${'Finished'} :status=\${'finish'} />
    <Step :title=\${'Successful'} :status=\${'success'} />
    <Step :title=\${'Failed'} :status=\${'error'} />
  </Steps>
</view>`

export const body_content = `import Steps from '@jacare/ui/Steps'
import Step from '@jacare/ui/Step'

export <view>
  <Steps :active=\${1} :direction=\${'vertical'}>
    <Step :title=\${'Order'} :description=\${'Received'} :icon=\${'✓'}>Order #1048</Step>
    <Step :title=\${'Delivery'} :description=\${'Today, 14:00'} :icon=\${'🚚'}>Track the courier</Step>
  </Steps>
</view>`
