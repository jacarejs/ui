export const basic = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'09:30'}>Draft created</TimelineItem>
    <TimelineItem :timestamp=\${'10:15'} :type=\${'success'}>Review approved</TimelineItem>
    <TimelineItem :timestamp=\${'11:00'} :type=\${'info'}>Release scheduled</TimelineItem>
  </Timeline>
</view>`

export const dashed = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline :line=\${'dashed'}>
    <TimelineItem :timestamp=\${'09:30'}>Draft created</TimelineItem>
    <TimelineItem :timestamp=\${'10:15'} :type=\${'success'}>Review approved</TimelineItem>
    <TimelineItem :timestamp=\${'11:00'} :type=\${'info'} :hollow=\${true}>Waiting to ship</TimelineItem>
  </Timeline>
</view>`

export const spacious = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline :gap=\${'lg'} :line=\${'dashed'}>
    <TimelineItem :timestamp=\${'Morning'}>Kickoff and scope lock</TimelineItem>
    <TimelineItem :timestamp=\${'Afternoon'} :type=\${'info'}>Design review with product</TimelineItem>
    <TimelineItem :timestamp=\${'Evening'} :type=\${'success'}>Build tagged for staging</TimelineItem>
  </Timeline>
</view>`

export const gaps = `import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'
import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Stack :gap=\${'sm'}>
      <Text :weight=\${'bold'}>gap sm</Text>
      <Timeline :gap=\${'sm'}>
        <TimelineItem :timestamp=\${'A'}>Compact</TimelineItem>
        <TimelineItem :timestamp=\${'B'} :type=\${'info'}>Steps</TimelineItem>
        <TimelineItem :timestamp=\${'C'} :type=\${'success'}>Closer</TimelineItem>
      </Timeline>
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :weight=\${'bold'}>gap md</Text>
      <Timeline :gap=\${'md'}>
        <TimelineItem :timestamp=\${'A'}>Default</TimelineItem>
        <TimelineItem :timestamp=\${'B'} :type=\${'info'}>Breathing</TimelineItem>
        <TimelineItem :timestamp=\${'C'} :type=\${'success'}>Room</TimelineItem>
      </Timeline>
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :weight=\${'bold'}>gap lg</Text>
      <Timeline :gap=\${'lg'}>
        <TimelineItem :timestamp=\${'A'}>Spacious</TimelineItem>
        <TimelineItem :timestamp=\${'B'} :type=\${'info'}>Story</TimelineItem>
        <TimelineItem :timestamp=\${'C'} :type=\${'success'}>Timeline</TimelineItem>
      </Timeline>
    </Stack>
  </Stack>
</view>`

export const reverse = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline :reverse=\${true}>
    <TimelineItem :timestamp=\${'Monday'}>Issue opened</TimelineItem>
    <TimelineItem :timestamp=\${'Tuesday'} :type=\${'warning'}>Changes requested</TimelineItem>
    <TimelineItem :timestamp=\${'Wednesday'} :type=\${'success'}>Issue resolved</TimelineItem>
  </Timeline>
</view>`

export const types = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Default'} :type=\${'primary'}>Primary / default node</TimelineItem>
    <TimelineItem :timestamp=\${'Success'} :type=\${'success'}>Checks passed</TimelineItem>
    <TimelineItem :timestamp=\${'Info'} :type=\${'info'}>Waiting on review</TimelineItem>
    <TimelineItem :timestamp=\${'Warning'} :type=\${'warning'}>Needs attention</TimelineItem>
    <TimelineItem :timestamp=\${'Danger'} :type=\${'danger'}>Deployment blocked</TimelineItem>
  </Timeline>
</view>`

export const hollow = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Queued'} :hollow=\${true}>Waiting for a runner</TimelineItem>
    <TimelineItem :timestamp=\${'Running'} :type=\${'primary'} :hollow=\${true}>Building packages</TimelineItem>
    <TimelineItem :timestamp=\${'Done'} :type=\${'success'}>Artifacts published</TimelineItem>
  </Timeline>
</view>`

