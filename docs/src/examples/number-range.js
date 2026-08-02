export const basic = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'

const range = pulse({ min: 10, max: 80 })

export <view>
  <NumberRange :label=\${'Price'} bind-value=\${range} :min=\${0} :max=\${1000} />
</view>`

export const customLabels = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'

const range = pulse({ min: 18, max: 65 })

export <view>
  <NumberRange
    :label=\${'Age filter'}
    :minLabel=\${'From'}
    :maxLabel=\${'To'}
    :min=\${0}
    :max=\${120}
    bind-value=\${range}
  />
</view>`

export const stepPrecision = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'

const range = pulse({ min: 1.5, max: 4.25 })

export <view>
  <NumberRange
    :label=\${'Rating band'}
    :min=\${0}
    :max=\${5}
    :step=\${0.25}
    :precision=\${2}
    :hint=\${'step 0.25 with two decimal places'}
    bind-value=\${range}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Stack from '@jacare/ui/Stack'

const hinted = pulse({ min: 100, max: 500 })
const invalid = pulse({ min: 0, max: 0 })

export <view>
  <Stack :gap=\${'lg'}>
    <NumberRange
      :label=\${'Budget'}
      :min=\${0}
      :max=\${10000}
      :hint=\${'Values are stored as { min, max }; max never falls below min'}
      bind-value=\${hinted}
    />
    <NumberRange
      :label=\${'Required range'}
      :error=\${'Set a range greater than zero'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'

const locked = pulse({ min: 20, max: 80 })

export <view>
  <NumberRange
    :label=\${'Frozen band'}
    :disabled=\${true}
    :hint=\${'Locked while the report is published'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const range = pulse({ min: 120, max: 480 })

export <view>
  <Stack :gap=\${'md'}>
    <NumberRange
      :label=\${'Salary range'}
      :min=\${0}
      :max=\${1000}
      :step=\${10}
      :minLabel=\${'Low'}
      :maxLabel=\${'High'}
      bind-value=\${range}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = range() || { min: 0, max: 0 }
        return next.min + ' – ' + next.max + ' (span ' + (next.max - next.min) + ')'
      }}
    </Text>
  </Stack>
</view>`

export const arrayModel = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const range = pulse([25, 75])

export <view>
  <Stack :gap=\${'md'}>
    <NumberRange
      :label=\${'Score band'}
      :min=\${0}
      :max=\${100}
      :minLabel=\${'Low'}
      :maxLabel=\${'High'}
      :hint=\${'Also accepts [min, max] arrays — commits back as { min, max }'}
      bind-value=\${range}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = range()
        if (Array.isArray(next)) return 'Array model → [' + next[0] + ', ' + next[1] + ']'
        return 'Object model → { min: ' + next.min + ', max: ' + next.max + '}'
      }}
    </Text>
  </Stack>
</view>`

export const percentFilter = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const completion = pulse({ min: 20, max: 90 })

export <view>
  <Stack :gap=\${'md'}>
    <NumberRange
      :label=\${'Completion %'}
      :min=\${0}
      :max=\${100}
      :step=\${5}
      :minLabel=\${'At least'}
      :maxLabel=\${'At most'}
      :hint=\${'Filter projects by progress percentage'}
      bind-value=\${completion}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = completion() || { min: 0, max: 0 }
        return 'Showing ' + next.min + '% – ' + next.max + '%'
      }}
    </Text>
  </Stack>
</view>`

export const presets = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Segmented from '@jacare/ui/Segmented'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const price = pulse({ min: 40, max: 180 })
const preset = pulse('mid')
const presetOptions = [
  { value: 'budget', label: 'Budget' },
  { value: 'mid', label: 'Mid' },
  { value: 'premium', label: 'Premium' },
]

const PRESETS = {
  budget: { min: 0, max: 80 },
  mid: { min: 40, max: 180 },
  premium: { min: 150, max: 500 },
}

function applyPreset(next) {
  preset.set(next)
  price.set(PRESETS[next] || PRESETS.mid)
}

export <view>
  <Stack :gap=\${'md'}>
    <Segmented :options=\${presetOptions} :block=\${true} bind-value=\${preset} on-change=\${applyPreset} />
    <NumberRange
      :label=\${'Nightly rate'}
      :min=\${0}
      :max=\${500}
      :step=\${10}
      :minLabel=\${'From $'}
      :maxLabel=\${'To $'}
      bind-value=\${price}
    />
    <Text :tone=\${'muted'}>
      \${() => {
        const next = price() || { min: 0, max: 0 }
        return 'Listing \\$' + next.min + ' – \\$' + next.max + ' / night'
      }}
    </Text>
  </Stack>
</view>`

export const changeEvent = `import { pulse } from '@jacare/core'
import NumberRange from '@jacare/ui/NumberRange'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const quantity = pulse({ min: 2, max: 12 })
const lastChange = pulse('Idle')

export <view>
  <Stack :gap=\${'md'}>
    <NumberRange
      :label=\${'Order quantity'}
      :min=\${1}
      :max=\${48}
      :step=\${1}
      :minLabel=\${'Min qty'}
      :maxLabel=\${'Max qty'}
      :hint=\${'on-change fires whenever either bound updates'}
      bind-value=\${quantity}
      on-change=\${(next) => lastChange.set('Changed to ' + next.min + '–' + next.max)}
    />
    <Text :tone=\${'muted'}>\${lastChange}</Text>
  </Stack>
</view>`
