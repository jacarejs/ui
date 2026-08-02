export const playground = `import { pulse } from '@jacare/core'
import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'
import Input from '@jacare/ui/Input'
import Text from '@jacare/ui/Text'

const open = pulse(false)
const status = pulse('Press Start tour')

export <view>
  <div style="display:grid;gap:1rem;padding:1rem;border:1px solid var(--j-border);border-radius:var(--j-radius);background:var(--j-surface)">
    <div style="display:flex;justify-content:space-between;gap:0.75rem;align-items:center">
      <Text :weight=\${'bold'}>Workspace</Text>
      <div id="tour-demo-start">
        <Button on-press=\${() => { status.set('Tour running'); open.set(true) }}>Start tour</Button>
      </div>
    </div>
    <div id="tour-demo-search">
      <Input :placeholder=\${'Search projects…'} />
    </div>
    <div id="tour-demo-nav" style="display:flex;gap:0.5rem;flex-wrap:wrap">
      <Button :variant=\${'secondary'} :size=\${'sm'}>Overview</Button>
      <Button :variant=\${'secondary'} :size=\${'sm'}>Reports</Button>
      <Button :variant=\${'secondary'} :size=\${'sm'}>Team</Button>
    </div>
    <div id="tour-demo-cta">
      <Button :variant=\${'success'}>Create project</Button>
    </div>
    <Text :tone=\${'muted'}>\${() => status()}</Text>
  </div>
  <Tour
    bind-open=\${open}
    on-change=\${(index) => status.set('Step ' + (index + 1))}
    on-finish=\${() => status.set('Tour completed')}
    on-close=\${() => status.set('Tour dismissed')}
  >
    <TourStep
      :selector=\${'#tour-demo-start'}
      :title=\${'Start here'}
      :description=\${'Open the guided tour any time from this button.'}
    />
    <TourStep
      :selector=\${'#tour-demo-search'}
      :title=\${'Find work fast'}
      :description=\${'Search filters the workspace list as you type.'}
    />
    <TourStep
      :selector=\${'#tour-demo-nav'}
      :title=\${'Jump sections'}
      :description=\${'Switch between Overview, Reports, and Team.'}
    />
    <TourStep
      :selector=\${'#tour-demo-cta'}
      :title=\${'Create something'}
      :description=\${'Finish onboarding by creating your first project.'}
    />
  </Tour>
</view>`

export const basic = `import { pulse } from '@jacare/core'
import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button on-press=\${() => open.set(true)}>Start tour</Button>
  <Tour bind-open=\${open}>
    <TourStep :title=\${'Welcome'} :description=\${'Learn the main workspace controls.'} />
    <TourStep :title=\${'Finish'} :description=\${'Review changes before publishing.'} />
  </Tour>
</view>`

export const events = `import { pulse } from '@jacare/core'
import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'
import Text from '@jacare/ui/Text'

const open = pulse(false)
const status = pulse('Ready')

export <view>
  <div style="display:grid;gap:0.75rem">
    <Button on-press=\${() => open.set(true)}>Start event tour</Button>
    <Text :tone=\${'muted'}>\${() => status()}</Text>
    <Tour
      bind-open=\${open}
      on-change=\${(index) => status.set('Step ' + (index + 1))}
      on-finish=\${() => status.set('Finished')}
      on-close=\${() => status.set('Closed')}
    >
      <TourStep :title=\${'First'} :description=\${'The change event reports the active index.'} />
      <TourStep :title=\${'Second'} :description=\${'Done emits finish and closes the tour.'} />
    </Tour>
  </div>
</view>`

export const single = `import { pulse } from '@jacare/core'
import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'

const open = pulse(false)

export <view>
  <Button :variant=\${'secondary'} on-press=\${() => open.set(true)}>Show tip</Button>
  <Tour bind-open=\${open}>
    <TourStep :title=\${'Quick tip'} :description=\${'Keep one-step guidance concise and optional.'} />
  </Tour>
</view>`

export const controlled = `import { pulse } from '@jacare/core'
import Tour from '@jacare/ui/Tour'
import TourStep from '@jacare/ui/TourStep'
import Button from '@jacare/ui/Button'

const open = pulse(false)
const status = pulse('Tour is closed')

export <view>
  <div style="display:grid;gap:0.75rem">
    <Button on-press=\${() => {
      status.set('Tour is open')
      open.set(true)
    }}>Open controlled tour</Button>
    <p aria-live="polite">\${status}</p>
    <Tour bind-open=\${open} on-close=\${() => status.set('Tour was dismissed')} on-finish=\${() => status.set('Tour was completed')}>
      <TourStep :title=\${'Profile'} :description=\${'Confirm your public profile details.'} />
      <TourStep :title=\${'Preferences'} :description=\${'Choose notifications before continuing.'} />
    </Tour>
  </div>
</view>`
