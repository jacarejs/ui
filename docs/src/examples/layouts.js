export const shell = `import Flex from '@jacare/ui/Flex'
import Text from '@jacare/ui/Text'

export <view>
  <div class="jui-layout-shell">
    <div class="jui-layout-shell__bar">
      <Flex :align=\${'center'} :justify=\${'between'} :gap=\${'md'}>
        <Text :weight=\${'bold'}>Jacaré UI</Text>
        <Text :tone=\${'muted'} :size=\${'sm'}>Build with pulse</Text>
      </Flex>
    </div>
    <div class="jui-layout-shell__body">
      <Text>Main content uses canopy surface tokens.</Text>
    </div>
  </div>
</view>`

export const sidebar = `import Flex from '@jacare/ui/Flex'
import Text from '@jacare/ui/Text'

export <view>
  <div class="jui-layout-sidebar">
    <Flex :gap=\${'none'} :align=\${'stretch'}>
      <aside class="jui-layout-sidebar__nav">
        <Flex :direction=\${'column'} :gap=\${'sm'}>
          <Text :weight=\${'bold'} :size=\${'sm'}>Nav</Text>
          <Text :tone=\${'muted'} :size=\${'sm'}>Introduction</Text>
          <Text :tone=\${'muted'} :size=\${'sm'}>Layouts</Text>
        </Flex>
      </aside>
      <main class="jui-layout-sidebar__main">
        <Flex :direction=\${'column'} :gap=\${'sm'}>
          <Text :weight=\${'bold'}>Content</Text>
          <Text :tone=\${'muted'}>Sidebar + main split with Flex.</Text>
        </Flex>
      </main>
    </Flex>
  </div>
</view>`

export const split = `import Card from '@jacare/ui/Card'
import Grid from '@jacare/ui/Grid'
import Text from '@jacare/ui/Text'

export <view>
  <Grid :columns=\${'2'} :gap=\${'lg'}>
    <Card :title=\${'Brand'} :subtitle=\${'Primary'}>
      <Text :tone=\${'muted'}>--j-primary / --j-leaf</Text>
    </Card>
    <Card :title=\${'Surface'} :subtitle=\${'Mint'}>
      <Text :tone=\${'muted'}>--j-surface / --j-mint</Text>
    </Card>
  </Grid>
</view>`

export const gallery = `import Badge from '@jacare/ui/Badge'
import Card from '@jacare/ui/Card'
import Grid from '@jacare/ui/Grid'
import Text from '@jacare/ui/Text'

export <view>
  <Grid :columns=\${'auto'} :gap=\${'md'}>
    <Card :title=\${'Alert'} :subtitle=\${'Feedback'}>
      <Badge :text=\${'Stable'} :tone=\${'success'} />
    </Card>
    <Card :title=\${'Flex'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Row / column positioning</Text>
    </Card>
    <Card :title=\${'Grid'} :subtitle=\${'Layout'}>
      <Text :tone=\${'muted'} :size=\${'sm'}>Column tracks</Text>
    </Card>
  </Grid>
</view>`

export const toolbar = `import Button from '@jacare/ui/Button'
import Flex from '@jacare/ui/Flex'
import Text from '@jacare/ui/Text'

export <view>
  <div class="jui-layout-toolbar">
    <Flex :align=\${'center'} :justify=\${'between'} :gap=\${'md'} :wrap=\${true}>
      <Text :weight=\${'bold'}>Projects</Text>
      <Flex :gap=\${'sm'} :wrap=\${true}>
        <Button :variant=\${'secondary'} :size=\${'sm'}>Filter</Button>
        <Button :size=\${'sm'}>New</Button>
      </Flex>
    </Flex>
  </div>
</view>`
