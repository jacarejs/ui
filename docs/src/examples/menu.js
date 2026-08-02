export const basic = `import { pulse } from '@jacare/core'
import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

const selected = pulse('home')

export <view>
  <Menu :defaultActive=\${'home'} on-select=\${(value) => selected.set(value)}>
    <MenuItem :index=\${'home'}>Home</MenuItem>
    <MenuItem :index=\${'projects'}>Projects</MenuItem>
    <SubMenu :index=\${'settings'} :title=\${'Settings'}>
      <MenuItem :index=\${'profile'}>Profile</MenuItem>
      <MenuItem :index=\${'security'}>Security</MenuItem>
    </SubMenu>
  </Menu>
</view>`

export const horizontal = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'

export <view>
  <Menu :mode=\${'horizontal'} :defaultActive=\${'overview'}>
    <MenuItem :index=\${'overview'}>Overview</MenuItem>
    <MenuItem :index=\${'activity'}>Activity</MenuItem>
    <MenuItem :index=\${'team'}>Team</MenuItem>
  </Menu>
</view>`

export const horizontalSubmenu = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
  <Menu :mode=\${'horizontal'} :defaultActive=\${'overview'}>
    <MenuItem :index=\${'overview'}>Overview</MenuItem>
    <SubMenu :index=\${'product'} :title=\${'Product'}>
      <MenuItem :index=\${'features'}>Features</MenuItem>
      <MenuItem :index=\${'pricing'}>Pricing</MenuItem>
      <MenuItem :index=\${'changelog'}>Changelog</MenuItem>
    </SubMenu>
    <MenuItem :index=\${'team'}>Team</MenuItem>
  </Menu>
</view>`

export const collapsed = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'

export <view>
  <Menu :defaultActive=\${'inbox'} :collapse=\${true}>
    <MenuItem :index=\${'inbox'}>Inbox</MenuItem>
    <MenuItem :index=\${'calendar'}>Calendar</MenuItem>
    <MenuItem :index=\${'reports'}>Reports</MenuItem>
  </Menu>
</view>`

export const collapseToggle = `import { pulse } from '@jacare/core'
import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'
import Switch from '@jacare/ui/Switch'

const collapsed = pulse(false)

export <view>
  <Switch :label=\${'Collapse rail'} bind-checked=\${collapsed} />
  <Menu :defaultActive=\${'inbox'} :collapse=\${collapsed}>
    <MenuItem :index=\${'inbox'}>Inbox</MenuItem>
    <MenuItem :index=\${'calendar'}>Calendar</MenuItem>
    <SubMenu :index=\${'reports'} :title=\${'Reports'}>
      <MenuItem :index=\${'weekly'}>Weekly</MenuItem>
      <MenuItem :index=\${'monthly'}>Monthly</MenuItem>
    </SubMenu>
  </Menu>
</view>`

export const submenu = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
  <Menu :defaultActive=\${'members'}>
    <MenuItem :index=\${'dashboard'}>Dashboard</MenuItem>
    <SubMenu :index=\${'workspace'} :title=\${'Workspace'}>
      <MenuItem :index=\${'members'}>Members</MenuItem>
      <MenuItem :index=\${'permissions'}>Permissions</MenuItem>
      <MenuItem :index=\${'billing'} :disabled=\${true}>Billing</MenuItem>
    </SubMenu>
  </Menu>
</view>`

export const nested = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
  <Menu :defaultActive=\${'roles'}>
    <MenuItem :index=\${'home'}>Home</MenuItem>
    <SubMenu :index=\${'admin'} :title=\${'Admin'}>
      <MenuItem :index=\${'users'}>Users</MenuItem>
      <SubMenu :index=\${'access'} :title=\${'Access'}>
        <MenuItem :index=\${'roles'}>Roles</MenuItem>
        <MenuItem :index=\${'policies'}>Policies</MenuItem>
      </SubMenu>
    </SubMenu>
  </Menu>
</view>`

export const links = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'

export <view>
  <Menu :defaultActive=\${'docs'}>
    <MenuItem :index=\${'docs'} :href=\${'/components/menu'}>Docs</MenuItem>
    <MenuItem :index=\${'github'} :href=\${'https://github.com'}>GitHub</MenuItem>
    <MenuItem :index=\${'disabled'} :href=\${'/x'} :disabled=\${true}>Disabled link</MenuItem>
  </Menu>
</view>`

export const mobile = `import { pulse } from '@jacare/core'
import Button from '@jacare/ui/Button'
import Drawer from '@jacare/ui/Drawer'
import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'
import Text from '@jacare/ui/Text'

const open = pulse(false)
const active = pulse('home')

function select(value) {
  active.set(value)
  open.set(false)
}

export <view>
  <Button :variant=\${'secondary'} on-press=\${() => open.set(true)}>Open menu</Button>
  <Text :tone=\${'muted'}>Active: \${() => active()}</Text>

  <Drawer
    bind-open=\${open}
    :title=\${'Navigation'}
    :direction=\${'ltr'}
    :size=\${'18rem'}
  >
    <Menu :defaultActive=\${'home'} on-select=\${select}>
      <MenuItem :index=\${'home'}>Home</MenuItem>
      <MenuItem :index=\${'search'}>Search</MenuItem>
      <SubMenu :index=\${'explore'} :title=\${'Explore'}>
        <MenuItem :index=\${'projects'}>Projects</MenuItem>
        <MenuItem :index=\${'teams'}>Teams</MenuItem>
        <MenuItem :index=\${'templates'}>Templates</MenuItem>
      </SubMenu>
      <SubMenu :index=\${'account'} :title=\${'Account'}>
        <MenuItem :index=\${'profile'}>Profile</MenuItem>
        <MenuItem :index=\${'billing'}>Billing</MenuItem>
        <MenuItem :index=\${'security'}>Security</MenuItem>
        <MenuItem :index=\${'notifications'}>Notifications</MenuItem>
      </SubMenu>
      <MenuItem :index=\${'help'}>Help</MenuItem>
      <MenuItem :index=\${'signout'} :disabled=\${true}>Sign out</MenuItem>
    </Menu>
  </Drawer>
</view>`

export const selectFeedback = `import { pulse } from '@jacare/core'
import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'
import Text from '@jacare/ui/Text'

const selected = pulse('home')

export <view>
  <Text>Selected: \${() => selected()}</Text>
  <Menu :defaultActive=\${'home'} on-select=\${(value) => selected.set(value)}>
    <MenuItem :index=\${'home'}>Home</MenuItem>
    <MenuItem :index=\${'inbox'}>Inbox</MenuItem>
    <SubMenu :index=\${'more'} :title=\${'More'}>
      <MenuItem :index=\${'archive'}>Archive</MenuItem>
      <MenuItem :index=\${'trash'}>Trash</MenuItem>
    </SubMenu>
  </Menu>
</view>`
