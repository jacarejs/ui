const feedbackStyles = `
.jui-message-container{position:fixed;z-index:150;display:flex;flex-direction:column;gap:12px;pointer-events:none;width:min(420px,calc(100vw - 32px))}
.jui-message-container[data-placement^="top"]{top:20px}
.jui-message-container[data-placement^="bottom"]{bottom:20px;flex-direction:column-reverse}
.jui-message-container[data-placement="top"],.jui-message-container[data-placement="bottom"]{left:50%;transform:translateX(-50%)}
.jui-message-container[data-placement$="left"]{left:20px}
.jui-message-container[data-placement$="right"]{right:20px}
.jui-message{--jui-feedback-color:var(--j-info);display:flex;align-items:center;gap:10px;box-sizing:border-box;min-height:44px;padding:10px 14px;border:1px solid var(--j-border);border-left:4px solid var(--jui-feedback-color);border-radius:var(--j-radius);background:var(--j-surface-2);box-shadow:var(--j-shadow);color:var(--j-text);font:inherit;line-height:1.4;pointer-events:auto}
.jui-message--plain{background:color-mix(in srgb,var(--jui-feedback-color) 8%,var(--j-surface-2))}
.jui-message--primary,.jui-notification--primary,.jui-message-box--primary{--jui-feedback-color:var(--j-primary)}
.jui-message--success,.jui-notification--success,.jui-message-box--success{--jui-feedback-color:var(--j-success)}
.jui-message--warning,.jui-notification--warning,.jui-message-box--warning{--jui-feedback-color:var(--j-warn)}
.jui-message--error,.jui-notification--error,.jui-message-box--error{--jui-feedback-color:var(--j-danger)}
.jui-message--info,.jui-notification--info,.jui-message-box--info{--jui-feedback-color:var(--j-info)}
.jui-message__icon{flex:none;color:var(--jui-feedback-color);font-weight:700}
.jui-message__content{flex:1;min-width:0;overflow-wrap:anywhere}
.jui-message__close,.jui-notification__close{display:grid;flex:none;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:var(--j-radius-sm);background:transparent;color:var(--j-text);font:inherit;font-size:18px;line-height:1;cursor:pointer}
.jui-message__close:hover,.jui-notification__close:hover{background:var(--j-mint);color:var(--j-primary)}
.jui-notification-container{position:fixed;z-index:150;display:flex;flex-direction:column;gap:12px;width:min(360px,calc(100vw - 32px));pointer-events:none}
.jui-notification-container[data-position^="top"]{top:16px}
.jui-notification-container[data-position^="bottom"]{bottom:16px;flex-direction:column-reverse}
.jui-notification-container[data-position$="left"]{left:16px}
.jui-notification-container[data-position$="right"]{right:16px}
.jui-notification{--jui-feedback-color:var(--j-info);display:grid;grid-template-columns:auto 1fr auto;gap:10px;box-sizing:border-box;padding:16px;border:1px solid var(--j-border);border-left:4px solid var(--jui-feedback-color);border-radius:var(--j-radius);background:var(--j-surface-2);box-shadow:var(--j-shadow);color:var(--j-text);font:inherit;pointer-events:auto;cursor:default}
.jui-notification--clickable{cursor:pointer}
.jui-notification__icon{color:var(--jui-feedback-color);font-weight:700;line-height:1.4}
.jui-notification__body{min-width:0}
.jui-notification__title{margin:0;font-weight:700;line-height:1.4;overflow-wrap:anywhere}
.jui-notification__message{margin:6px 0 0;line-height:1.45;overflow-wrap:anywhere}
.jui-message-box__backdrop{position:fixed;inset:0;z-index:140;display:grid;place-items:center;padding:20px;background:color-mix(in srgb,var(--j-text) 42%,transparent)}
.jui-message-box{--jui-feedback-color:var(--j-primary);box-sizing:border-box;width:min(440px,100%);border:1px solid var(--j-border);border-top:4px solid var(--jui-feedback-color);border-radius:var(--j-radius);background:var(--j-surface-2);box-shadow:var(--j-shadow);color:var(--j-text);font:inherit}
.jui-message-box__header{padding:18px 20px 0}
.jui-message-box__title{margin:0;font-size:1.1rem;line-height:1.4}
.jui-message-box__content{padding:16px 20px;line-height:1.5;overflow-wrap:anywhere}
.jui-message-box__input{box-sizing:border-box;width:100%;margin-top:14px;padding:10px 12px;border:1px solid var(--j-border);border-radius:var(--j-radius-sm);outline:0;background:var(--j-surface-2);color:var(--j-text);font:inherit}
.jui-message-box__input:focus{border-color:var(--j-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--j-primary) 20%,transparent)}
.jui-message-box__actions{display:flex;justify-content:flex-end;gap:10px;padding:0 20px 18px}
.jui-message-box__button{padding:9px 16px;border:1px solid var(--j-border);border-radius:var(--j-radius-sm);background:var(--j-surface-2);color:var(--j-text);font:inherit;font-weight:600;cursor:pointer}
.jui-message-box__button:hover{background:var(--j-mint);color:var(--j-primary)}
.jui-message-box__button--confirm{border-color:var(--j-primary);background:var(--j-primary);color:var(--j-surface-2)}
.jui-message-box__button--confirm:hover{background:color-mix(in srgb,var(--j-primary) 88%,var(--j-surface-2));color:var(--j-surface-2)}
.jui-loading-mask{position:absolute;inset:0;z-index:130;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--j-surface-2) 82%,transparent);color:var(--j-primary);font:inherit}
.jui-loading-mask--fullscreen{position:fixed}
.jui-loading-mask__content{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;color:var(--j-text)}
.jui-loading-mask__spinner{width:34px;height:34px;border:3px solid var(--j-border);border-top-color:var(--j-primary);border-radius:50%;animation:jui-loading-spin .8s linear infinite}
.jui-loading-mask__text{margin:0;color:var(--j-text)}
@keyframes jui-loading-spin{to{transform:rotate(360deg)}}
`

