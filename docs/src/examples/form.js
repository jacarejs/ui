export const basic = `import { pulse } from '@jacare/core'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

const name = pulse('')
const email = pulse('')

export <view>
  <Form>
    <FormItem :label=\${'Name'} :required=\${true}>
      <Input bind-value=\${name} />
    </FormItem>
    <FormItem :label=\${'Email'} :hint=\${'We will never share your email'}>
      <Input :type=\${'email'} bind-value=\${email} />
    </FormItem>
  </Form>
</view>`

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import Form from '@jacare/ui/Form'",
    "import FormItem from '@jacare/ui/FormItem'",
    "import Input from '@jacare/ui/Input'",
    '',
    "const name = pulse('')",
    "const email = pulse('')",
    '',
    'export <view>',
    '  <Form',
  ]
  if (state.labelPosition === 'left') lines.push("    :labelPosition=\${'left'}")
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.gap && state.gap !== 'md') lines.push(`    :gap=\${'${state.gap}'}`)
  lines.push(
    '  >',
    "    <FormItem :label=\${'Name'} :required=\${true}>",
    '      <Input bind-value=\${name} />',
    '    </FormItem>',
    "    <FormItem :label=\${'Email'} :hint=\${'We will never share your email'}>",
    "      <Input :type=\${'email'} bind-value=\${email} />",
    '    </FormItem>',
    '  </Form>',
    '</view>',
  )
  return lines.join('\n')
}
