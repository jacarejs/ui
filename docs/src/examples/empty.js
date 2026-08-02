export const basic = `import Empty from '@jacare/ui/Empty'

export <view>
  <Empty
    :title=\${'No projects yet'}
    :description=\${'Create a project to start shipping components.'}
  />
</view>`

export const action = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'

export <view>
  <Empty
    :title=\${'No projects yet'}
    :description=\${'Create a project to start shipping components.'}
  >
    <Button>Create project</Button>
  </Empty>
</view>`

export const types = `import Empty from '@jacare/ui/Empty'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'lg'} :wrap=\${true}>
    <Empty :type=\${'default'} :title=\${'No data'} :description=\${'Nothing to show'} :imageSize=\${88} />
    <Empty :type=\${'search'} :title=\${'No matches'} :description=\${'Try another query'} :imageSize=\${88} />
    <Empty :type=\${'inbox'} :title=\${'Inbox clear'} :description=\${'You are all caught up'} :imageSize=\${88} />
    <Empty :type=\${'error'} :title=\${'Unavailable'} :description=\${'Could not load this list'} :imageSize=\${88} />
    <Empty :type=\${'success'} :title=\${'All done'} :description=\${'Every task is complete'} :imageSize=\${88} />
  </Stack>
</view>`

export const custom_image = `import Empty from '@jacare/ui/Empty'

const image = 'data:image/svg+xml,...'

export <view>
  <Empty
    :title=\${'Nothing archived'}
    :description=\${'Finished work will appear here.'}
    :image=\${image}
    :imageSize=\${96}
  />
</view>`

export const image_size = `import Empty from '@jacare/ui/Empty'
import Stack from '@jacare/ui/Stack'

export <view>
  <Stack :direction=\${'row'} :gap=\${'xl'} :wrap=\${true}>
    <Empty :title=\${'Compact'} :description=\${'Small illustration'} :imageSize=\${64} />
    <Empty :title=\${'Default'} :description=\${'Standard illustration'} :imageSize=\${120} />
    <Empty :title=\${'Prominent'} :description=\${'Large illustration'} :imageSize=\${160} />
  </Stack>
</view>`

export const custom_content = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'
import Stack from '@jacare/ui/Stack'

export <view>
  <Empty
    :type=\${'search'}
    :title=\${'No search results'}
    :description=\${'We could not find anything for that filter set.'}
  >
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button :variant=\${'secondary'}>Clear filters</Button>
      <Button>New search</Button>
    </Stack>
  </Empty>
</view>`

export const searchExample = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'

export <view>
  <Empty
    :type=\${'search'}
    :title=\${'No results for “aurora”'}
    :description=\${'Check spelling or broaden the filters.'}
  >
    <Button :variant=\${'secondary'}>Clear search</Button>
  </Empty>
</view>`

export const inboxExample = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'

export <view>
  <Empty
    :type=\${'inbox'}
    :title=\${'Inbox zero'}
    :description=\${'New messages and mentions will land here.'}
  >
    <Button :variant=\${'secondary'}>Compose</Button>
  </Empty>
</view>`

export const errorExample = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'
import Stack from '@jacare/ui/Stack'

export <view>
  <Empty
    :type=\${'error'}
    :title=\${'Could not load projects'}
    :description=\${'Check your connection, then try again.'}
  >
    <Stack :direction=\${'row'} :gap=\${'sm'}>
      <Button :variant=\${'secondary'}>Back</Button>
      <Button>Retry</Button>
    </Stack>
  </Empty>
</view>`

export const inCard = `import Button from '@jacare/ui/Button'
import Card from '@jacare/ui/Card'
import Empty from '@jacare/ui/Empty'

export <view>
  <Card :title=\${'Recent deploys'} :shadow=\${'hover'}>
    <Empty
      :type=\${'inbox'}
      :title=\${'No deploys yet'}
      :description=\${'Ship a release to see activity here.'}
      :imageSize=\${88}
    >
      <Button :size=\${'sm'}>Deploy now</Button>
    </Empty>
  </Card>
</view>`

export const inPanel = `import Button from '@jacare/ui/Button'
import Empty from '@jacare/ui/Empty'

export <view>
  <section class="docs-panel">
    <Empty
      :title=\${'No rows'}
      :description=\${'Import a CSV or add the first record.'}
      :imageSize=\${88}
    >
      <Button :size=\${'sm'}>Import CSV</Button>
    </Empty>
  </section>
</view>`

function quote(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

export function playgroundCode(state) {
  const lines = [
    "import Empty from '@jacare/ui/Empty'",
  ]
  if (state.showAction) lines.push("import Button from '@jacare/ui/Button'")
  lines.push('', 'export <view>', '  <Empty')
  if (state.type && state.type !== 'default') lines.push(`    :type=\${'${state.type}'}`)
  if (state.title) lines.push(`    :title=\${'${quote(state.title)}'}`)
  if (state.description) lines.push(`    :description=\${'${quote(state.description)}'}`)
  if (state.imageSize && Number(state.imageSize) !== 120) {
    lines.push(`    :imageSize=\${${Number(state.imageSize) || 120}}`)
  }
  if (state.showAction) {
    lines.push('  >', '    <Button>Create project</Button>', '  </Empty>')
  } else {
    lines.push('  />')
  }
  lines.push('</view>')
  return lines.join('\n')
}
