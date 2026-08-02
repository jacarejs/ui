export const basic = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'

const answer = pulse(4)

export <view>
  <Likert :label=\${'The docs were clear'} bind-value=\${answer} />
</view>`

export const customOptions = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'

const frequency = pulse(3)

const options = [
  { value: 1, label: 'Never' },
  { value: 2, label: 'Rarely' },
  { value: 3, label: 'Sometimes' },
  { value: 4, label: 'Often' },
  { value: 5, label: 'Always' },
]

export <view>
  <Likert
    :label=\${'How often do you use this feature?'}
    :options=\${options}
    bind-value=\${frequency}
  />
</view>`

export const stringOptions = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'

const satisfaction = pulse(2)

const options = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']

export <view>
  <Likert
    :label=\${'Overall satisfaction'}
    :options=\${options}
    :hint=\${'String options map to values 1–5 in order'}
    bind-value=\${satisfaction}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'
import Stack from '@jacare/ui/Stack'

const hinted = pulse(null)
const invalid = pulse(null)

export <view>
  <Stack :gap=\${'lg'}>
    <Likert
      :label=\${'Onboarding felt smooth'}
      :hint=\${'Pick the option that best matches your experience'}
      bind-value=\${hinted}
    />
    <Likert
      :label=\${'I would recommend Jacaré UI'}
      :error=\${'An answer is required before continuing'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'

const locked = pulse(5)

export <view>
  <Likert
    :label=\${'Previous survey response'}
    :disabled=\${true}
    :hint=\${'Locked after submission'}
    bind-value=\${locked}
  />
</view>`

export const survey = `import { pulse } from '@jacare/core'
import Likert from '@jacare/ui/Likert'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const clarity = pulse(4)
const usefulness = pulse(5)
const pace = pulse(3)

export <view>
  <Stack :gap=\${'lg'}>
    <Text :as=\${'p'} :tone=\${'muted'}>Workshop feedback</Text>
    <Likert :label=\${'The material was clear'} bind-value=\${clarity} />
    <Likert :label=\${'The examples were useful'} bind-value=\${usefulness} />
    <Likert :label=\${'The pace felt right'} bind-value=\${pace} />
  </Stack>
</view>`
