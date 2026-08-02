export const basic = `import FormSection from '@jacare/ui/FormSection'
import Input from '@jacare/ui/Input'
import { pulse } from '@jacare/core'

const name = pulse('')
const email = pulse('')

export <view>
  <FormSection :title=\${'Profile'} :description=\${'How teammates will recognize you.'}>
    <Input :label=\${'Display name'} bind-value=\${name} />
    <Input :label=\${'Email'} :type=\${'email'} bind-value=\${email} />
  </FormSection>
</view>`

export const collapsible = `import { pulse } from '@jacare/core'
import FormSection from '@jacare/ui/FormSection'
import Input from '@jacare/ui/Input'

const open = pulse(true)
const company = pulse('')

export <view>
  <FormSection
    :title=\${'Billing details'}
    :description=\${'Optional for free plans'}
    :collapsible=\${true}
    bind-open=\${open}
  >
    <Input :label=\${'Company'} bind-value=\${company} />
  </FormSection>
</view>`

export const composed = `import { pulse } from '@jacare/core'
import Form from '@jacare/ui/Form'
import FormSection from '@jacare/ui/FormSection'
import FormActions from '@jacare/ui/FormActions'
import Input from '@jacare/ui/Input'

const title = pulse('')
const notes = pulse('')

export <view>
  <Form>
    <FormSection :title=\${'Request'} :description=\${'Tell us what you need.'}>
      <Input :label=\${'Title'} bind-value=\${title} />
      <Input :label=\${'Notes'} bind-value=\${notes} />
    </FormSection>
    <FormActions />
  </Form>
</view>`
