export const locales = `import LocaleToggle from '@jacare/ui/LocaleToggle'

export <view>
  <LocaleToggle :locales=\${['en', 'pt-BR', 'es']} />
</view>`

export const labels = `import LocaleToggle from '@jacare/ui/LocaleToggle'

const labels = {
  en: 'English',
  'pt-BR': 'Português',
}

export <view>
  <LocaleToggle :locales=\${['en', 'pt-BR']} :labels=\${labels} />
</view>`

export const objects = `import LocaleToggle from '@jacare/ui/LocaleToggle'

const locales = [
  { id: 'en', label: 'EN' },
  { value: 'pt-BR', label: 'PT' },
]

export <view>
  <LocaleToggle :locales=\${locales} on-change=\${(locale) => console.log(locale)} />
</view>`

export const change = `import { pulse } from '@jacare/core'
import LocaleToggle from '@jacare/ui/LocaleToggle'

const status = pulse('Choose a language')

export <view>
  <div>
    <LocaleToggle :locales=\${['en', 'pt-BR']} on-change=\${(locale) => status.set('Active locale: ' + locale)} />
    <p aria-live="polite">\${status}</p>
  </div>
</view>`
