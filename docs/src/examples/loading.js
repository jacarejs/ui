export const basic = `import Loading from '@jacare/ui/Loading'

export <view>
  <Loading :loading=\${true}>
    <div style="min-height:8rem;padding:1rem">Dashboard content</div>
  </Loading>
</view>`

export const text = `import Loading from '@jacare/ui/Loading'

export <view>
  <Loading :loading=\${true} :text=\${'Preparing your workspace…'}>
    <div style="min-height:8rem;padding:1rem">Workspace</div>
  </Loading>
</view>`

export const background = `import Loading from '@jacare/ui/Loading'

export <view>
  <Loading :loading=\${true} :background=\${'rgba(220, 239, 232, 0.92)'}>
    <div style="min-height:8rem;padding:1rem">Report</div>
  </Loading>
</view>`

export const service = `import { showLoading, closeLoading } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

function load() {
  showLoading({ text: 'Publishing…' })
  setTimeout(() => closeLoading(), 1200)
}

export <view>
  <Button on-press=\${load}>Show fullscreen loading</Button>
</view>`

export const inactive = `import Loading from '@jacare/ui/Loading'

export <view>
  <Loading :loading=\${false} :text=\${'Not displayed'}>
    <div style="min-height:8rem;padding:1rem">Content remains interactive</div>
  </Loading>
</view>`

export const fullscreen = `import { pulse } from '@jacare/core'
import Loading from '@jacare/ui/Loading'
import Button from '@jacare/ui/Button'

const loading = pulse(false)

export <view>
  <Button on-press=\${() => {
    loading.set(true)
    setTimeout(() => loading.set(false), 1200)
  }}>Show fullscreen component</Button>
  <Loading :loading=\${loading} :fullscreen=\${true} :text=\${'Loading application…'} />
</view>`

export const local_service = `import { showLoading } from '@jacare/ui/feedback'
import Button from '@jacare/ui/Button'

function loadPanel() {
  const instance = showLoading({ target: '#loading-panel', text: 'Refreshing…', background: 'rgba(255,255,255,.88)' })
  setTimeout(() => instance.close(), 1200)
}

export <view>
  <div id="loading-panel" style="min-height:8rem;padding:1rem">
    <Button on-press=\${loadPanel}>Refresh panel</Button>
  </div>
</view>`