export const placement = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Queued'} :placement=\${'top'} :hollow=\${true}>Waiting for a runner</TimelineItem>
    <TimelineItem :timestamp=\${'Running'} :placement=\${'top'} :type=\${'primary'}>Building packages</TimelineItem>
    <TimelineItem :timestamp=\${'Failed'} :placement=\${'top'} :type=\${'danger'}>Tests need attention</TimelineItem>
  </Timeline>
</view>`

export const rich = `import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'
import Text from '@jacare/ui/Text'
import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'09:12'} :type=\${'info'}>
      <Stack :gap=\${'sm'}>
        <Text :weight=\${'bold'}>Pull request opened</Text>
        <Text :tone=\${'muted'} :size=\${'sm'}>ada opened #482 against main.</Text>
        <Tag :text=\${'review'} :type=\${'info'} :size=\${'sm'} />
      </Stack>
    </TimelineItem>
    <TimelineItem :timestamp=\${'09:40'} :type=\${'success'}>
      <Stack :gap=\${'sm'}>
        <Text :weight=\${'bold'}>Checks green</Text>
        <Text :tone=\${'muted'} :size=\${'sm'}>lint, unit, and visual tests passed.</Text>
        <Tag :text=\${'ci'} :type=\${'success'} :size=\${'sm'} />
      </Stack>
    </TimelineItem>
    <TimelineItem :timestamp=\${'10:05'} :type=\${'warning'}>
      <Stack :gap=\${'sm'}>
        <Text :weight=\${'bold'}>Changes requested</Text>
        <Text :tone=\${'muted'} :size=\${'sm'}>Tighten the empty-state copy before merge.</Text>
        <Tag :text=\${'design'} :type=\${'warning'} :size=\${'sm'} />
      </Stack>
    </TimelineItem>
  </Timeline>
</view>`

export const release = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Aug 1, 09:00'} :type=\${'success'}>Version 2.4 deployed</TimelineItem>
    <TimelineItem :timestamp=\${'Aug 1, 09:12'} :type=\${'info'}>Health checks passed</TimelineItem>
    <TimelineItem :timestamp=\${'Aug 1, 09:30'} :hollow=\${true}>Release notes published</TimelineItem>
  </Timeline>
</view>`

export const inCard = `import Card from '@jacare/ui/Card'
import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Card :title=\${'Shipment'} :subtitle=\${'Order #1842'}>
    <Timeline>
      <TimelineItem :timestamp=\${'Yesterday'} :type=\${'success'}>Order confirmed</TimelineItem>
      <TimelineItem :timestamp=\${'Today, 08:10'} :type=\${'info'}>Picked up by carrier</TimelineItem>
      <TimelineItem :timestamp=\${'Today, 14:40'} :hollow=\${true}>Out for delivery</TimelineItem>
    </Timeline>
  </Card>
</view>`

export function playgroundCode(state) {
  const attrs = []
  if (state.reverse) attrs.push(':reverse=${true}')
  if (state.line === 'dashed') attrs.push(":line=${'dashed'}")
  if (state.gap && state.gap !== 'md') attrs.push(`:gap=\${'${state.gap}'}`)
  const open = attrs.length ? `  <Timeline ${attrs.join(' ')}>` : '  <Timeline>'
  const lines = [
    "import Timeline from '@jacare/ui/Timeline'",
    "import TimelineItem from '@jacare/ui/TimelineItem'",
    '',
    'export <view>',
    open,
    "    <TimelineItem :timestamp=${'09:30'}>Draft created</TimelineItem>",
    "    <TimelineItem :timestamp=${'10:15'} :type=${'success'}>Review approved</TimelineItem>",
    "    <TimelineItem :timestamp=${'11:00'} :type=${'info'}>Release scheduled</TimelineItem>",
    '  </Timeline>',
    '</view>',
  ]
  return lines.join('\n')
}
