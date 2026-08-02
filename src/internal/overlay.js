const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function uniqueId(prefix, emitFn, key = '__juiOverlayId') {
  if (!emitFn[key]) {
    emitFn[key] = `${prefix}-${Math.random().toString(36).slice(2, 10)}`
  }
  return emitFn[key]
}

export function focusableElements(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return []
  return [...root.querySelectorAll(FOCUSABLE_SELECTOR)].filter((node) => {
    if (node.hasAttribute('disabled')) return false
    if (node.getAttribute('aria-disabled') === 'true') return false
    if (node.closest('[aria-hidden="true"]')) return false
    const style = typeof getComputedStyle === 'function' ? getComputedStyle(node) : null
    if (style && (style.display === 'none' || style.visibility === 'hidden')) return false
    return true
  })
}

export function trapFocus(root, event) {
  if (!root || event.key !== 'Tab') return
  const list = focusableElements(root)
  if (!list.length) {
    event.preventDefault()
    if (typeof root.focus === 'function') root.focus()
    return
  }
  const first = list[0]
  const last = list[list.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
    return
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export function activateFocusTrap(root, { onEscape } = {}) {
  if (!root || typeof document === 'undefined') return () => {}
  const previouslyFocused = document.activeElement
  if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '-1')

  const focusInitial = () => {
    const list = focusableElements(root)
    const target = list[0] || root
    if (typeof target.focus === 'function') target.focus()
  }

  const onKeyDown = (event) => {
    if (event.key === 'Escape' && typeof onEscape === 'function') {
      onEscape(event)
      return
    }
    trapFocus(root, event)
  }

  const frame = requestAnimationFrame(focusInitial)
  document.addEventListener('keydown', onKeyDown)

  return () => {
    cancelAnimationFrame(frame)
    document.removeEventListener('keydown', onKeyDown)
    if (
      previouslyFocused
      && typeof previouslyFocused.focus === 'function'
      && document.contains(previouslyFocused)
    ) {
      previouslyFocused.focus()
    }
  }
}
