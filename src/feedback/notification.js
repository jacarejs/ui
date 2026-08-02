import { ensureFeedbackStyles } from './message.js'

const notificationIcons = {
  primary: '●',
  success: '✓',
  warning: '!',
  info: 'i',
  error: '×',
}

const positions = new Set(['top-right', 'top-left', 'bottom-right', 'bottom-left'])
const notifications = new Set()

function getContainer(position) {
  const selector = `.jui-notification-container[data-position="${position}"]`
  let container = document.querySelector(selector)
  if (container) return container
  container = document.createElement('div')
  container.className = 'jui-notification-container'
  container.dataset.position = position
  document.body.append(container)
  return container
}

export function Notification(options = {}) {
  ensureFeedbackStyles()
  const normalized = typeof options === 'string' ? { message: options } : { ...options }
  const type = normalized.type || ''
  const position = positions.has(normalized.position) ? normalized.position : 'top-right'
  const element = document.createElement('div')
  element.className = `jui-notification${type ? ` jui-notification--${type}` : ''}${normalized.onClick ? ' jui-notification--clickable' : ''}`
  element.setAttribute('role', type === 'error' ? 'alert' : 'status')

  const icon = document.createElement('span')
  icon.className = 'jui-notification__icon'
  icon.textContent = notificationIcons[type] || ''
  element.append(icon)

  const body = document.createElement('div')
  body.className = 'jui-notification__body'

  if (normalized.title != null && normalized.title !== '') {
    const title = document.createElement('h3')
    title.className = 'jui-notification__title'
    title.textContent = normalized.title
    body.append(title)
  }

  const message = document.createElement('p')
  message.className = 'jui-notification__message'
  message.textContent = normalized.message ?? ''
  body.append(message)
  element.append(body)

  let timer
  let closed = false
  const close = () => {
    if (closed) return
    closed = true
    clearTimeout(timer)
    notifications.delete(instance)
    const container = element.parentElement
    element.remove()
    if (container && !container.children.length) container.remove()
    normalized.onClose?.()
  }

  if (normalized.showClose ?? true) {
    const closeButton = document.createElement('button')
    closeButton.className = 'jui-notification__close'
    closeButton.type = 'button'
    closeButton.setAttribute('aria-label', 'Close')
    closeButton.textContent = '×'
    closeButton.addEventListener('click', event => {
      event.stopPropagation()
      close()
    })
    element.append(closeButton)
  }

  if (normalized.onClick) {
    element.addEventListener('click', event => normalized.onClick(event))
  }

  const offset = Math.max(0, Number(normalized.offset) || 0)
  if (offset) {
    element.style[position.startsWith('top') ? 'marginTop' : 'marginBottom'] = `${offset}px`
  }

  const instance = { close }
  notifications.add(instance)
  getContainer(position).append(element)
  const duration = normalized.duration ?? 4500
  if (duration > 0) timer = setTimeout(close, duration)
  return instance
}

for (const type of ['success', 'warning', 'info', 'error', 'primary']) {
  Notification[type] = options =>
    Notification(typeof options === 'string' ? { message: options, type } : { ...options, type })
}

Notification.closeAll = () => {
  for (const instance of [...notifications]) instance.close()
}
