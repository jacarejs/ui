export const sizedPanels = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
  <div style="height:180px;border:1px solid var(--j-border);border-radius:var(--j-radius);overflow:hidden">
    <Splitter>
      <SplitterPanel :size=\${'40%'}><div style="padding:0.75rem">Navigation</div></SplitterPanel>
      <SplitterPanel><div style="padding:0.75rem">Content</div></SplitterPanel>
    </Splitter>
  </div>
</view>`

export const constrained = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
  <div style="height:180px;border:1px solid var(--j-border);overflow:hidden">
    <Splitter>
      <SplitterPanel :size=\${'35%'} :min=\${'160px'} :max=\${'60%'}><div style="padding:0.75rem">Files</div></SplitterPanel>
      <SplitterPanel><div style="padding:0.75rem">Editor</div></SplitterPanel>
    </Splitter>
  </div>
</view>`

export const fixedPanel = `import Splitter from '@jacare/ui/Splitter'
import SplitterPanel from '@jacare/ui/SplitterPanel'

export <view>
  <div style="height:180px;border:1px solid var(--j-border);overflow:hidden">
    <Splitter :layout=\${'vertical'}>
      <SplitterPanel :size=\${'70%'}><div style="padding:0.75rem">Preview</div></SplitterPanel>
      <SplitterPanel :size=\${'30%'} :resizable=\${false}><div style="padding:0.75rem">Console</div></SplitterPanel>
    </Splitter>
  </div>
</view>`
