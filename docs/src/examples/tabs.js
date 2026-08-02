export const basic = `import { pulse } from '@jacare/core'
import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

const active = pulse('overview')

export <view>
  <Tabs bind-value=\${active}>
    <TabPane :name=\${'overview'} :label=\${'Overview'}>Project summary</TabPane>
    <TabPane :name=\${'activity'} :label=\${'Activity'}>Recent changes</TabPane>
  </Tabs>
</view>`

export const cards = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'team'} :type=\${'card'}>
    <TabPane :name=\${'team'} :label=\${'Team'}>12 collaborators</TabPane>
    <TabPane :name=\${'billing'} :label=\${'Billing'}>Pro plan</TabPane>
  </Tabs>
</view>`

export const border_card = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'details'} :type=\${'border-card'}>
    <TabPane :name=\${'details'} :label=\${'Details'}>Release 1.4</TabPane>
    <TabPane :name=\${'checks'} :label=\${'Checks'}>All checks passed</TabPane>
  </Tabs>
</view>`

export const positions = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'general'} :tabPosition=\${'left'}>
    <TabPane :name=\${'general'} :label=\${'General'}>Workspace settings</TabPane>
    <TabPane :name=\${'members'} :label=\${'Members'}>Manage access</TabPane>
  </Tabs>
</view>`

export const disabled = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <Tabs :value=\${'available'} :stretch=\${true}>
    <TabPane :name=\${'available'} :label=\${'Available'}>Ready to use</TabPane>
    <TabPane :name=\${'locked'} :label=\${'Locked'} :disabled=\${true}>Upgrade required</TabPane>
  </Tabs>
</view>`

export function playgroundCode({ value, type, tabPosition, stretch }) {
  return `import { pulse } from '@jacare/core'
import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

const active = pulse('${value}')

export <view>
  <Tabs bind-value=\${active} :type=\${'${type}'} :tabPosition=\${'${tabPosition}'} :stretch=\${${stretch}}>
    <TabPane :name=\${'overview'} :label=\${'Overview'}>Project summary</TabPane>
    <TabPane :name=\${'activity'} :label=\${'Activity'}>Recent changes</TabPane>
  </Tabs>
</view>`
}

export const all_positions = `import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

export <view>
  <div style="display:grid;gap:1.5rem">
    #for ['top', 'right', 'bottom', 'left'] as position
      <Tabs :value=\${'one'} :tabPosition=\${position}>
        <TabPane :name=\${'one'} :label=\${'One'}>\${position} tabs</TabPane>
        <TabPane :name=\${'two'} :label=\${'Two'}>Second pane</TabPane>
      </Tabs>
    #end
  </div>
</view>`

export const click_event = `import { pulse } from '@jacare/core'
import Tabs from '@jacare/ui/Tabs'
import TabPane from '@jacare/ui/TabPane'

const clicked = pulse('None')

export <view>
  <Tabs :value=\${'one'} on-tabClick=\${(name) => clicked.set(name)}>
    <TabPane :name=\${'one'} :label=\${'One'}>First pane</TabPane>
    <TabPane :name=\${'locked'} :label=\${'Locked'} :disabled=\${true}>Unavailable</TabPane>
  </Tabs>
  <p>Clicked: \${clicked}</p>
</view>`
