export const basic = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'

const month = pulse('2026-08')

export <view>
  <MonthPicker :label=\${'Competence'} bind-value=\${month} />
</view>`

export const inlineExample = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'

const month = pulse('2026-03')

export <view>
  <MonthPicker
    :label=\${'Inline panel'}
    :inline=\${true}
    bind-value=\${month}
  />
</view>`

export const bounds = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'

const month = pulse('2026-06')

export <view>
  <MonthPicker
    :label=\${'Reporting window'}
    :min=\${'2026-03'}
    :max=\${'2026-09'}
    :hint=\${'Only Mar–Sep 2026 are selectable'}
    bind-value=\${month}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'
import Stack from '@jacare/ui/Stack'

const hinted = pulse('')
const invalid = pulse('')

export <view>
  <Stack :gap=\${'lg'}>
    <MonthPicker
      :label=\${'Billing month'}
      :placeholder=\${'Choose competence'}
      :hint=\${'Used for invoices and closings'}
      bind-value=\${hinted}
    />
    <MonthPicker
      :label=\${'Required competence'}
      :error=\${'Pick a month to continue'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'

const locked = pulse('2025-12')

export <view>
  <MonthPicker
    :label=\${'Closed period'}
    :disabled=\${true}
    :hint=\${'Locked after the books were closed'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import MonthPicker from '@jacare/ui/MonthPicker'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const month = pulse('2026-08')

export <view>
  <Stack :gap=\${'md'}>
    <MonthPicker :label=\${'Filter month'} bind-value=\${month} />
    <MonthPicker :label=\${'Same value (inline)'} :inline=\${true} :clearable=\${false} bind-value=\${month} />
    <Text :tone=\${'muted'}>
      \${() => \`ISO value: \${month() || '(empty)'}\`}
    </Text>
  </Stack>
</view>`
