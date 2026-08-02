export const basic = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <Tooltip :content=\${'Save changes'}>
    <Button>Save</Button>
  </Tooltip>
</view>`

export const effects = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <Tooltip :content=\${'Light tooltip'} :appearance=\${'light'}>
    <Button>Light</Button>
  </Tooltip>
</view>`

export const placements = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <Tooltip :content=\${'Shown on the right'} :placement=\${'right'}>
    <Button>Right</Button>
  </Tooltip>
</view>`

export const delays = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <Tooltip :content=\${'Appears after 400ms'} :showAfter=\${400} :hideAfter=\${100}>
    <Button>Delayed</Button>
  </Tooltip>
</view>`

export const disabled = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <Tooltip :content=\${'Hidden'} :disabled=\${true}>
    <Button>Disabled tooltip</Button>
  </Tooltip>
</view>`

export const placement_grid = `import Tooltip from '@jacare/ui/Tooltip'
import Button from '@jacare/ui/Button'

export <view>
  <div style="display:grid;grid-template-columns:repeat(3,auto);gap:3rem;justify-content:center;padding:4rem">
    #for ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end'] as placement
      <Tooltip :content=\${placement} :placement=\${placement}><Button>\${placement}</Button></Tooltip>
    #end
  </div>
</view>`
