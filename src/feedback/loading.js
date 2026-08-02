import { ensureFeedbackStyles } from './message.js'

let fullscreenInstance = null

function resolveTarget(target) {
  if (!target) return document.body
  if (typeof target === 'string') {
    const element = document.querySelector(target)
    if (!element) throw new TypeError(`Loading target not found: ${target}`)
    return element
  }
  if (target.nodeType === 1) return target
  throw new TypeError('Loading target must be an element or selector')
}

export function showLoading(options = {}) {
  ensureFeedbackStyles()
  const settings = options ?? {}
  const target = resolveTarget(settings.target)
  const fullscreen = target === document.body
  if (fullscreen && fullscreenInstance) return fullscreenInstance

  const mask = document.createElement('div')
  mask.className = `jui-loading-mask${fullscreen ? ' jui-loading-mask--fullscreen' : ''}`
  mask.setAttribute('role', 'status')
  mask.setAttribute('aria-live', 'polite')
  if (settings.background) mask.style.background = settings.background

  const content = document.createElement('div')
  content.className = 'jui-loading-mask__content'
  const spinner = document.createElement('span')
  spinner.className = 'jui-loading-mask__spinner'
  spinner.setAttribute('aria-hidden', 'true')
  content.append(spinner)

  if (settings.text) {
    const text = document.createElement('p')
    text.className = 'jui-loading-mask__text'
    text.textContent = settings.text
    content.append(text)
  }

  mask.append(content)

  const previousPosition = target.style.position
  const previousOverflow = target.style.overflow
  const previousAriaBusy = target.getAttribute('aria-busy')
  if (!fullscreen && getComputedStyle(target).position === 'static') target.style.position = 'relative'
  if (settings.lock ?? true) target.style.overflow = 'hidden'
  target.setAttribute('aria-busy', 'true')
  target.append(mask)

  let closed = false
  const instance = {
    close() {
      if (closed) return
      closed = true
      mask.remove()
      target.style.position = previousPosition
      target.style.overflow = previousOverflow
      if (previousAriaBusy == null) target.removeAttribute('aria-busy')
      else target.setAttribute('aria-busy', previousAriaBusy)
      if (fullscreenInstance === instance) fullscreenInstance = null
    },
  }

  if (fullscreen) fullscreenInstance = instance
  return instance
}

export function closeLoading() {
  fullscreenInstance?.close()
}
