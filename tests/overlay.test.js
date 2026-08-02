import { afterEach, describe, expect, it } from 'vitest'
import {
  activateFocusTrap,
  focusableElements,
  trapFocus,
  uniqueId,
} from '../src/internal/overlay.js'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('overlay helpers', () => {
  it('uniqueId is stable per emit bag', () => {
    const emit = {}
    expect(uniqueId('jui', emit)).toBe(uniqueId('jui', emit))
    expect(uniqueId('jui', {})).not.toBe(uniqueId('jui', {}))
    expect(uniqueId('dlg', emit, '__custom')).toMatch(/^dlg-/)
    expect(uniqueId('dlg', emit, '__custom')).toBe(uniqueId('dlg', emit, '__custom'))
  })

  it('focusableElements skips disabled and aria-hidden trees', () => {
    expect(focusableElements(null)).toEqual([])
    expect(focusableElements({})).toEqual([])

    const root = document.createElement('div')
    root.innerHTML = `
      <button type="button">Ok</button>
      <button type="button" disabled>No</button>
      <div tabindex="0" disabled>Disabled tab</div>
      <button type="button" aria-disabled="true">Aria</button>
      <span aria-hidden="true"><button type="button">Hidden</button></span>
      <button type="button" style="display:none">Display</button>
      <button type="button" style="visibility:hidden">Visibility</button>
    `
    document.body.appendChild(root)
    expect(focusableElements(root).map((node) => node.textContent)).toEqual(['Ok'])

    const original = globalThis.getComputedStyle
    // @ts-expect-error coverage for environments without getComputedStyle
    globalThis.getComputedStyle = undefined
    expect(focusableElements(root).map((node) => node.textContent)).toEqual(['Ok', 'Display', 'Visibility'])
    globalThis.getComputedStyle = original
  })

  it('trapFocus cycles Tab within the root', () => {
    const root = document.createElement('div')
    const first = document.createElement('button')
    const last = document.createElement('button')
    first.textContent = 'First'
    last.textContent = 'Last'
    root.append(first, last)
    document.body.appendChild(root)
    first.focus()

    trapFocus(root, new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(first)

    const shiftEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })
    trapFocus(root, shiftEvent)
    expect(document.activeElement).toBe(last)

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    trapFocus(root, tabEvent)
    expect(document.activeElement).toBe(first)

    trapFocus(null, tabEvent)
  })

  it('trapFocus focuses the root when no focusable children exist', () => {
    const root = document.createElement('div')
    root.tabIndex = -1
    document.body.appendChild(root)
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true })
    trapFocus(root, event)
    expect(event.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(root)
  })

  it('activateFocusTrap restores focus and handles Escape', async () => {
    expect(typeof activateFocusTrap(null)).toBe('function')
    activateFocusTrap(null)()

    const opener = document.createElement('button')
    opener.textContent = 'Open'
    document.body.appendChild(opener)
    opener.focus()

    const root = document.createElement('div')
    const first = document.createElement('button')
    const last = document.createElement('button')
    first.textContent = 'First'
    last.textContent = 'Last'
    root.append(first, last)
    document.body.appendChild(root)

    let escaped = 0
    const release = activateFocusTrap(root, {
      onEscape: () => {
        escaped += 1
      },
    })

    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(document.activeElement).toBe(first)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(escaped).toBe(1)

    last.focus()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }))
    expect(document.activeElement).toBe(first)

    release()
    expect(document.activeElement).toBe(opener)
  })

  it('activateFocusTrap focuses the root and skips restore when opener is detached', async () => {
    const opener = document.createElement('button')
    document.body.appendChild(opener)
    opener.focus()

    const root = document.createElement('div')
    document.body.appendChild(root)

    const release = activateFocusTrap(root)
    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(document.activeElement).toBe(root)

    opener.remove()
    release()
  })
})
