export const basic = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'

const score = pulse(9)

export <view>
  <Nps :label=\${'How likely are you to recommend us?'} bind-value=\${score} />
</view>`

export const customLabels = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'

const score = pulse(8)

export <view>
  <Nps
    :label=\${'Would you recommend Jacaré UI to a teammate?'}
    :lowLabel=\${'Not at all'}
    :highLabel=\${'Absolutely'}
    bind-value=\${score}
  />
</view>`

export const customRange = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'

const score = pulse(4)

export <view>
  <Nps
    :label=\${'Satisfaction this week'}
    :min=\${1}
    :max=\${5}
    :lowLabel=\${'Poor'}
    :highLabel=\${'Excellent'}
    :hint=\${'Shorter 1–5 scale for quick pulse checks'}
    bind-value=\${score}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'
import Stack from '@jacare/ui/Stack'

const hinted = pulse(null)
const invalid = pulse(null)

export <view>
  <Stack :gap=\${'lg'}>
    <Nps
      :label=\${'How likely are you to renew?'}
      :hint=\${'0 = not likely · 10 = extremely likely'}
      bind-value=\${hinted}
    />
    <Nps
      :label=\${'Required NPS'}
      :error=\${'Select a score before submitting'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'

const locked = pulse(10)

export <view>
  <Nps
    :label=\${'Previous survey score'}
    :disabled=\${true}
    :hint=\${'Locked after submission'}
    bind-value=\${locked}
  />
</view>`

export const reactive = `import { pulse } from '@jacare/core'
import Nps from '@jacare/ui/Nps'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const score = pulse(9)

function bucket(value) {
  if (value == null || value === '') return 'No score yet'
  const next = Number(value)
  if (next >= 9) return 'Promoter'
  if (next >= 7) return 'Passive'
  return 'Detractor'
}

export <view>
  <Stack :gap=\${'md'}>
    <Nps
      :label=\${'How likely are you to recommend us?'}
      bind-value=\${score}
    />
    <Text :tone=\${'muted'}>
      \${() => \`Score \${score() ?? '—'} · \${bucket(score())}\`}
    </Text>
  </Stack>
</view>`
