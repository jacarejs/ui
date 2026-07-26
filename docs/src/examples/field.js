export const basic = `import { pulse } from '@jacare/core'
import Field from '@jacare/ui/Field'

const value = pulse('')

export <view>
  <Field :label=\${'Email'} :placeholder=\${'you@jacare.dev'} bind-value=\${value} />
</view>`
