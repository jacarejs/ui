export const composition = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'preview'}>
    <TabPane :name=\${'preview'} :label=\${'Preview'}>Rendered document</TabPane>
    <TabPane :name=\${'source'} :label=\${'Source'}>Document source</TabPane>
  </Tabs>
</view>`

export const disabled = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'public'} :type=\${'card'}>
    <TabPane :name=\${'public'} :label=\${'Public'}>Visible to everyone</TabPane>
    <TabPane :name=\${'private'} :label=\${'Private'} :disabled=\${true}>Permission required</TabPane>
  </Tabs>
</view>`

export const content = `import { pulse } from '@jacare/core'
import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

const active = pulse('details')

export <view>
  <Tabs bind-value=\${active}>
    <TabPane :name=\${'details'} :label=\${'Details'}>
      <h3>Release details</h3>
      <p>Version 2.0 is ready for review.</p>
    </TabPane>
    <TabPane :name=\${'logs'}>Logs</TabPane>
    <TabPane :name=\${'admin'} :label=\${'Admin'} :disabled=\${true}>Restricted content</TabPane>
  </Tabs>
</view>`
