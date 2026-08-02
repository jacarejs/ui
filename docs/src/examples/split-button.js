export const sampleItems = [
  { label: 'Update', icon: 'check' },
  { label: 'Delete', icon: 'close' },
  { separator: true },
  { label: 'Quit', icon: 'external-link' },
]

export const nestedItems = [
  {
    label: 'File',
    icon: 'menu',
    items: [
      { label: 'New', icon: 'plus' },
      { label: 'Open', icon: 'search' },
    ],
  },
  {
    label: 'Edit',
    icon: 'info',
    items: [
      { label: 'Copy', icon: 'check' },
      { label: 'Remove', icon: 'close' },
    ],
  },
  { separator: true },
  { label: 'Quit', icon: 'external-link' },
]

export const basic = `import SplitButton from '@jacare/ui/SplitButton'

const items = [
  { label: 'Update', icon: 'check' },
  { label: 'Delete', icon: 'close' },
  { separator: true },
  { label: 'Quit', icon: 'external-link' },
]

export <view>
  <SplitButton :label=\${'Save'} :items=\${items} />
</view>`

export const icons = `import SplitButton from '@jacare/ui/SplitButton'

const items = [
  { label: 'Update', icon: 'check' },
  { label: 'Delete', icon: 'close' },
  { label: 'Quit', icon: 'external-link' },
]

export <view>
  <SplitButton :label=\${'Save'} :icon=\${'check'} :items=\${items} />
</view>`

export const nested = `import SplitButton from '@jacare/ui/SplitButton'

const items = [
  {
    label: 'File',
    icon: 'menu',
    items: [
      { label: 'New', icon: 'plus' },
      { label: 'Open', icon: 'search' },
    ],
  },
  {
    label: 'Edit',
    icon: 'info',
    items: [
      { label: 'Copy', icon: 'check' },
      { label: 'Remove', icon: 'close' },
    ],
  },
  { separator: true },
  { label: 'Quit', icon: 'external-link' },
]

export <view>
  <SplitButton :label=\${'Save'} :items=\${items} />
</view>`

export const severity = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Primary'} :severity=\${'primary'} :items=\${items} />
    <SplitButton :label=\${'Secondary'} :severity=\${'secondary'} :items=\${items} />
    <SplitButton :label=\${'Success'} :severity=\${'success'} :items=\${items} />
    <SplitButton :label=\${'Info'} :severity=\${'info'} :items=\${items} />
    <SplitButton :label=\${'Warn'} :severity=\${'warn'} :items=\${items} />
    <SplitButton :label=\${'Danger'} :severity=\${'danger'} :items=\${items} />
  </Stack>
</view>`

export const disabledExample = `import SplitButton from '@jacare/ui/SplitButton'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <SplitButton :label=\${'Save'} :disabled=\${true} :items=\${items} />
</view>`

export const raisedExample = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Primary'} :raised=\${true} :items=\${items} />
    <SplitButton :label=\${'Success'} :severity=\${'success'} :raised=\${true} :items=\${items} />
    <SplitButton :label=\${'Danger'} :severity=\${'danger'} :raised=\${true} :items=\${items} />
  </Stack>
</view>`

export const roundedExample = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Primary'} :rounded=\${true} :items=\${items} />
    <SplitButton :label=\${'Secondary'} :severity=\${'secondary'} :rounded=\${true} :items=\${items} />
    <SplitButton :label=\${'Info'} :severity=\${'info'} :rounded=\${true} :items=\${items} />
  </Stack>
</view>`

export const textExample = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Primary'} :text=\${true} :items=\${items} />
    <SplitButton :label=\${'Success'} :severity=\${'success'} :text=\${true} :items=\${items} />
    <SplitButton :label=\${'Danger'} :severity=\${'danger'} :text=\${true} :items=\${items} />
  </Stack>
</view>`

export const outlinedExample = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Primary'} :outlined=\${true} :items=\${items} />
    <SplitButton :label=\${'Success'} :severity=\${'success'} :outlined=\${true} :items=\${items} />
    <SplitButton :label=\${'Danger'} :severity=\${'danger'} :outlined=\${true} :items=\${items} />
  </Stack>
</view>`

export const sizes = `import SplitButton from '@jacare/ui/SplitButton'
import Stack from '@jacare/ui/Stack'

const items = [
  { label: 'Update' },
  { label: 'Delete' },
]

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <SplitButton :label=\${'Small'} :size=\${'sm'} :items=\${items} />
    <SplitButton :label=\${'Normal'} :items=\${items} />
    <SplitButton :label=\${'Large'} :size=\${'lg'} :items=\${items} />
  </Stack>
</view>`
