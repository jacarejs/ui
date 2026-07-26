import '../../src/theme/index.css'
import './app.css'
import { nav } from './nav.js'

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
