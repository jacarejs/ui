export const basic = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb>
    <BreadcrumbItem :href=\${'/'}>Home</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/components'}>Components</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const separator = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'›'}>
    <BreadcrumbItem :href=\${'/workspace'}>Workspace</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/workspace/projects'}>Projects</BreadcrumbItem>
    <BreadcrumbItem>Jacaré UI</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const chevron = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'/'}>
    <BreadcrumbItem :href=\${'/'}>Home</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/docs'}>Docs</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/docs/navigation'}>Navigation</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const arrow = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'→'} :separatorIcon=\${'arrow-right'}>
    <BreadcrumbItem :href=\${'/account'}>Account</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/account/security'}>Security</BreadcrumbItem>
    <BreadcrumbItem>Sessions</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const dot = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'·'}>
    <BreadcrumbItem :href=\${'/shop'}>Shop</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/shop/men'}>Men</BreadcrumbItem>
    <BreadcrumbItem>Sneakers</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const longPath = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'›'}>
    <BreadcrumbItem :href=\${'/organization'}>Organization</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/organization/workspaces'}>Workspaces</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/organization/workspaces/design-system'}>Design system</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/organization/workspaces/design-system/a11y'}>Accessibility</BreadcrumbItem>
    <BreadcrumbItem>Review</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const twoLevels = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb>
    <BreadcrumbItem :href=\${'/settings'}>Settings</BreadcrumbItem>
    <BreadcrumbItem>Profile</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const single = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb>
    <BreadcrumbItem>Dashboard</BreadcrumbItem>
  </Breadcrumb>
</view>`
