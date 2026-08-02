export const basic = `import { pulse } from '@jacare/core'
import InputMoney from '@jacare/ui/InputMoney'

const amount = pulse(0)

export <view>
  <InputMoney
    :label=\${'Amount'}
    :currency=\${'BRL'}
    :locale=\${'pt-BR'}
    :clearable=\${true}
    bind-value=\${amount}
  />
</view>`

export const currencies = `import { pulse } from '@jacare/core'
import InputMoney from '@jacare/ui/InputMoney'
import Stack from '@jacare/ui/Stack'

const brl = pulse(1250.9)
const usd = pulse(89.5)
const eur = pulse(40)

export <view>
  <Stack :gap=\${'md'}>
    <InputMoney :label=\${'BRL'} :currency=\${'BRL'} :locale=\${'pt-BR'} bind-value=\${brl} />
    <InputMoney :label=\${'USD'} :currency=\${'USD'} :locale=\${'en-US'} bind-value=\${usd} />
    <InputMoney :label=\${'EUR'} :currency=\${'EUR'} :locale=\${'de-DE'} bind-value=\${eur} />
  </Stack>
</view>`

export const precision = `import { pulse } from '@jacare/core'
import InputMoney from '@jacare/ui/InputMoney'
import Stack from '@jacare/ui/Stack'

const cents = pulse(19.9)
const whole = pulse(20)

export <view>
  <Stack :gap=\${'md'}>
    <InputMoney :label=\${'With cents'} :precision=\${2} bind-value=\${cents} />
    <InputMoney :label=\${'Whole reais'} :precision=\${0} :hint=\${'No decimal places'} bind-value=\${whole} />
  </Stack>
</view>`

export const negative = `import { pulse } from '@jacare/core'
import InputMoney from '@jacare/ui/InputMoney'

const adjustment = pulse(-15.5)

export <view>
  <InputMoney
    :label=\${'Adjustment'}
    :allowNegative=\${true}
    :hint=\${'Type - to start a negative amount'}
    bind-value=\${adjustment}
  />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import InputMoney from '@jacare/ui/InputMoney'
import Stack from '@jacare/ui/Stack'

const sm = pulse(10)
const md = pulse(25.5)
const lg = pulse(100)

export <view>
  <Stack :gap=\${'md'}>
    <InputMoney :label=\${'Small'} :size=\${'sm'} bind-value=\${sm} />
    <InputMoney :label=\${'Medium'} :size=\${'md'} bind-value=\${md} />
    <InputMoney :label=\${'Large'} :size=\${'lg'} bind-value=\${lg} />
  </Stack>
</view>`

export const checkout = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import InputMoney from '@jacare/ui/InputMoney'
import Stack from '@jacare/ui/Stack'

const price = pulse(199.9)
const card = pulse('')
const expiry = pulse('')
const cvv = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputMoney :label=\${'Charge'} :currency=\${'BRL'} bind-value=\${price} />
    <InputMask :label=\${'Card'} :preset=\${'card'} bind-value=\${card} />
    <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
      <InputMask :label=\${'Expiry'} :mask=\${'##/##'} bind-value=\${expiry} />
      <InputMask :label=\${'CVV'} :preset=\${'cvv'} bind-value=\${cvv} />
    </Stack>
  </Stack>
</view>`
