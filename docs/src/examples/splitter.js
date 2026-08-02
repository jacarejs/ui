export const basic = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
      <div style="height:220px"><Splitter>
        <SplitterPanel :size=\${'35%'} :min=\${'160px'} :max=\${'70%'}><div style="padding:1rem">Navigation</div></SplitterPanel>
        <SplitterPanel><div style="padding:1rem">Editor</div></SplitterPanel>
      </Splitter></div>
</view>`

export const vertical = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
      <div style="height:260px"><Splitter :layout=\${'vertical'}>
        <SplitterPanel :size=\${'45%'} :min=\${'80px'}><div style="padding:1rem">Preview</div></SplitterPanel>
        <SplitterPanel><div style="padding:1rem">Console</div></SplitterPanel>
      </Splitter></div>
</view>`

export const fixed = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
      <div style="height:180px"><Splitter>
        <SplitterPanel :size=\${'220px'} :resizable=\${false}><div style="padding:1rem">Fixed rail</div></SplitterPanel>
        <SplitterPanel><div style="padding:1rem">Flexible content</div></SplitterPanel>
      </Splitter></div>
</view>`

export const resize = `import { pulse } from '@jacare/core'
import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

const sizes = pulse('Drag a handle')

export <view>
  <p aria-live="polite">\${sizes}</p>
  <div style="height:180px"><Splitter on-resize=\${(value) => sizes.set(value.sizes.join(' / '))}>
    <SplitterPanel :size=\${'40%'} :min=\${'120px'}><div style="padding:1rem">Outline</div></SplitterPanel>
    <SplitterPanel><div style="padding:1rem">Document</div></SplitterPanel>
  </Splitter></div>
</view>`
