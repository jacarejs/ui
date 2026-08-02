export const timestamps = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
   <Timeline>
    <TimelineItem :timestamp=\${'09:00'}>Design tokens updated</TimelineItem>
    <TimelineItem :timestamp=\${'12:00'} :type=\${'success'}>Docs published</TimelineItem>
   </Timeline>
</view>`

export const tones = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :type=\${'primary'}>Build started</TimelineItem>
    <TimelineItem :tone=\${'warning'}>Checks need attention</TimelineItem>
    <TimelineItem :type=\${'danger'}>Deployment stopped</TimelineItem>
  </Timeline>
</view>`

export const placement = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Yesterday'} :placement=\${'top'} :hollow=\${true}>Release candidate created</TimelineItem>
    <TimelineItem :timestamp=\${'Today'} :placement=\${'bottom'} :type=\${'success'}>Release published</TimelineItem>
  </Timeline>
</view>`

export const aliases = `import Timeline from '@jacare/ui/Timeline'
import TimelineItem from '@jacare/ui/TimelineItem'

export <view>
  <Timeline>
    <TimelineItem :timestamp=\${'Review'} :type=\${'warn'}>Approval is still required</TimelineItem>
    <TimelineItem :timestamp=\${'Deploy'} :tone=\${'error'}>Rollback completed</TimelineItem>
  </Timeline>
</view>`
