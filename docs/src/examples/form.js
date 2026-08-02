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

export const validation = `import { pulse } from '@jacare/core'
import { createForm } from '@jacare/ui'
import Button from '@jacare/ui/Button'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'
import Stack from '@jacare/ui/Stack'

const form = createForm({
  model: {
    name: pulse(''),
    email: pulse(''),
  },
  rules: {
    name: [
      { required: true, message: 'Name is required', trigger: 'blur' },
      { min: 2, message: 'Use at least 2 characters', trigger: 'change' },
    ],
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Enter a valid email', trigger: ['blur', 'change'] },
    ],
  },
})

async function submit() {
  try {
    await form.validate()
  } catch {
    return
  }
}

export <view>
  <Form :form=\${form}>
    <FormItem :prop=\${'name'} :label=\${'Name'} :required=\${true}>
      <Input bind-value=\${form.model.name} />
    </FormItem>
    <FormItem :prop=\${'email'} :label=\${'Email'} :required=\${true}>
      <Input :type=\${'email'} bind-value=\${form.model.email} />
    </FormItem>
    <Stack :direction=\${'row'} :wrap=\${true}>
      <Button on-press=\${submit}>Submit</Button>
      <Button :variant=\${'secondary'} on-press=\${() => form.resetFields()}>Reset</Button>
      <Button :variant=\${'ghost'} on-press=\${() => form.clearValidate()}>Clear errors</Button>
    </Stack>
  </Form>
</view>`

export const customValidator = `import { pulse } from '@jacare/core'
import { createForm } from '@jacare/ui'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

const form = createForm({
  model: {
    password: pulse(''),
    confirm: pulse(''),
  },
  rules: {
    password: [{ required: true, min: 6, message: 'Min 6 characters' }],
    confirm: [
      { required: true, message: 'Confirm your password' },
      {
        validator: (rule, value, callback) => {
          if (value !== form.model.password()) callback(new Error('Passwords must match'))
          else callback()
        },
        trigger: 'blur',
      },
    ],
  },
})

export <view>
  <Form :form=\${form}>
    <FormItem :prop=\${'password'} :label=\${'Password'} :required=\${true}>
      <Input :type=\${'password'} bind-value=\${form.model.password} />
    </FormItem>
    <FormItem :prop=\${'confirm'} :label=\${'Confirm'} :required=\${true}>
      <Input :type=\${'password'} bind-value=\${form.model.confirm} />
    </FormItem>
  </Form>
</view>`

export const leftLabels = `import { pulse } from '@jacare/core'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'

const firstName = pulse('')
const role = pulse('')

export <view>
  <Form :labelPosition=\${'left'} :gap=\${'lg'}>
    <FormItem :label=\${'First name'}><Input bind-value=\${firstName} /></FormItem>
    <FormItem :label=\${'Role'}><Input bind-value=\${role} /></FormItem>
  </Form>
</view>`

function quote(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import { pulse } from '@jacare/core'",
    "import { createForm } from '@jacare/ui'",
    "import Button from '@jacare/ui/Button'",
    "import Form from '@jacare/ui/Form'",
    "import FormItem from '@jacare/ui/FormItem'",
    "import Input from '@jacare/ui/Input'",
    '',
    'const form = createForm({',
    '  model: {',
    "    name: pulse(''),",
    "    email: pulse(''),",
    '  },',
    '  rules: {',
    "    name: [{ required: true, message: 'Name is required' }],",
    "    email: [{ required: true, type: 'email', message: 'Enter a valid email' }],",
    '  },',
    '})',
    '',
    'export <view>',
    '  <Form',
  ]
  if (state.labelPosition === 'left') lines.push("    :labelPosition=\${'left'}")
  if (state.disabled) lines.push('    :disabled=\${true}')
  if (state.gap && state.gap !== 'md') lines.push(`    :gap=\${'${quote(state.gap)}'}`)
  lines.push(
    '    :form=\${form}',
    '  >',
    "    <FormItem :prop=\${'name'} :label=\${'Name'} :required=\${true}>",
    '      <Input bind-value=\${form.model.name} />',
    '    </FormItem>',
    "    <FormItem :prop=\${'email'} :label=\${'Email'} :required=\${true}>",
    "      <Input :type=\${'email'} bind-value=\${form.model.email} />",
    '    </FormItem>',
    '    <Button on-press=\${() => form.validate().catch(() => {})}>Validate</Button>',
    '  </Form>',
    '</view>',
  )
  return lines.join('\n')
}
