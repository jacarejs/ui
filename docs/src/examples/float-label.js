export const basic = `import { pulse } from '@jacare/core'
import FloatLabel from '@jacare/ui/FloatLabel'

const value = pulse('')

export <view>
  <FloatLabel :label=\${'Username'} :inputId=\${'username'}>
    <input id="username" autocomplete="off" bind-value=\${value} />
  </FloatLabel>
</view>`

export const variants = `import { pulse } from '@jacare/core'
import FloatLabel from '@jacare/ui/FloatLabel'
import Stack from '@jacare/ui/Stack'

const over = pulse('')
const inside = pulse('')
const on = pulse('')

export <view>
  <Stack :gap=\${'lg'} :direction=\${'row'}>
    <FloatLabel :label=\${'Over Label'} :inputId=\${'over_label'} :variant=\${'over'}>
      <input id="over_label" autocomplete="off" bind-value=\${over} />
    </FloatLabel>
    <FloatLabel :label=\${'In Label'} :inputId=\${'in_label'} :variant=\${'in'}>
      <input id="in_label" autocomplete="off" bind-value=\${inside} />
    </FloatLabel>
    <FloatLabel :label=\${'On Label'} :inputId=\${'on_label'} :variant=\${'on'}>
      <input id="on_label" autocomplete="off" bind-value=\${on} />
    </FloatLabel>
  </Stack>
</view>`

export const invalidExample = `import { pulse } from '@jacare/core'
import FloatLabel from '@jacare/ui/FloatLabel'
import Stack from '@jacare/ui/Stack'

const over = pulse('')
const inside = pulse('')
const on = pulse('')

export <view>
  <Stack :gap=\${'lg'} :direction=\${'row'}>
    <FloatLabel :label=\${'Username'} :inputId=\${'invalid_over'} :invalid=\${true}>
      <input id="invalid_over" autocomplete="off" aria-invalid="true" bind-value=\${over} />
    </FloatLabel>
    <FloatLabel :label=\${'Username'} :inputId=\${'invalid_in'} :variant=\${'in'} :invalid=\${true}>
      <input id="invalid_in" autocomplete="off" aria-invalid="true" bind-value=\${inside} />
    </FloatLabel>
    <FloatLabel :label=\${'Username'} :inputId=\${'invalid_on'} :variant=\${'on'} :invalid=\${true}>
      <input id="invalid_on" autocomplete="off" aria-invalid="true" bind-value=\${on} />
    </FloatLabel>
  </Stack>
</view>`

export const fluidExample = `import { pulse } from '@jacare/core'
import FloatLabel from '@jacare/ui/FloatLabel'

const value = pulse('')

export <view>
  <FloatLabel :label=\${'Email'} :inputId=\${'email_fluid'} :fluid=\${true}>
    <input id="email_fluid" type="email" autocomplete="email" bind-value=\${value} />
  </FloatLabel>
</view>`

export const textareaExample = `import { pulse } from '@jacare/core'
import FloatLabel from '@jacare/ui/FloatLabel'

const value = pulse('')

export <view>
  <FloatLabel :label=\${'Bio'} :inputId=\${'bio'} :variant=\${'in'} :fluid=\${true}>
    <textarea id="bio" rows="4" bind-value=\${value}></textarea>
  </FloatLabel>
</view>`
