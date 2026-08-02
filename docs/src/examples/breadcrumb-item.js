export const links = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb>
    <BreadcrumbItem :href=\${'#home'}>Home</BreadcrumbItem>
    <BreadcrumbItem :href=\${'#components'}>Components</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const currentPage = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb>
    <BreadcrumbItem :href=\${'/'}>Home</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/components'}>Components</BreadcrumbItem>
    <BreadcrumbItem>BreadcrumbItem</BreadcrumbItem>
  </Breadcrumb>
</view>`

export const customSeparator = `import Breadcrumb from '@jacare/ui/Breadcrumb'
import BreadcrumbItem from '@jacare/ui/BreadcrumbItem'

export <view>
  <Breadcrumb :separator=\${'›'}>
    <BreadcrumbItem :href=\${'/docs'}>Docs</BreadcrumbItem>
    <BreadcrumbItem :href=\${'/docs/navigation'}>Navigation</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
  </Breadcrumb>
</view>`
