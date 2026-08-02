import '../../src/theme/index.css'
import './app.css'
import { effect } from '@jacare/core'
import { restoreThemeEditorFromStorage } from './theme-editor-store.js'
import { scrollDocsNavToActive, scrollDocsToTop } from './navigate.js'
import { nav } from './nav.js'

restoreThemeEditorFromStorage()

const root = document.getElementById('app')
if (!root) throw new Error('Missing #app')

let dispose = null
let stopScroll = null
let lastPath = null

function syncDocsChrome(pathChanged) {
  if (pathChanged) {
    scrollDocsToTop()
    requestAnimationFrame(scrollDocsToTop)
  }
  requestAnimationFrame(() => {
    scrollDocsNavToActive()
    requestAnimationFrame(scrollDocsNavToActive)
  })
}

function boot() {
  dispose = nav.attach(root)
  stopScroll = effect(() => {
    const place = nav.where()
    const pathChanged = lastPath !== null && lastPath !== place.path
    const firstPaint = lastPath === null
    lastPath = place.path
    if (pathChanged || firstPaint) syncDocsChrome(pathChanged)
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
