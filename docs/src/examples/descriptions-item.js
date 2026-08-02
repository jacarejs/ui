export const labeledValues = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
   <Descriptions :title=\${'Project details'} :column=\${2} :border=\${true}>
    <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>Beta</DescriptionsItem>
    <DescriptionsItem :label=\${'Package'} :span=\${2}>@jacare/ui</DescriptionsItem>
   </Descriptions>
</view>`

export const spanningItem = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Deployment'} :column=\${3}>
    <DescriptionsItem :label=\${'Region'}>us-east-1</DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>Healthy</DescriptionsItem>
    <DescriptionsItem :label=\${'URL'} :span=\${3}>https://example.com</DescriptionsItem>
  </Descriptions>
</view>`

export const vertical = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :column=\${2} :direction=\${'vertical'} :border=\${true}>
    <DescriptionsItem :label=\${'Plan'}>Team</DescriptionsItem>
    <DescriptionsItem :label=\${'Seats'}>12</DescriptionsItem>
    <DescriptionsItem :label=\${'Notes'} :span=\${2}>Renews on September 1.</DescriptionsItem>
  </Descriptions>
</view>`
