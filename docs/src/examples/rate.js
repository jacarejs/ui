export const basic = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'

const value = pulse(3)

export <view>
  <Rate bind-value=\${value} />
</view>`

export const half = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'

const value = pulse(3.5)

export <view>
  <Rate :allowHalf=\${true} bind-value=\${value} />
</view>`

export const customMax = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'

const value = pulse(7)

export <view>
  <Rate :max=\${10} bind-value=\${value} />
</view>`

export const text = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'
import Stack from '@jacare/ui/Stack'

const numeric = pulse(4)
const descriptive = pulse(5)
const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']

export <view>
  <Stack :gap=\${'md'}>
    <Rate :showText=\${true} bind-value=\${numeric} />
    <Rate :showText=\${true} :texts=\${labels} bind-value=\${descriptive} />
  </Stack>
</view>`

export const behavior = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'
import Stack from '@jacare/ui/Stack'

const fixed = pulse(3)
const disabled = pulse(4)

export <view>
  <Stack :gap=\${'md'}>
    <Rate :clearable=\${false} :showText=\${true} bind-value=\${fixed} />
    <Rate :disabled=\${true} :showText=\${true} bind-value=\${disabled} />
  </Stack>
</view>`

export const characters = `import { pulse } from '@jacare/core'
import Rate from '@jacare/ui/Rate'
import Stack from '@jacare/ui/Stack'
import Text from '@jacare/ui/Text'

const hearts = pulse(4)
const circles = pulse(2.5)
const diamonds = pulse(3)
const faces = pulse(5)

export <view>
  <Stack :gap=\${'lg'}>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'}>Hearts</Text>
      <Rate :character=\${'♥'} bind-value=\${hearts} />
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'}>Circles (half)</Text>
      <Rate :character=\${'●'} :allowHalf=\${true} bind-value=\${circles} />
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'}>Diamonds</Text>
      <Rate :character=\${'◆'} :showText=\${true} bind-value=\${diamonds} />
    </Stack>
    <Stack :gap=\${'sm'}>
      <Text :tone=\${'muted'}>Faces</Text>
      <Rate :character=\${'☺'} :max=\${5} bind-value=\${faces} />
    </Stack>
  </Stack>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Rate from '@jacare/ui/Rate'",
    '',
    `const value = pulse(${Number(state.value) || 0})`,
    '',
    'export <view>',
    '  <Rate',
  ]
  if (state.max && Number(state.max) !== 5) lines.push(`    :max=\${${Number(state.max)}}`)
  if (state.allowHalf) lines.push('    :allowHalf=\${true}')
  if (state.clearable === false) lines.push('    :clearable=\${false}')
  if (state.showText) lines.push('    :showText=\${true}')
  if (Array.isArray(state.texts) && state.texts.length) lines.push(`    :texts=\${${JSON.stringify(state.texts)}}`)
  if (state.disabled) lines.push('    :disabled=\${true}')
  lines.push('    bind-value=\${value}', '  />', '</view>')
  return lines.join('\n')
}
