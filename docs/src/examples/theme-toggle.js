export const basic = `import ThemeToggle from '@jacare/ui/ThemeToggle'

export <view>
  <ThemeToggle />
</view>`

export const labels = `import ThemeToggle from '@jacare/ui/ThemeToggle'

const labels = {
  light: 'Day',
  dark: 'Night',
  system: 'Device',
}

export <view>
  <ThemeToggle :labels=\${labels} />
</view>`

export const change = `import { pulse } from '@jacare/core'
import ThemeToggle from '@jacare/ui/ThemeToggle'

const status = pulse('No theme selected')

export <view>
  <div>
    <ThemeToggle on-change=\${(mode) => status.set('Selected: ' + mode)} />
    <p aria-live="polite">\${status}</p>
  </div>
</view>`

export const fallbackLabels = `import ThemeToggle from '@jacare/ui/ThemeToggle'

const labels = {
  system: 'Automatic',
}

export <view>
  <ThemeToggle :labels=\${labels} />
</view>`
