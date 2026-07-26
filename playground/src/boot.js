import App from './App.jcr'

const root = document.querySelector('#app')
if (!root) throw new Error('Missing #app')
App(root)
