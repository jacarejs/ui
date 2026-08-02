export const component = `import { pulse } from '@jacare/core'
import MessageBox from '@jacare/ui/MessageBox'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open message box</Button>
  <MessageBox bind-open=\${open} :title=\${'Publish release?'} :message=\${'This action updates production.'} />
</view>`

export const custom_actions = `import { pulse } from '@jacare/core'
import MessageBox from '@jacare/ui/MessageBox'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Archive</Button>
  <MessageBox bind-open=\${open} :title=\${'Archive project'} :type=\${'warning'} :confirmButtonText=\${'Archive'} :cancelButtonText=\${'Keep project'} />
</view>`

export const input = `import { pulse } from '@jacare/core'
import MessageBox from '@jacare/ui/MessageBox'
import Button from '@jacare/ui/Button'

const open = pulse(false)
const name = pulse('')

export <view>
  <Button on-press=\${() => open.set(true)}>Rename</Button>
  <MessageBox bind-open=\${open} bind-inputValue=\${name} :showInput=\${true} :title=\${'Rename project'} :inputPlaceholder=\${'Project name'} />
</view>`

export const services = `import { MessageBox } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

function confirmDelete() {
  MessageBox.confirm('This cannot be undone.', 'Delete project', { type: 'error' }).catch(() => {})
}

export <view>
  <Stack :direction=\${'row'} :gap=\${'md'} :wrap=\${true}>
    <Button on-press=\${() => MessageBox.alert('Everything is ready.', 'Status')}>Alert</Button>
    <Button :variant=\${'danger'} on-press=\${confirmDelete}>Confirm</Button>
    <Button :variant=\${'secondary'} on-press=\${() => MessageBox.prompt('Enter a name.', 'New project').catch(() => {})}>Prompt</Button>
  </Stack>
</view>`

export const types = `import { pulse } from '@jacare/core'
import MessageBox from '@jacare/ui/MessageBox'
import Button from '@jacare/ui/Button'
import Stack from '@jacare/ui/Stack'

const open = pulse(false)
const type = pulse('primary')
const options = ['primary', 'success', 'warning', 'info', 'error']

function buttonVariant(next) {
  if (next === 'warning') return 'warn'
  if (next === 'error') return 'danger'
  return next
}

export <view>
  <Stack :gap=\${'md'}>
    #for options as option
      <Button
        :variant=\${buttonVariant(option)}
        on-press=\${() => { type.set(option); open.set(true) }}
      >\${option}</Button>
    #end
  </Stack>
  <MessageBox bind-open=\${open} :type=\${type} :title=\${'Semantic dialog'} :message=\${'The selected type changes the accent.'} />
</view>`

export const single_action = `import { pulse } from '@jacare/core'
import MessageBox from '@jacare/ui/MessageBox'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open notice</Button>
  <MessageBox bind-open=\${open} :title=\${'Terms updated'} :message=\${'Review the latest policy.'} :showCancelButton=\${false} :confirmButtonText=\${'Got it'} />
</view>`
