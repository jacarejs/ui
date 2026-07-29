import '../../src/theme/index.css'
import './app.css'
import { effect } from '@jacare/core'
import { restoreThemeEditorFromStorage } from './theme-editor-store.js'
import { assetUrl, scrollDocsToTop } from './navigate.js'
import { nav } from './nav.js'

document.documentElement.style.setProperty(
  '--docs-logo-mask',
  `url("${assetUrl('jacare-logo.png')}")`,
)

restoreThemeEditorFromStorage()

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app')

let dispose = null
let stopScroll = null
let lastPath = null

function boot() {
  dispose = nav.attach(root)
  stopScroll = effect(() => {
    const place = nav.where()
    if (lastPath !== null && lastPath !== place.path) {
      scrollDocsToTop()
      requestAnimationFrame(scrollDocsToTop)
    }
    lastPath = place.path
  })
}

boot()

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    stopScroll?.dispose?.()
    stopScroll = null
    dispose?.()
    dispose = null
    lastPath = null
  })
}
