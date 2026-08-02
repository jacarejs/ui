export const activeItem = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
   <Menu :defaultActive=\${'home'}>
    <MenuItem :index=\${'home'}>Home</MenuItem>
    <SubMenu :index=\${'guides'} :title=\${'Guides'}>
      <MenuItem :index=\${'install'}>Install</MenuItem>
      <MenuItem :index=\${'theme'}>Theme</MenuItem>
    </SubMenu>
   </Menu>
</view>`

export const links = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'

export <view>
  <Menu :defaultActive=\${'docs'}>
    <MenuItem :index=\${'home'} :href=\${'/'}>Home</MenuItem>
    <MenuItem :index=\${'docs'} :href=\${'/components'}>Components</MenuItem>
  </Menu>
</view>`

export const disabled = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'

export <view>
  <Menu :mode=\${'horizontal'} :defaultActive=\${'overview'}>
    <MenuItem :index=\${'overview'}>Overview</MenuItem>
    <MenuItem :index=\${'reports'}>Reports</MenuItem>
    <MenuItem :index=\${'admin'} :disabled=\${true}>Admin</MenuItem>
  </Menu>
</view>`
