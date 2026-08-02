export const basic = `import Affix from '@jacare/ui/Affix'
import Button from '@jacare/ui/Button'

export <view>
      <div style="min-height:12rem"><Affix><Button :size=\${'sm'}>Sticky action</Button></Affix><p>Scroll the page to see the action remain available.</p></div>
</view>`

export const offset = `import Affix from '@jacare/ui/Affix'
import Button from '@jacare/ui/Button'

export <view>
      <div style="min-height:12rem"><Affix :offset=\${72}><Button :variant=\${'secondary'}>Below header</Button></Affix></div>
</view>`

export const bottom = `import Affix from '@jacare/ui/Affix'
import Button from '@jacare/ui/Button'

export <view>
      <div style="min-height:12rem;display:flex;flex-direction:column"><div style="flex:1">Scrollable content</div><Affix :position=\${'bottom'} :offset=\${16} :zIndex=\${120}><Button>Continue</Button></Affix></div>
</view>`

export const stacking = `import Affix from '@jacare/ui/Affix'
import Button from '@jacare/ui/Button'

export <view>
  <div style="min-height:12rem">
    <Affix :offset=\${24} :zIndex=\${200}>
      <Button :variant=\${'secondary'}>Sticky above content</Button>
    </Affix>
  </div>
</view>`