const messageIcons = {
  primary: '●',
  success: '✓',
  warning: '!',
  info: 'i',
  error: '×',
}

const messagePlacements = new Set([
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right',
])

const messages = new Set()

export function ensureFeedbackStyles() {
  if (typeof document === 'undefined' || document.querySelector('style[data-jui-feedback]')) return
  const style = document.createElement('style')
  style.dataset.juiFeedback = ''
  style.textContent = feedbackStyles
  document.head.append(style)
}

function getMessageContainer(placement) {
  const selector = `.jui-message-container[data-placement="${placement}"]`
  let container = document.querySelector(selector)
  if (container) return container
  container = document.createElement('div')
  container.className = 'jui-message-container'
  container.dataset.placement = placement
  document.body.append(container)
  return container
}

export function Message(options) {
  ensureFeedbackStyles()
  const normalized = typeof options === 'string' ? { message: options } : { ...options }
  const type = normalized.type || 'info'
  const placement = messagePlacements.has(normalized.placement) ? normalized.placement : 'top'
  const element = document.createElement('div')
  element.className = `jui-message jui-message--${type}${normalized.plain ? ' jui-message--plain' : ''}`
  element.setAttribute('role', type === 'error' ? 'alert' : 'status')

  const icon = document.createElement('span')
  icon.className = 'jui-message__icon'
  icon.textContent = messageIcons[type] || messageIcons.info
  element.append(icon)

  const content = document.createElement('span')
  content.className = 'jui-message__content'
  content.textContent = normalized.message ?? ''
  element.append(content)

  let timer
  let closed = false
  const close = () => {
    if (closed) return
    closed = true
    clearTimeout(timer)
    messages.delete(instance)
    const container = element.parentElement
    element.remove()
    if (container && !container.children.length) container.remove()
    normalized.onClose?.()
  }

  if (normalized.showClose) {
    const closeButton = document.createElement('button')
    closeButton.className = 'jui-message__close'
    closeButton.type = 'button'
    closeButton.setAttribute('aria-label', 'Close')
    closeButton.textContent = '×'
    closeButton.addEventListener('click', close)
    element.append(closeButton)
  }

  const instance = { close }
  messages.add(instance)
  getMessageContainer(placement).append(element)
  const duration = normalized.duration ?? 3000
  if (duration > 0) timer = setTimeout(close, duration)
  return instance
}

for (const type of ['success', 'warning', 'info', 'error', 'primary']) {
  Message[type] = options => Message(typeof options === 'string' ? { message: options, type } : { ...options, type })
}

Message.closeAll = () => {
  for (const instance of [...messages]) instance.close()
}
