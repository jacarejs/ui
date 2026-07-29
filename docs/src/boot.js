import '../../src/theme/index.css'
import './app.css'
import { restoreThemeEditorFromStorage } from './theme-editor-store.js'
import { assetUrl } from './navigate.js'
import { nav } from './nav.js'

document.documentElement.style.setProperty(
  '--docs-logo-mask',
  `url("${assetUrl('jacare-logo.png')}")`,
)

restoreThemeEditorFromStorage()

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app')

let dispose = null

function boot() {
  dispose = nav.attach(root)
}

boot()

if (import.meta.hot) {
  import.meta.hot.accept()
  import.meta.hot.dispose(() => {
    dispose?.()
    dispose = null
  })
}
