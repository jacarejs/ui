export const actionList = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
   <Dropdown>
    <Button>Actions</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'edit'}>Edit</DropdownItem>
      <DropdownItem :command=\${'archive'}>Archive</DropdownItem>
    </DropdownMenu>
   </Dropdown>
</view>`

export const hoverMenu = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown :trigger=\${'hover'}>
    <Button>Share</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'copy'}>Copy link</DropdownItem>
      <DropdownItem :command=\${'email'}>Send email</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`

export const groupedActions = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown :placement=\${'bottom-end'}>
    <Button>Account</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'profile'}>Profile</DropdownItem>
      <DropdownItem :command=\${'settings'}>Settings</DropdownItem>
      <DropdownItem :command=\${'signout'} :divided=\${true}>Sign out</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`
