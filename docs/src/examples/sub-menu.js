export const titledGroup = `import Menu from '@jacare/ui/Menu'
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

export const nestedGroups = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
  <Menu>
    <SubMenu :index=\${'products'} :title=\${'Products'}>
      <MenuItem :index=\${'ui'}>UI library</MenuItem>
      <SubMenu :index=\${'tools'} :title=\${'Tools'}>
        <MenuItem :index=\${'compiler'}>Compiler</MenuItem>
      </SubMenu>
    </SubMenu>
  </Menu>
</view>`

export const titleFallback = `import Menu from '@jacare/ui/Menu'
import MenuItem from '@jacare/ui/MenuItem'
import SubMenu from '@jacare/ui/SubMenu'

export <view>
  <Menu :defaultActive=\${'profile'}>
    <SubMenu :index=\${'account'}>
      <MenuItem :index=\${'profile'}>Profile</MenuItem>
      <MenuItem :index=\${'security'}>Security</MenuItem>
    </SubMenu>
  </Menu>
</view>`
