export const basic = `import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

export <view>
  <Popconfirm :title=\${'Delete this project?'}>
    <Button>Delete</Button>
  </Popconfirm>
</view>`

export const labels = `import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

export <view>
  <Popconfirm :title=\${'Archive this release?'} :confirmButtonText=\${'Archive'} :cancelButtonText=\${'Keep'}>
    <Button>Archive</Button>
  </Popconfirm>
</view>`

export const placement = `import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

export <view>
  <Popconfirm :title=\${'Continue?'} :placement=\${'right-start'} :width=\${240}>
    <Button>Right aligned</Button>
  </Popconfirm>
</view>`

export const events = `import { pulse } from '@jacare/core'
import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

const result = pulse('No decision')

export <view>
  <Popconfirm :title=\${'Publish now?'} on-confirm=\${() => result.set('Published')} on-cancel=\${() => result.set('Canceled')}>
    <Button>Publish</Button>
  </Popconfirm>
  <p>\${result}</p>
</view>`

export const placement_grid = `import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

export <view>
  <div style="display:grid;grid-template-columns:repeat(3,auto);gap:3rem;justify-content:center;padding:4rem">
    #for ['top-start', 'top', 'top-end', 'left', 'right', 'bottom-start', 'bottom', 'bottom-end'] as placement
      <Popconfirm :title=\${'Continue?'} :placement=\${placement}>
        <Button>\${placement}</Button>
      </Popconfirm>
    #end
  </div>
</view>`

export const widths = `import Popconfirm from '@jacare/ui/Popconfirm'
import Button from '@jacare/ui/Button'

export <view>
  <Popconfirm :title=\${'Compact confirmation?'} :width=\${160}><Button>160 px</Button></Popconfirm>
  <Popconfirm :title=\${'This wider confirmation has room for a detailed consequence.'} :width=\${320} :confirmButtonText=\${'Continue'} :cancelButtonText=\${'Go back'}><Button>320 px</Button></Popconfirm>
</view>`
