import { ensureFeedbackStyles } from './message.js'

function normalizeArguments(title, options) {
  if (title && typeof title === 'object') return { title: '', options: title }
  return { title: title ?? '', options: options ?? {} }
}

function openMessageBox(kind, message, title, options) {
  ensureFeedbackStyles()
  const normalized = normalizeArguments(title, options)
  const settings = normalized.options

  return new Promise((resolve, reject) => {
    const backdrop = document.createElement('div')
    backdrop.className = 'jui-message-box__backdrop'

    const dialog = document.createElement('section')
    dialog.className = `jui-message-box${settings.type ? ` jui-message-box--${settings.type}` : ''}`
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    backdrop.append(dialog)

    if (normalized.title) {
      const header = document.createElement('header')
      header.className = 'jui-message-box__header'
      const heading = document.createElement('h2')
      heading.className = 'jui-message-box__title'
      heading.textContent = normalized.title
      heading.id = `jui-message-box-title-${Date.now()}-${Math.random().toString(36).slice(2)}`
      dialog.setAttribute('aria-labelledby', heading.id)
      header.append(heading)
      dialog.append(header)
    }

    const content = document.createElement('div')
    content.className = 'jui-message-box__content'
    const messageElement = document.createElement('div')
    messageElement.textContent = message ?? ''
    content.append(messageElement)

    let input
    if (kind === 'prompt') {
      input = document.createElement('input')
      input.className = 'jui-message-box__input'
      input.type = 'text'
      input.placeholder = settings.inputPlaceholder ?? ''
      input.value = settings.inputValue ?? ''
      content.append(input)
    }
    dialog.append(content)

    const actions = document.createElement('footer')
    actions.className = 'jui-message-box__actions'
    dialog.append(actions)

    let settled = false
    const finish = (confirmed) => {
      if (settled) return
      settled = true
      document.removeEventListener('keydown', onKeydown)
      backdrop.remove()
      if (!confirmed) {
        reject('cancel')
        return
      }
      resolve(kind === 'prompt' ? { value: input.value } : 'confirm')
    }

    const showCancel = kind !== 'alert' && (settings.showCancelButton ?? true)
    if (showCancel) {
      const cancelButton = document.createElement('button')
      cancelButton.className = 'jui-message-box__button jui-message-box__button--cancel'
      cancelButton.type = 'button'
      cancelButton.textContent = settings.cancelButtonText ?? 'Cancel'
      cancelButton.addEventListener('click', () => finish(false))
      actions.append(cancelButton)
    }

    const confirmButton = document.createElement('button')
    confirmButton.className = 'jui-message-box__button jui-message-box__button--confirm'
    confirmButton.type = 'button'
    confirmButton.textContent = settings.confirmButtonText ?? 'OK'
    confirmButton.addEventListener('click', () => finish(true))
    actions.append(confirmButton)

    const onKeydown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        finish(kind === 'alert')
      }
      if (event.key === 'Enter' && kind === 'prompt' && event.target === input) {
        event.preventDefault()
        finish(true)
      }
    }

    backdrop.addEventListener('click', event => {
      if (
        event.target === backdrop &&
        kind !== 'alert' &&
        (settings.closeOnClickModal ?? true)
      ) {
        finish(false)
      }
    })

    document.addEventListener('keydown', onKeydown)
    document.body.append(backdrop)
    actions.querySelector('button').focus()
  })
}

export const MessageBox = {
  alert(message, title, options) {
    return openMessageBox('alert', message, title, options)
  },
  confirm(message, title, options) {
    return openMessageBox('confirm', message, title, options)
  },
  prompt(message, title, options) {
    return openMessageBox('prompt', message, title, options)
  },
}
