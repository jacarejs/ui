export const basic = `import { pulse } from '@jacare/core'
import InfiniteScroll from '@jacare/ui/InfiniteScroll'

const loads = pulse(0)

export <view>
  <InfiniteScroll :height=\${'180px'} on-load=\${() => loads.set(loads() + 1)}>
    <div style="height:460px;padding:1rem">Scroll to the bottom to request more items.</div>
  </InfiniteScroll>
</view>`

export const distance = `import { pulse } from '@jacare/core'
import InfiniteScroll from '@jacare/ui/InfiniteScroll'

const loads = pulse(0)

export <view>
  <InfiniteScroll :distance=\${80} :height=\${'180px'} on-load=\${() => loads.set(loads() + 1)}>
    <div style="height:460px;padding:1rem">Loading starts with 80px remaining.</div>
  </InfiniteScroll>
</view>`

export const disabled = `import { pulse } from '@jacare/core'
import InfiniteScroll from '@jacare/ui/InfiniteScroll'
import Button from '@jacare/ui/Button'

const loads = pulse(0)
const loadingDisabled = pulse(true)

export <view>
  <Button :size=\${'sm'} on-press=\${() => loadingDisabled.set(!loadingDisabled())}>Toggle loading guard</Button>
  <InfiniteScroll :disabled=\${loadingDisabled} :distance=\${40} :height=\${'160px'} on-load=\${() => loads.set(loads() + 1)}>
    <div style="height:420px;padding:1rem">No load event fires while disabled.</div>
  </InfiniteScroll>
</view>`

export const loadCount = `import { pulse } from '@jacare/core'
import InfiniteScroll from '@jacare/ui/InfiniteScroll'

const loads = pulse(0)

export <view>
  <p aria-live="polite">Load requests: \${loads}</p>
  <InfiniteScroll :distance=\${48} :height=\${'160px'} on-load=\${() => loads.set(loads() + 1)}>
    <div style="height:420px;padding:1rem">Scroll to request the next page.</div>
  </InfiniteScroll>
</view>`
