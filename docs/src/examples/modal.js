export const basic = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Modal from '@jacare/ui/Modal'
import ModalFooter from '@jacare/ui/ModalFooter'
import Space from '@jacare/ui/Space'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open modal</Button>
  <Modal
    bind-open=\${open}
    :title=\${'Invite teammate'}
    :description=\${'Send an invite link with project access.'}
  >
    <p>They will receive an email with a one-time join link.</p>
    <ModalFooter>
      <Space>
        <Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Cancel</Button>
        <Button on-press=\${() => open.set(false)}>Send invite</Button>
      </Space>
    </ModalFooter>
  </Modal>
</view>`

export const sizes = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Modal from '@jacare/ui/Modal'
import Stack from '@jacare/ui/Stack'

const sm = pulse(false)
const md = pulse(false)
const lg = pulse(false)
const full = pulse(false)

export <view>
  <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
    <Button on-press=\${() => sm.set(true)}>Small</Button>
    <Button on-press=\${() => md.set(true)}>Medium</Button>
    <Button on-press=\${() => lg.set(true)}>Large</Button>
    <Button on-press=\${() => full.set(true)}>Full</Button>
  </Stack>
  <Modal bind-open=\${sm} :title=\${'Small'} :size=\${'sm'}><p>Focused prompt.</p></Modal>
  <Modal bind-open=\${md} :title=\${'Medium'} :size=\${'md'}><p>Default width.</p></Modal>
  <Modal bind-open=\${lg} :title=\${'Large'} :size=\${'lg'}><p>Roomier review surface.</p></Modal>
  <Modal bind-open=\${full} :title=\${'Full screen'} :size=\${'full'}><p>Use for dense editors on any viewport.</p></Modal>
</view>`

export const sheet = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Modal from '@jacare/ui/Modal'
import ModalFooter from '@jacare/ui/ModalFooter'
import Space from '@jacare/ui/Space'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open bottom sheet</Button>
  <Modal
    bind-open=\${open}
    :title=\${'Filters'}
    :description=\${'Drag the handle down to dismiss on touch devices.'}
    :placement=\${'bottom'}
  >
    <p>Bottom placement is ideal for mobile actions and short forms.</p>
    <ModalFooter>
      <Space>
        <Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Reset</Button>
        <Button on-press=\${() => open.set(false)}>Apply</Button>
      </Space>
    </ModalFooter>
  </Modal>
</view>`

export const form = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Field from '@jacare/ui/Field'
import Modal from '@jacare/ui/Modal'
import ModalFooter from '@jacare/ui/ModalFooter'
import Space from '@jacare/ui/Space'
import Stack from '@jacare/ui/Stack'

const open = pulse(false)
const name = pulse('')
const email = pulse('')

export <view>
  <Button on-press=\${() => open.set(true)}>Edit profile</Button>
  <Modal
    bind-open=\${open}
    :title=\${'Edit profile'}
    :description=\${'Changes save to your workspace profile.'}
    :size=\${'sm'}
  >
    <Stack :gap=\${'md'}>
      <Field :label=\${'Name'} bind-value=\${name} />
      <Field :label=\${'Email'} bind-value=\${email} />
    </Stack>
    <ModalFooter>
      <Space>
        <Button :variant=\${'secondary'} on-press=\${() => open.set(false)}>Cancel</Button>
        <Button on-press=\${() => open.set(false)}>Save</Button>
      </Space>
    </ModalFooter>
  </Modal>
</view>`

export const locked = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Modal from '@jacare/ui/Modal'
import ModalFooter from '@jacare/ui/ModalFooter'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Open locked modal</Button>
  <Modal
    bind-open=\${open}
    :title=\${'Processing payment'}
    :closeOnClickModal=\${false}
    :closeOnEsc=\${false}
    :showClose=\${false}
  >
    <p>Backdrop and Escape are disabled until the primary action finishes.</p>
    <ModalFooter>
      <Button on-press=\${() => open.set(false)}>Done</Button>
    </ModalFooter>
  </Modal>
</view>`
