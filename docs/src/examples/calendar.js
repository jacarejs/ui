export const basic = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'

const selected = pulse('2026-08-01')

export <view>
  <Calendar bind-value=\${selected} />
</view>`

export const multiple = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const dates = pulse(['2026-08-03', '2026-08-10', '2026-08-17'])

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar :multiple=\${true} bind-value=\${dates} />
    <Text :tone=\${'muted'}>Selected: \${() => dates().join(', ') || '—'}</Text>
  </Stack>
</view>`

export const rangeExample = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const trip = pulse(['2026-08-10', '2026-08-16'])

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar :range=\${true} bind-value=\${trip} />
    <Text :tone=\${'muted'}>
      Stay: \${() => trip().length === 2 ? trip()[0] + ' → ' + trip()[1] : 'Pick start and end'}
    </Text>
  </Stack>
</view>`

export const markers = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const day = pulse('2026-08-12')
const markers = [
  { date: '2026-08-03', color: 'success', label: 'Available' },
  { date: '2026-08-08', color: 'warn', label: 'Limited' },
  { date: '2026-08-12', color: 'primary', label: 'Interview' },
  { date: '2026-08-12', color: 'info', label: 'Follow-up' },
  { date: '2026-08-19', color: 'danger', label: 'Blocked' },
  { date: '2026-08-22', color: '#7c3aed', label: 'Launch' },
]

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar :markers=\${markers} bind-value=\${day} />
    <Text :tone=\${'muted'}>Dots mark schedule status without replacing the selected day.</Text>
  </Stack>
</view>`

export const tooltipsExample = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const day = pulse('2026-08-12')
const markers = [
  { date: '2026-08-03', color: 'success', label: 'Open slots · 4 remaining' },
  { date: '2026-08-08', color: 'warn', label: 'Limited · afternoon only' },
  { date: '2026-08-12', color: 'primary', label: 'Interview · 10:30' },
  { date: '2026-08-12', color: 'info', label: 'Follow-up call · 15:00' },
  { date: '2026-08-19', color: 'danger', label: 'Blocked · holiday' },
  { date: '2026-08-22', color: '#7c3aed', label: 'Product launch' },
]

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar :markers=\${markers} :tooltips=\${true} bind-value=\${day} />
    <Text :tone=\${'muted'}>Hover a dotted day to read marker labels in a floating tooltip.</Text>
  </Stack>
</view>`

export const scheduling = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const window = pulse(['2026-08-18', '2026-08-22'])
const markers = [
  { date: '2026-08-18', color: 'success', label: 'Kickoff' },
  { date: '2026-08-20', color: 'primary', label: 'Review' },
  { date: '2026-08-22', color: 'warn', label: 'Deadline' },
]

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar
      :range=\${true}
      :markers=\${markers}
      :min=\${'2026-08-01'}
      :max=\${'2026-08-31'}
      bind-value=\${window}
    />
    <Text :tone=\${'muted'}>August booking window with colored agenda dots.</Text>
  </Stack>
</view>`

export const advanced = `import { pulse } from '@jacare/core'
import Calendar from '@jacare/ui/Calendar'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const sessions = pulse(['2026-08-05', '2026-08-12', '2026-08-26'])
const markers = [
  { date: '2026-08-05', color: 'success', label: 'Clinic A' },
  { date: '2026-08-05', color: 'info', label: 'Clinic B' },
  { date: '2026-08-12', color: 'primary', label: 'Workshop' },
  { date: '2026-08-19', color: 'danger', label: 'Holiday' },
  { date: '2026-08-26', color: 'warn', label: 'Overflow' },
]

export <view>
  <Stack :gap=\${'sm'}>
    <Calendar
      :multiple=\${true}
      :markers=\${markers}
      :min=\${'2026-08-01'}
      :max=\${'2026-08-31'}
      bind-value=\${sessions}
    />
    <Text :tone=\${'muted'}>
      Multi-day clinic schedule. Holiday dots stay visible even when not selected.
    </Text>
  </Stack>
</view>`

export const past = `import Calendar from '@jacare/ui/Calendar'

export <view>
  <Calendar :value=\${'2024-02-29'} />
</view>`

export const future = `import Calendar from '@jacare/ui/Calendar'

export <view>
  <Calendar :value=\${'2030-12-25'} />
</view>`

export const empty = `import Calendar from '@jacare/ui/Calendar'

export <view>
  <Calendar :value=\${''} />
</view>`
