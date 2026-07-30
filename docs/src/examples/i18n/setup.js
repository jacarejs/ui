import { createI18n } from '@jacare/ui/i18n/index.js'
import { messages } from './locales/index.js'

export function setupI18n(options = {}) {
  return createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    persist: false,
    messages,
    ...options,
  })
}

export { messages }
