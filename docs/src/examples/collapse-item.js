export const namedPanels = `import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

export <view>
   <Collapse :value=\${['overview']}>
    <CollapseItem :name=\${'overview'} :title=\${'Overview'}>Generated docs pages can stay intentionally short.</CollapseItem>
    <CollapseItem :name=\${'api'} :title=\${'API'}>Use the contract table below for the full surface area.</CollapseItem>
   </Collapse>
</view>`

export const accordion = `import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

export <view>
  <Collapse :value=\${'billing'} :accordion=\${true}>
    <CollapseItem :name=\${'billing'} :title=\${'Billing'}>Manage invoices and payment methods.</CollapseItem>
    <CollapseItem :name=\${'security'} :title=\${'Security'}>Review sessions and access keys.</CollapseItem>
  </Collapse>
</view>`

export const disabled = `import Collapse from '@jacare/ui/Collapse'
import CollapseItem from '@jacare/ui/CollapseItem'

export <view>
  <Collapse :value=\${['available']}>
    <CollapseItem :name=\${'available'} :title=\${'Available'}>This panel can be toggled.</CollapseItem>
    <CollapseItem :name=\${'locked'} :title=\${'Locked'} :disabled=\${true}>Complete setup to unlock.</CollapseItem>
  </Collapse>
</view>`
