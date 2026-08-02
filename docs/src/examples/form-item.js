export const required = `import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

export <view>
  <Form>
    <FormItem :label=\${'Project name'} :required=\${true}>
      <Input :placeholder=\${'Jacare UI'} />
    </FormItem>
  </Form>
</view>`

export const hint = `import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

export <view>
  <Form>
    <FormItem :label=\${'Workspace URL'} :hint=\${'Use lowercase letters and hyphens'}>
      <Input :placeholder=\${'design-system'} />
    </FormItem>
  </Form>
</view>`

export const error = `import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

export <view>
  <Form>
    <FormItem :label=\${'Email'} :error=\${'Enter a valid email address'}>
      <Input :type=\${'email'} :value=\${'team@'} />
    </FormItem>
  </Form>
</view>`

export const withInput = `import { pulse } from '@jacare/core'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

const value = pulse('')

export <view>
  <Form>
    <FormItem :label=\${'Search query'} :hint=\${'Try a component name'}>
      <Input :clearable=\${true} bind-value=\${value} />
    </FormItem>
  </Form>
</view>`
