export const basic = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'

const cpf = pulse('')

export <view>
  <InputMask
    :label=\${'CPF'}
    :preset=\${'cpf'}
    :placeholder=\${'000.000.000-00'}
    :clearable=\${true}
    bind-value=\${cpf}
  />
</view>`

export const phone = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'

const mobile = pulse('')
const landline = pulse('')

export <view>
  <InputMask :label=\${'Mobile'} :preset=\${'phone'} bind-value=\${mobile} />
  <InputMask :label=\${'Landline'} :preset=\${'phone-landline'} bind-value=\${landline} />
</view>`

export const documents = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import Stack from '@jacare/ui/Stack'

const cpf = pulse('')
const cnpj = pulse('')
const cep = pulse('')
const rg = pulse('')
const pis = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputMask :label=\${'CPF'} :preset=\${'cpf'} bind-value=\${cpf} />
    <InputMask :label=\${'CNPJ'} :preset=\${'cnpj'} bind-value=\${cnpj} />
    <InputMask :label=\${'CEP'} :preset=\${'cep'} bind-value=\${cep} />
    <InputMask :label=\${'RG'} :preset=\${'rg'} bind-value=\${rg} />
    <InputMask :label=\${'PIS'} :preset=\${'pis'} bind-value=\${pis} />
  </Stack>
</view>`

export const dates = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import Stack from '@jacare/ui/Stack'

const date = pulse('')
const time = pulse('')

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <InputMask :label=\${'Date'} :preset=\${'date'} :placeholder=\${'DD/MM/YYYY'} bind-value=\${date} />
    <InputMask :label=\${'Time'} :preset=\${'time'} :placeholder=\${'HH:MM'} bind-value=\${time} />
  </Stack>
</view>`

export const card = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import Stack from '@jacare/ui/Stack'

const number = pulse('')
const expiry = pulse('')
const cvv = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputMask :label=\${'Card number'} :preset=\${'card'} bind-value=\${number} />
    <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
      <InputMask :label=\${'Expiry'} :mask=\${'##/##'} :placeholder=\${'MM/YY'} bind-value=\${expiry} />
      <InputMask :label=\${'CVV'} :preset=\${'cvv'} bind-value=\${cvv} />
    </Stack>
  </Stack>
</view>`

export const customText = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import Stack from '@jacare/ui/Stack'

const plate = pulse('')
const code = pulse('')
const serial = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputMask
      :label=\${'License plate'}
      :mask=\${'AAA-#A##'}
      :hint=\${'# = digit, A = letter'}
      bind-value=\${plate}
    />
    <InputMask
      :label=\${'Promo code'}
      :mask=\${'****-****'}
      :hint=\${'* = letter or digit'}
      bind-value=\${code}
    />
    <InputMask
      :label=\${'Serial'}
      :mask=\${'AA-####-AA'}
      bind-value=\${serial}
    />
  </Stack>
</view>`

export const unmasked = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'

const cpf = pulse('')

export <view>
  <InputMask
    :label=\${'CPF (raw model)'}
    :preset=\${'cpf'}
    :unmask=\${true}
    :hint=\${'Model stores digits only'}
    bind-value=\${cpf}
  />
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import InputMask from '@jacare/ui/InputMask'
import Stack from '@jacare/ui/Stack'

const sm = pulse('')
const md = pulse('')
const lg = pulse('')

export <view>
  <Stack :gap=\${'md'}>
    <InputMask :label=\${'Small'} :size=\${'sm'} :preset=\${'phone'} bind-value=\${sm} />
    <InputMask :label=\${'Medium'} :size=\${'md'} :preset=\${'phone'} bind-value=\${md} />
    <InputMask :label=\${'Large'} :size=\${'lg'} :preset=\${'phone'} bind-value=\${lg} />
  </Stack>
</view>`
