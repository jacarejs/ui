export const basic = `import MeterGroup from '@jacare/ui/MeterGroup'

const value = [
  { label: 'Storage', value: 35 },
  { label: 'Apps', value: 25 },
  { label: 'Media', value: 40 },
]

export <view>
  <MeterGroup :value=\${value} />
</view>`

export const colors = `import MeterGroup from '@jacare/ui/MeterGroup'

const value = [
  { label: 'Completed', value: 52, color: 'var(--j-primary)' },
  { label: 'In progress', value: 28, color: '#d97706' },
  { label: 'Blocked', value: 20, color: '#b91c1c' },
]

export <view>
  <MeterGroup :value=\${value} />
</view>`

export const icons = `import MeterGroup from '@jacare/ui/MeterGroup'

const value = [
  { label: 'Email', value: 30, icon: '✉️' },
  { label: 'Chat', value: 45, icon: '💬' },
  { label: 'Phone', value: 25, icon: '📞' },
]

export <view>
  <MeterGroup :value=\${value} />
</view>`

export const vertical = `import MeterGroup from '@jacare/ui/MeterGroup'
import Stack from '@jacare/ui/Stack'

const value = [
  { label: 'North', value: 30, color: '#0891b2' },
  { label: 'South', value: 45, color: '#059669' },
  { label: 'East', value: 25, color: '#7c3aed' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <MeterGroup :value=\${value} :orientation=\${'vertical'} />
    <MeterGroup :value=\${value} :orientation=\${'vertical'} :labelOrientation=\${'vertical'} />
  </Stack>
</view>`

export const normalized = `import MeterGroup from '@jacare/ui/MeterGroup'

const value = [
  { label: 'A', value: 60 },
  { label: 'B', value: 80 },
  { label: 'C', value: 40 },
]

export <view>
  <MeterGroup :value=\${value} :max=\${100} />
</view>`
