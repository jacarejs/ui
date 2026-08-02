export const basic = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Project details'} :column=\${2}>
    <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    <DescriptionsItem :label=\${'Package'} :span=\${2}>@jacare/ui</DescriptionsItem>
  </Descriptions>
</view>`

export const bordered = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Release'} :column=\${2} :border=\${true}>
    <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    <DescriptionsItem :label=\${'Package'} :span=\${2}>@jacare/ui</DescriptionsItem>
  </Descriptions>
</view>`

export const vertical = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Deployment'} :column=\${2} :direction=\${'vertical'} :border=\${true}>
    <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    <DescriptionsItem :label=\${'Package'} :span=\${2}>@jacare/ui</DescriptionsItem>
  </Descriptions>
</view>`

export const sizes = `import Stack from '@jacare/ui/Stack'
import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Stack :gap=\${'lg'}>
    <Descriptions :title=\${'Compact'} :column=\${2} :size=\${'sm'} :border=\${true}>
      <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
      <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    </Descriptions>
    <Descriptions :title=\${'Default'} :column=\${2} :size=\${'md'} :border=\${true}>
      <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
      <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    </Descriptions>
    <Descriptions :title=\${'Comfortable'} :column=\${2} :size=\${'lg'} :border=\${true}>
      <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>
      <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>
    </Descriptions>
  </Stack>
</view>`

export const spans = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Account'} :column=\${3} :border=\${true}>
    <DescriptionsItem :label=\${'Name'}>Ada Lovelace</DescriptionsItem>
    <DescriptionsItem :label=\${'Role'}>Administrator</DescriptionsItem>
    <DescriptionsItem :label=\${'Region'}>Europe</DescriptionsItem>
    <DescriptionsItem :label=\${'Notes'} :span=\${3}>Maintains the design system release process.</DescriptionsItem>
  </Descriptions>
</view>`

export const columns = `import Stack from '@jacare/ui/Stack'
import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Stack :gap=\${'lg'}>
    <Descriptions :title=\${'One column'} :column=\${1} :border=\${true}>
      <DescriptionsItem :label=\${'Name'}>Ada Lovelace</DescriptionsItem>
      <DescriptionsItem :label=\${'Role'}>Administrator</DescriptionsItem>
    </Descriptions>
    <Descriptions :title=\${'Four columns'} :column=\${4} :border=\${true}>
      <DescriptionsItem :label=\${'Team'}>Design</DescriptionsItem>
      <DescriptionsItem :label=\${'Seats'}>12</DescriptionsItem>
      <DescriptionsItem :label=\${'Plan'}>Pro</DescriptionsItem>
      <DescriptionsItem :label=\${'Region'}>EU</DescriptionsItem>
    </Descriptions>
  </Stack>
</view>`

export const richContent = `import Badge from '@jacare/ui/Badge'
import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'
import Link from '@jacare/ui/Link'
import Stack from '@jacare/ui/Stack'
import Tag from '@jacare/ui/Tag'

export <view>
  <Descriptions :title=\${'Shipment'} :column=\${3} :border=\${true}>
    <DescriptionsItem :label=\${'Order'}>
      <Link href=\${'#order-4821'}>#4821</Link>
    </DescriptionsItem>
    <DescriptionsItem :label=\${'Status'}>
      <Badge :tone=\${'success'}>In transit</Badge>
    </DescriptionsItem>
    <DescriptionsItem :label=\${'Carrier'}>North Parcel</DescriptionsItem>
    <DescriptionsItem :label=\${'Tags'} :span=\${3}>
      <Stack :direction=\${'row'} :gap=\${'sm'} :wrap=\${true}>
        <Tag :type=\${'info'}>Priority</Tag>
        <Tag :type=\${'success'}>Insured</Tag>
        <Tag :type=\${'warning'}>Signature</Tag>
      </Stack>
    </DescriptionsItem>
  </Descriptions>
</view>`

export const invoice = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Invoice INV-2048'} :column=\${2} :border=\${true} :size=\${'sm'}>
    <DescriptionsItem :label=\${'Bill to'}>River Studio LLC</DescriptionsItem>
    <DescriptionsItem :label=\${'Issued'}>2026-07-12</DescriptionsItem>
    <DescriptionsItem :label=\${'Due'}>2026-08-12</DescriptionsItem>
    <DescriptionsItem :label=\${'Currency'}>USD</DescriptionsItem>
    <DescriptionsItem :label=\${'Subtotal'}>$1,240.00</DescriptionsItem>
    <DescriptionsItem :label=\${'Tax'}>$99.20</DescriptionsItem>
    <DescriptionsItem :label=\${'Total'} :span=\${2}>$1,339.20</DescriptionsItem>
  </Descriptions>
</view>`

export const profile = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :title=\${'Member profile'} :column=\${1} :direction=\${'vertical'}>
    <DescriptionsItem :label=\${'Full name'}>Ana Costa</DescriptionsItem>
    <DescriptionsItem :label=\${'Email'}>ana.costa@example.com</DescriptionsItem>
    <DescriptionsItem :label=\${'Timezone'}>America/Sao_Paulo</DescriptionsItem>
    <DescriptionsItem :label=\${'Bio'}>Product designer focused on form density and calm admin surfaces.</DescriptionsItem>
  </Descriptions>
</view>`

export const untitled = `import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'

export <view>
  <Descriptions :column=\${3} :border=\${true}>
    <DescriptionsItem :label=\${'CPU'}>42%</DescriptionsItem>
    <DescriptionsItem :label=\${'Memory'}>6.1 GB</DescriptionsItem>
    <DescriptionsItem :label=\${'Disk'}>71%</DescriptionsItem>
  </Descriptions>
</view>`

export const cardWrapped = `import Card from '@jacare/ui/Card'
import Descriptions from '@jacare/ui/Descriptions'
import DescriptionsItem from '@jacare/ui/DescriptionsItem'
import Tag from '@jacare/ui/Tag'

export <view>
  <Card :title=\${'Workspace'} :subtitle=\${'Billing summary'} :shadow=\${'hover'}>
    <Descriptions :column=\${2} :size=\${'sm'}>
      <DescriptionsItem :label=\${'Plan'}>
        <Tag :type=\${'primary'}>Business</Tag>
      </DescriptionsItem>
      <DescriptionsItem :label=\${'Renewal'}>2026-09-01</DescriptionsItem>
      <DescriptionsItem :label=\${'Seats'}>28 / 40</DescriptionsItem>
      <DescriptionsItem :label=\${'Owner'}>ops@jacare.dev</DescriptionsItem>
    </Descriptions>
  </Card>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Descriptions from '@jacare/ui/Descriptions'",
    "import DescriptionsItem from '@jacare/ui/DescriptionsItem'",
    '',
    'export <view>',
    '  <Descriptions',
  ]
  if (state.title) lines.push(`    :title=\${'${quote(state.title)}'}`)
  lines.push(`    :column=\${${Number(state.column) || 3}}`)
  if (state.direction === 'vertical') lines.push("    :direction=\${'vertical'}")
  if (state.border) lines.push('    :border=\${true}')
  if (state.size && state.size !== 'md') lines.push(`    :size=\${'${state.size}'}`)
  lines.push(
    '  >',
    "    <DescriptionsItem :label=\${'Owner'}>Jacare UI</DescriptionsItem>",
    "    <DescriptionsItem :label=\${'Status'}>Stable</DescriptionsItem>",
    "    <DescriptionsItem :label=\${'Package'} :span=\${2}>@jacare/ui</DescriptionsItem>",
    '  </Descriptions>',
    '</view>',
  )
  return lines.join('\n')
}
