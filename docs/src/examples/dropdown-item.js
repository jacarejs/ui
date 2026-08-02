export const commands = `import Dropdown from '@jacare/ui/Dropdown'
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

export const labels = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown>
    <Button>Export</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :label=\${'Export CSV'} :command=\${'csv'} />
      <DropdownItem :label=\${'Export JSON'} :command=\${'json'} />
    </DropdownMenu>
  </Dropdown>
</view>`

export const states = `import Dropdown from '@jacare/ui/Dropdown'
import DropdownMenu from '@jacare/ui/DropdownMenu'
import DropdownItem from '@jacare/ui/DropdownItem'
import Button from '@jacare/ui/Button'

export <view>
  <Dropdown>
    <Button>Project</Button>
    <DropdownMenu slot="dropdown">
      <DropdownItem :command=\${'rename'}>Rename</DropdownItem>
      <DropdownItem :command=\${'duplicate'} :disabled=\${true}>Duplicate</DropdownItem>
      <DropdownItem :command=\${'delete'} :divided=\${true}>Delete</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</view>`
