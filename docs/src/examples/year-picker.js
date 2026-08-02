export const basic = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'

const year = pulse(2026)

export <view>
  <YearPicker :label=\${'Fiscal year'} bind-value=\${year} />
</view>`

export const inlineExample = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'

const year = pulse(2026)

export <view>
  <YearPicker
    :label=\${'Inline panel'}
    :inline=\${true}
    bind-value=\${year}
  />
</view>`

export const bounds = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'

const year = pulse(2026)

export <view>
  <YearPicker
    :label=\${'Report year'}
    :min=\${2020}
    :max=\${2028}
    :hint=\${'Only 2020–2028 are selectable'}
    bind-value=\${year}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'
import Stack from '@jacare/ui/Stack'

const hinted = pulse(null)
const invalid = pulse(null)

export <view>
  <Stack :gap=\${'lg'}>
    <YearPicker
      :label=\${'Archive year'}
      :placeholder=\${'Choose a year'}
      :hint=\${'Used for annual reports'}
      bind-value=\${hinted}
    />
    <YearPicker
      :label=\${'Required year'}
      :error=\${'Pick a year to continue'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'

const locked = pulse(2024)

export <view>
  <YearPicker
    :label=\${'Closed year'}
    :disabled=\${true}
    :hint=\${'Locked after books were closed'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import YearPicker from '@jacare/ui/YearPicker'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const year = pulse(2026)

export <view>
  <Stack :gap=\${'sm'}>
    <YearPicker :label=\${'Selected year'} bind-value=\${year} />
    <Text :tone=\${'muted'}>Value: \${() => year() ?? '—'}</Text>
  </Stack>
</view>`
