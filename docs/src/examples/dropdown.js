export const basic = `import { pulse } from '@jacare/core'
import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'
import Text from '@jacare/ui/Text'

const command = pulse('No command yet')

export <view>
  <div style="display:grid;gap:0.75rem">
    <Dropdown on-command=\${(value) => command.set(String(value))}>
      <Button>Actions</Button>
      <DropdownMenu slot="dropdown">
        <DropdownItem :command=\${'edit'}>Edit</DropdownItem>
        <DropdownItem :command=\${'duplicate'}>Duplicate</DropdownItem>
        <DropdownItem :command=\${'archive'} :divided=\${true}>Archive</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Text :tone=\${'muted'}>Last command: \${() => command()}</Text>
  </div>
</view>`

export const hover = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown :trigger=\${'hover'}>
    <Button :variant=\${'secondary'}>Hover for options</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'preview'}>Preview</DropdownItem>
      <DropdownItem :command=\${'share'}>Share</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`

export const placements = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
  <Space :wrap=\${true}>
    <Dropdown :placement=\${'bottom-start'}>
      <Button :size=\${'sm'}>Bottom start</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'one'}>First action</DropdownItem></DropdownMenu>
    </Dropdown>
    <Dropdown :placement=\${'bottom'}>
      <Button :size=\${'sm'}>Bottom</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'center'}>Centered</DropdownItem></DropdownMenu>
    </Dropdown>
    <Dropdown :placement=\${'bottom-end'}>
      <Button :size=\${'sm'}>Bottom end</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'two'}>Second action</DropdownItem></DropdownMenu>
    </Dropdown>
  </Space>
</view>`

export const topPlacements = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'
import Space from '@jacare/ui/Space'

export <view>
  <Space :wrap=\${true}>
    <Dropdown :placement=\${'top-start'}>
      <Button :size=\${'sm'}>Top start</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'start'}>Aligned start</DropdownItem></DropdownMenu>
    </Dropdown>
    <Dropdown :placement=\${'top'}>
      <Button :size=\${'sm'}>Top</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'mid'}>Aligned center</DropdownItem></DropdownMenu>
    </Dropdown>
    <Dropdown :placement=\${'top-end'}>
      <Button :size=\${'sm'}>Top end</Button>
      <DropdownMenu slot="dropdown"><DropdownItem :command=\${'end'}>Aligned end</DropdownItem></DropdownMenu>
    </Dropdown>
  </Space>
</view>`

export const disabledItems = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown>
    <Button :variant=\${'secondary'}>Account</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'profile'}>Profile</DropdownItem>
      <DropdownItem :command=\${'billing'} :disabled=\${true}>Billing (soon)</DropdownItem>
      <DropdownItem :command=\${'delete'} :divided=\${true} :danger=\${true}>Delete account</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`

export const hideOnClick = `import { pulse } from '@jacare/core'
import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'
import Text from '@jacare/ui/Text'

const picks = pulse([])

export <view>
  <div style="display:grid;gap:0.75rem">
    <Dropdown :hideOnClick=\${false} on-command=\${(value) => picks.set([...picks(), value])}>
      <Button>Multi-pick</Button>
      <DropdownMenu slot="dropdown">
        <DropdownItem :command=\${'alpha'}>Alpha</DropdownItem>
        <DropdownItem :command=\${'beta'}>Beta</DropdownItem>
        <DropdownItem :command=\${'gamma'}>Gamma</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Text :tone=\${'muted'}>Picked: \${() => picks().join(', ') || '—'}</Text>
  </div>
</view>`

export const disabled = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown :disabled=\${true}>
    <Button>Disabled menu</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'noop'}>Cannot open</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`

export const scrollable = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown :maxHeight=\${160}>
    <Button :variant=\${'secondary'}>Long list</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'1'}>Item 1</DropdownItem>
      <DropdownItem :command=\${'2'}>Item 2</DropdownItem>
      <DropdownItem :command=\${'3'}>Item 3</DropdownItem>
      <DropdownItem :command=\${'4'}>Item 4</DropdownItem>
      <DropdownItem :command=\${'5'}>Item 5</DropdownItem>
      <DropdownItem :command=\${'6'}>Item 6</DropdownItem>
      <DropdownItem :command=\${'7'}>Item 7</DropdownItem>
      <DropdownItem :command=\${'8'}>Item 8</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`

export const textTrigger = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'

export <view>
  <Dropdown>
    <span style="font-weight:700;color:var(--j-primary);cursor:pointer">More ▾</span>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'docs'}>Docs</DropdownItem>
      <DropdownItem :command=\${'api'}>API</DropdownItem>
      <DropdownItem :command=\${'support'}>Support</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`
