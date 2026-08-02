export const basic = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <Popover :title=\${'Project owner'} :content=\${'Ana manages this workspace.'}>
    <Button>View owner</Button>
  </Popover>
</view>`

export const hover = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <Popover :trigger=\${'hover'} :title=\${'Quick preview'} :content=\${'Hover keeps the trigger in context.'}>
    <Button>Hover me</Button>
  </Popover>
</view>`

export const placements = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <Popover :placement=\${'right-start'} :width=\${220} :title=\${'Details'} :content=\${'Aligned to the start edge.'}>
    <Button>Right start</Button>
  </Popover>
</view>`

export const disabled = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <Popover :disabled=\${true} :content=\${'Unavailable'}>
    <Button :disabled=\${true}>Disabled popover</Button>
  </Popover>
</view>`

export const placement_grid = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <div style="display:grid;grid-template-columns:repeat(3,auto);gap:3rem;justify-content:center;padding:4rem">
    #for ['top-start', 'top', 'top-end', 'left', 'right', 'bottom-start', 'bottom', 'bottom-end'] as placement
      <Popover :placement=\${placement} :title=\${placement} :content=\${'Placement preview'}><Button>\${placement}</Button></Popover>
    #end
  </div>
</view>`

export const widths = `import Popover from '@jacare/ui/Popover'
import Button from '@jacare/ui/Button'

export <view>
  <Popover :title=\${'Compact'} :content=\${'Short note'} :width=\${140}><Button>140 px</Button></Popover>
  <Popover :title=\${'Detailed'} :content=\${'A wider surface supports a longer contextual explanation.'} :width=\${320}><Button>320 px</Button></Popover>
</view>`
