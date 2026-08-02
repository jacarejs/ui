export const basic = `import Scrollbar from '@jacare/ui/Scrollbar'

export <view>
      <Scrollbar :height=\${'180px'}><div style="height:420px;padding:0.75rem">Scrollable content<br />Keep scrolling to inspect the styled thumb.</div></Scrollbar>
</view>`

export const maxHeight = `import Scrollbar from '@jacare/ui/Scrollbar'

export <view>
      <Scrollbar :maxHeight=\${'140px'} :always=\${true}><div style="min-height:300px;padding:0.75rem">The track remains visible because always is true.</div></Scrollbar>
</view>`

export const native = `import { pulse } from '@jacare/core'
import Scrollbar from '@jacare/ui/Scrollbar'

const scrollPosition = pulse('0')

export <view>
      <Scrollbar :height=\${'150px'} :native=\${true} on-scroll=\${(value) => scrollPosition.set(String(value.scrollTop))}>
        <div style="width:640px;height:320px;padding:0.75rem">Native two-axis scrolling surface</div>
      </Scrollbar>
</view>`

export const always = `import Scrollbar from '@jacare/ui/Scrollbar'

export <view>
  <Scrollbar :height=\${'140px'} :always=\${true}>
    <div style="width:520px;height:280px;padding:0.75rem">Persistent vertical and horizontal tracks</div>
  </Scrollbar>
</view>`
