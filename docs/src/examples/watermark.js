export const basic = `import Watermark from '@jacare/ui/Watermark'

export <view>
  <Watermark :content=\${'Jacaré UI'}>
    <div style="min-height:12rem;padding:1rem">Protected workspace content</div>
  </Watermark>
</view>`

export const multiline = `import Watermark from '@jacare/ui/Watermark'

export <view>
  <Watermark :content=\${['CONFIDENTIAL', 'Internal only']} :fontSize=\${14}>
    <div style="min-height:12rem;padding:1rem">Quarterly report</div>
  </Watermark>
</view>`

export const layout = `import Watermark from '@jacare/ui/Watermark'

export <view>
  <Watermark :content=\${'Draft'} :rotate=\${-12} :gap=\${[48, 56]} :offset=\${[16, 20]}>
    <div style="min-height:12rem;padding:1rem">Document preview</div>
  </Watermark>
</view>`

export const appearance = `import Watermark from '@jacare/ui/Watermark'

export <view>
  <Watermark :content=\${'Preview'} :fontColor=\${'rgba(14, 116, 144, 0.22)'} :fontSize=\${20} :width=\${150} :height=\${72}>
    <div style="min-height:12rem;padding:1rem">Custom watermark appearance</div>
  </Watermark>
</view>`

export function playgroundCode({ content, rotate, gap, fontColor, fontSize }) {
  return `import Watermark from '@jacare/ui/Watermark'

export <view>
  <Watermark :content=\${'${content}'} :rotate=\${${rotate}} :gap=\${[${gap[0]}, ${gap[1]}]} :fontColor=\${'${fontColor}'} :fontSize=\${${fontSize}}>
    <div style="min-height:12rem;padding:1rem">Document preview</div>
  </Watermark>
</view>`
}

export const image = `import Watermark from '@jacare/ui/Watermark'

const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="40"%3E%3Crect width="80" height="40" rx="8" fill="%23059669"/%3E%3Ctext x="40" y="25" text-anchor="middle" fill="white" font-size="14"%3EJUI%3C/text%3E%3C/svg%3E'

export <view>
  <Watermark :image=\${logo} :width=\${80} :height=\${40} :gap=\${[64, 64]} :rotate=\${0} :zIndex=\${12}>
    <div style="min-height:12rem;padding:1rem">Image watermark</div>
  </Watermark>
</view>`
