export const createFormBoot = `import { pulse } from '@jacare/core'
import { createForm } from '@jacare/ui'

const form = createForm({
  model: {
    name: pulse(''),
    email: pulse(''),
  },
  rules: {
    name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
    email: [
      { required: true, message: 'Email is required', trigger: 'blur' },
      { type: 'email', message: 'Enter a valid email', trigger: ['blur', 'change'] },
    ],
  },
})

export { form }`

export const wireForm = `import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'
import Button from '@jacare/ui/Button'
import { form } from './form.js'

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
    <Button on-press=\${submit}>Submit</Button>
  </Form>
</view>`

export const ruleShape = `rules: {
  email: [
    {
      required: true,
      type: 'email',
      message: 'Enter a valid email',
      trigger: ['blur', 'change'],
      min: 5,
      max: 120,
      pattern: /@/,
      whitespace: true,
      label: 'Email',
      validator: (rule, value, callback, model) => {
        callback()
      },
    },
  ],
}`

export const triggerRules = `rules: {
  username: [
    { required: true, message: 'Required on blur', trigger: 'blur' },
    { min: 3, message: 'Checked while typing', trigger: 'change' },
  ],
  bio: [
    { max: 160, message: 'Keep it short', trigger: ['blur', 'change'] },
  ],
}`

export const typesExample = `rules: {
  email: [{ type: 'email', message: 'Invalid email' }],
  website: [{ type: 'url', message: 'Invalid url' }],
  age: [{ type: 'integer', message: 'Whole number only' }],
  score: [{ type: 'number', message: 'Must be a number' }],
  accepted: [{ type: 'boolean', message: 'Must be true or false' }],
  tags: [{ type: 'array', message: 'Pick at least one' }],
  title: [{ type: 'string', min: 2, max: 40 }],
}`

export const customValidator = `import { pulse } from '@jacare/core'
import { createForm } from '@jacare/ui'
import Button from '@jacare/ui/Button'
import Form from '@jacare/ui/Form'
import FormItem from '@jacare/ui/FormItem'
import Input from '@jacare/ui/Input'
import Stack from '@jacare/ui/Stack'

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
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button on-press=\${() => form.validate().catch(() => {})}>Validate</Button>
      <Button :variant=\${'secondary'} on-press=\${() => form.resetFields()}>Reset</Button>
    </Stack>
  </Form>
</view>`

export const liveForm = `import { pulse } from '@jacare/core'
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
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button on-press=\${submit}>Submit</Button>
      <Button :variant=\${'secondary'} on-press=\${() => form.resetFields()}>Reset</Button>
      <Button :variant=\${'ghost'} on-press=\${() => form.clearValidate()}>Clear errors</Button>
    </Stack>
  </Form>
</view>`

export const fieldApi = `const form = createForm({ model, rules })

await form.validate()
await form.validateField('email')
await form.validateField(['name', 'email'], 'blur')
form.clearValidate()
form.clearValidate('email')
form.resetFields()
form.scrollToField('email')
form.setFieldValue('name', 'Ada')
form.getFieldValue('name')
form.errors()
`

export const usageRules = [
  'Call createForm once with a pulse model and a rules map keyed by the same prop names FormItem uses.',
  'Pass :form=${form} on Form so FormItem can register, validate on blur/change, and surface errors.',
  'Set FormItem :prop to the rule key. Without prop, the item is layout-only and never validates.',
  'Prefer rule.trigger of blur for required checks and change for length/format feedback while typing.',
  'On submit, await form.validate(). It rejects when invalid; catch and stop the submit flow.',
  'Use form.resetFields() to restore the initial model snapshot and clear errors together.',
  'Use form.clearValidate() when you need to dismiss errors without resetting values.',
  'Custom validator(rule, value, callback, model) must call callback() or callback(error).',
  'Empty optional fields skip type/min/max/pattern unless required is true or a validator is present.',
  'Keep messages short and field-specific. Pair :required on FormItem with required rules for visuals + logic.',
]
