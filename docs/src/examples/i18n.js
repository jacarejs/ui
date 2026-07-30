export const createI18nBoot = `import { createI18n } from '@jacare/ui/i18n'

createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      hello: 'Hello, {name}!',
      save: 'Save',
      cancel: 'Cancel',
      app: { title: 'My app' },
    },
    'pt-BR': {
      hello: 'Olá, {name}!',
      save: 'Salvar',
      cancel: 'Cancelar',
      app: { title: 'Meu app' },
    },
  },
})`

export const useInTemplate = `import Button from '@jacare/ui/Button'
import { t, setLocale } from '@jacare/ui/i18n'

export <view>
  <h1>\${() => t('app.title')}</h1>
  <p>\${() => t('hello', { name: 'Heber' })}</p>
  <Button :variant=\${'primary'} on-press=\${() => {}}>\${() => t('save')}</Button>
  <Button :variant=\${'ghost'} on-press=\${() => setLocale('pt-BR')}>PT</Button>
  <Button :variant=\${'ghost'} on-press=\${() => setLocale('en')}>EN</Button>
</view>`

export const localeToggleDemo = `import LocaleToggle from '@jacare/ui/LocaleToggle'
import { t } from '@jacare/ui/i18n'

export <view>
  <LocaleToggle
    :locales=\${[
      { id: 'en', label: 'English' },
      { id: 'pt-BR', label: 'Português' },
    ]}
  />
  <p>\${() => t('hello', { name: 'Jacaré' })}</p>
</view>`

export const useI18nHelper = `import { useI18n } from '@jacare/ui/i18n'

const { t, locale, setLocale, addMessages } = useI18n()

addMessages('es', {
  hello: 'Hola, {name}!',
  save: 'Guardar',
})

setLocale('es')
console.log(t('hello', { name: 'Heber' }), locale())`

export const bootScript = `import { localeBootScript } from '@jacare/ui/i18n'

// Early lang on <html> before paint (optional, when persist is on)
const script = document.createElement('script')
script.textContent = localeBootScript()
document.head.appendChild(script)`

export const componentLabels = `import Confirm from '@jacare/ui/Confirm'
import ThemeToggle from '@jacare/ui/ThemeToggle'
import { t } from '@jacare/ui/i18n'

export <view>
  <ThemeToggle
    :labels=\${() => ({
      light: t('theme.light'),
      dark: t('theme.dark'),
      system: t('theme.system'),
    })}
  />
  <Confirm
    :title=\${() => t('confirm.title')}
    :message=\${() => t('confirm.message')}
    :confirmLabel=\${() => t('save')}
    :cancelLabel=\${() => t('cancel')}
  />
</view>`
