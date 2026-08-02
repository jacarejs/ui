export const basic = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'

const minutes = pulse(150)

export <view>
  <DurationPicker :label=\${'SLA'} :showDays=\${true} bind-value=\${minutes} />
</view>`

export const hoursMinutes = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'

const minutes = pulse(95)

export <view>
  <DurationPicker
    :label=\${'Meeting length'}
    :hint=\${'Hours and minutes only — model is still total minutes'}
    bind-value=\${minutes}
  />
</view>`

export const withDays = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'

const minutes = pulse(3900)

export <view>
  <DurationPicker
    :label=\${'Incident window'}
    :showDays=\${true}
    :hint=\${'2d 17h 0m from 3900 minutes'}
    bind-value=\${minutes}
  />
</view>`

export const hintAndError = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'
import Stack from '@jacare/ui/Stack'

const hinted = pulse(45)
const invalid = pulse(0)

export <view>
  <Stack :gap=\${'md'}>
    <DurationPicker
      :label=\${'Retry delay'}
      :hint=\${'Used between automatic retries'}
      bind-value=\${hinted}
    />
    <DurationPicker
      :label=\${'Required SLA'}
      :error=\${'Set a duration greater than zero'}
      bind-value=\${invalid}
    />
  </Stack>
</view>`

export const disabledExample = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'

const minutes = pulse(180)

export <view>
  <DurationPicker
    :label=\${'Frozen SLA'}
    :showDays=\${true}
    :disabled=\${true}
    :hint=\${'Locked while the ticket is closed'}
    bind-value=\${minutes}
  />
</view>`

export const agenda = `import { pulse } from '@jacare/core'
import DurationPicker from '@jacare/ui/DurationPicker'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const prep = pulse(30)
const talk = pulse(45)
const qna = pulse(15)

export <view>
  <Stack :gap=\${'md'}>
    <DurationPicker :label=\${'Prep'} bind-value=\${prep} />
    <DurationPicker :label=\${'Talk'} bind-value=\${talk} />
    <DurationPicker :label=\${'Q&A'} bind-value=\${qna} />
    <Text>
      Total session: \${() => \`\${prep() + talk() + qna()} minutes\`}
    </Text>
  </Stack>
</view>`
