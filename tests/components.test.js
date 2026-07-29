import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { compile } from '@jacare/compiler'
import { pulse } from '@jacare/core'
import { readFileSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmpDir = join(root, '.jacare', 'test-modules')

beforeAll(() => {
  rmSync(tmpDir, { recursive: true, force: true })
  mkdirSync(tmpDir, { recursive: true })
})

afterEach(() => {
  document.body.innerHTML = ''
  document.head.querySelectorAll('style[data-jacare-s]').forEach((node) => node.remove())
})

async function loadComponent(name) {
  const filename = join(root, 'src', 'components', `${name}.jcr`)
  const source = readFileSync(filename, 'utf8')
  const result = compile(source, {
    filename,
    mode: 'client',
    cpw: true,
    debug: false,
  })
  const outFile = join(tmpDir, `${name}.${Date.now()}.${Math.random().toString(16).slice(2)}.js`)
  writeFileSync(outFile, result.code)
  return import(pathToFileURL(outFile).href)
}

describe('@jacare/ui components', () => {
  it('Button emits press and respects loading', async () => {
    const Button = await loadComponent('Button')
    const host = document.createElement('div')
    document.body.appendChild(host)

    const loading = pulse(false)
    let pressed = 0

    Button.mount(host, {
      loading,
      press: () => {
        pressed += 1
      },
      children: (target) => {
        target.appendChild(document.createTextNode('Save'))
      },
    })

    const btn = host.querySelector('button')
    expect(btn).toBeTruthy()
    expect(btn.textContent).toContain('Save')
    expect(btn.disabled).toBe(false)

    btn.click()
    expect(pressed).toBe(1)

    loading.set(true)
    expect(btn.classList.contains('is-loading')).toBe(true)
    expect(btn.hasAttribute('disabled')).toBe(true)
    expect(host.querySelector('.jui-btn__spinner')).not.toBeNull()

    btn.click()
    expect(pressed).toBe(1)
  })

  it('Button applies variant, shape, and type options', async () => {
    const Button = await loadComponent('Button')
    const host = document.createElement('div')

    Button.mount(host, {
      variant: 'outline',
      size: 'lg',
      shape: 'circle',
      type: 'submit',
      children: (target) => {
        target.appendChild(document.createTextNode('Go'))
      },
    })

    const btn = host.querySelector('button')
    expect(btn.classList.contains('jui-btn--outline')).toBe(true)
    expect(btn.classList.contains('jui-btn--lg')).toBe(true)
    expect(btn.classList.contains('jui-btn--circle')).toBe(true)
    expect(btn.getAttribute('type')).toBe('submit')
  })

  it('Badge renders tone classes', async () => {
    const Badge = await loadComponent('Badge')
    const host = document.createElement('div')
    Badge.mount(host, { text: 'Live', tone: 'warn', soft: true })
    const el = host.querySelector('.jui-badge')
    expect(el.querySelector('.jui-badge__label').textContent).toBe('Live')
    expect(el.classList.contains('jui-badge--warn')).toBe(true)
    expect(el.classList.contains('jui-badge--soft')).toBe(true)
  })

  it('Badge supports variant, dot, and custom color options', async () => {
    const Badge = await loadComponent('Badge')
    const host = document.createElement('div')
    Badge.mount(host, {
      text: 'Custom',
      tone: 'info',
      variant: 'outline',
      size: 'lg',
      shape: 'rounded',
      color: '#7c4dff',
      dot: true,
    })
    const el = host.querySelector('.jui-badge')
    expect(el.classList.contains('jui-badge--outline')).toBe(true)
    expect(el.classList.contains('jui-badge--lg')).toBe(true)
    expect(el.classList.contains('jui-badge--rounded')).toBe(true)
    expect(el.style.getPropertyValue('--jui-badge-color')).toBe('#7c4dff')
    expect(host.querySelector('.jui-badge__dot')).not.toBeNull()
  })

  it('Badge dismisses when close is pressed', async () => {
    const Badge = await loadComponent('Badge')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(true)
    let dismissed = 0

    Badge.mount(host, {
      text: 'Removable',
      tone: 'success',
      dismissible: true,
      open,
      dismiss: () => {
        dismissed += 1
      },
    })

    expect(host.querySelector('.jui-badge')).toBeTruthy()
    host.querySelector('.jui-badge__close').click()
    expect(open()).toBe(false)
    expect(dismissed).toBe(1)
    expect(host.querySelector('.jui-badge')).toBeNull()
  })

  it('Field binds a pulse two-way', async () => {
    const Field = await loadComponent('Field')
    const host = document.createElement('div')
    const value = pulse('hello')

    Field.mount(host, {
      label: 'Name',
      value,
      hint: 'Your display name',
    })

    const input = host.querySelector('input')
    expect(input.value).toBe('hello')

    value.set('Jacaré')
    expect(input.value).toBe('Jacaré')

    input.value = 'UI'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('UI')
  })

  it('Progress updates fill width from a pulse', async () => {
    const Progress = await loadComponent('Progress')
    const host = document.createElement('div')
    const value = pulse(25)

    Progress.mount(host, {
      label: 'Upload',
      value,
      max: 100,
    })

    const track = host.querySelector('.jui-progress__track')
    expect(track.style.getPropertyValue('--pct')).toBe('25%')
    expect(host.querySelector('.jui-progress__value').textContent).toBe('25%')

    value.set(80)
    expect(track.style.getPropertyValue('--pct')).toBe('80%')
    expect(host.querySelector('.jui-progress__value').textContent).toBe('80%')
  })

  it('Card mounts default slot content', async () => {
    const Card = await loadComponent('Card')
    const host = document.createElement('div')

    Card.mount(host, {
      title: 'Hello',
      subtitle: 'World',
      children: (target) => {
        const p = document.createElement('p')
        p.textContent = 'Body'
        target.appendChild(p)
      },
    })

    expect(host.querySelector('.jui-card__title').textContent).toBe('Hello')
    expect(host.querySelector('.jui-card__subtitle').textContent).toBe('World')
    expect(host.querySelector('.jui-card__body').textContent).toContain('Body')
  })

  it('Checkbox mirrors a pulse', async () => {
    const Checkbox = await loadComponent('Checkbox')
    const host = document.createElement('div')
    const checked = pulse(false)

    Checkbox.mount(host, {
      label: 'Accept',
      checked,
    })

    const input = host.querySelector('input[type="checkbox"]')
    expect(input.checked).toBe(false)

    checked.set(true)
    expect(input.checked).toBe(true)

    input.checked = false
    input.dispatchEvent(new Event('change', { bubbles: true }))
    expect(checked()).toBe(false)
  })

  it('ColorPicker updates hex from native color input', async () => {
    const ColorPicker = await loadComponent('ColorPicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('#189030')
    let changed = ''

    ColorPicker.mount(host, {
      label: 'Primary',
      value,
      presets: ['#189030', '#c62828'],
      change: (hex) => {
        changed = hex
      },
    })

    expect(host.querySelector('.jui-color__hex').value).toBe('#189030')
    expect(host.querySelector('.jui-color__chip').getAttribute('style')).toContain('#189030')
    expect(host.querySelectorAll('.jui-color__preset')).toHaveLength(2)

    const native = host.querySelector('input[type="color"]')
    native.value = '#c62828'
    native.dispatchEvent(new Event('input', { bubbles: true }))

    expect(value()).toBe('#c62828')
    expect(changed).toBe('#c62828')
    expect(host.querySelector('.jui-color__hex').value).toBe('#c62828')
    expect(host.querySelector('.jui-color__chip').getAttribute('style')).toContain('#c62828')

    host.querySelectorAll('.jui-color__preset')[0].click()
    expect(value()).toBe('#189030')
    expect(changed).toBe('#189030')
  })

  it('Avatar supports presentation options', async () => {
    const Avatar = await loadComponent('Avatar')
    const host = document.createElement('div')
    document.body.appendChild(host)

    Avatar.mount(host, {
      name: 'Jacaré UI',
      size: 'xl',
      shape: 'rounded',
      tone: 'info',
      color: '#7c4dff',
      status: 'online',
      bordered: true,
    })

    const avatar = host.querySelector('.jui-avatar')
    expect(avatar.textContent).toContain('JU')
    expect(avatar.classList.contains('jui-avatar--xl')).toBe(true)
    expect(avatar.classList.contains('jui-avatar--rounded')).toBe(true)
    expect(avatar.classList.contains('jui-avatar--info')).toBe(true)
    expect(avatar.classList.contains('jui-avatar--bordered')).toBe(true)
    expect(avatar.style.getPropertyValue('--jui-avatar-color')).toBe('#7c4dff')
    expect(host.querySelector('.jui-avatar__status--online')).not.toBeNull()
  })

  it('Alert dismisses and honors duration', async () => {
    const Alert = await loadComponent('Alert')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(true)
    let dismissed = 0

    Alert.mount(host, {
      tone: 'info',
      title: 'Timed',
      dismissible: true,
      duration: 25,
      open,
      children: (target) => {
        target.textContent = 'Bye soon'
        return () => {}
      },
      dismiss: () => {
        dismissed += 1
      },
    })

    expect(host.querySelector('.jui-alert')).toBeTruthy()
    expect(host.querySelector('.jui-alert').getAttribute('role')).toBe('status')
    host.querySelector('.jui-alert__close').click()
    expect(open()).toBe(false)
    expect(dismissed).toBe(1)
    expect(host.querySelector('.jui-alert')).toBeNull()
  })

  it('Flex applies direction, gap, justify, and wrap', async () => {
    const Flex = await loadComponent('Flex')
    const host = document.createElement('div')

    Flex.mount(host, {
      direction: 'column',
      gap: 'lg',
      justify: 'between',
      wrap: true,
      children: (target) => {
        target.appendChild(document.createTextNode('A'))
        return () => {}
      },
    })

    const el = host.querySelector('.jui-flex')
    expect(el).toBeTruthy()
    expect(el.classList.contains('jui-flex--column')).toBe(true)
    expect(el.classList.contains('jui-flex--gap-lg')).toBe(true)
    expect(el.classList.contains('jui-flex--justify-between')).toBe(true)
    expect(el.classList.contains('jui-flex--wrap')).toBe(true)
  })

  it('Select updates value and emits change from options', async () => {
    const Select = await loadComponent('Select')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    let changed = null

    Select.mount(host, {
      label: 'Fruit',
      value,
      options: ['Apple', 'Banana', 'Cherry'],
      change: (next) => {
        changed = next
      },
    })

    const trigger = host.querySelector('.jui-select__trigger')
    expect(trigger.querySelector('.jui-select__value-text').textContent).toBe('Select')

    const options = host.querySelectorAll('[data-select-option]')
    options[2].click()

    expect(value()).toBe('Banana')
    expect(changed).toBe('Banana')
    expect(trigger.querySelector('.jui-select__value-text').textContent).toBe('Banana')
  })

  it('Select supports multiple selection with tagged options', async () => {
    const Select = await loadComponent('Select')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse([])

    Select.mount(host, {
      label: 'Roles',
      value,
      multiple: true,
      options: [
        { value: 'admin', label: 'Admin', tag: 'New' },
        { value: 'editor', label: 'Editor' },
      ],
    })

    const options = host.querySelectorAll('[data-select-option]')
    options[1].click()
    expect(value()).toEqual(['admin'])
    expect(options[1].classList.contains('is-active')).toBe(true)
    expect(host.querySelector('.jui-select__tag').textContent).toBe('New')

    options[1].click()
    expect(value()).toEqual([])
  })

  it('DatePicker masks typed input and emits change', async () => {
    const DatePicker = await loadComponent('DatePicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    let changed = null

    DatePicker.mount(host, {
      label: 'Birthday',
      value,
      change: (next) => {
        changed = next
      },
    })

    const input = host.querySelector('.jui-date__input')
    expect(input.placeholder).toBe('MM/DD/YYYY')

    input.value = '07282026'
    input.dispatchEvent(new Event('input', { bubbles: true }))

    expect(input.value).toBe('07/28/2026')
    expect(value()).toBe('2026-07-28')
    expect(changed).toBe('2026-07-28')
  })

  it('DatePicker opens the calendar and selects a day', async () => {
    const DatePicker = await loadComponent('DatePicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('2026-07-01')
    let changed = null

    DatePicker.mount(host, {
      label: 'Date',
      value,
      change: (next) => {
        changed = next
      },
    })

    host.querySelector('.jui-date__button').click()
    const panel = host.querySelector('.jui-date__panel')
    expect(panel.hidden).toBe(false)

    const day = host.querySelector('[data-date="2026-07-15"]')
    expect(day).toBeTruthy()
    day.click()

    expect(value()).toBe('2026-07-15')
    expect(changed).toBe('2026-07-15')
    expect(panel.hidden).toBe(true)
  })

  it('Grid applies column tracks, gap, and dense packing', async () => {
    const Grid = await loadComponent('Grid')
    const host = document.createElement('div')

    Grid.mount(host, {
      columns: '3',
      gap: 'sm',
      dense: true,
      children: (target) => {
        target.appendChild(document.createTextNode('A'))
        return () => {}
      },
    })

    const el = host.querySelector('.jui-grid')
    expect(el).toBeTruthy()
    expect(el.classList.contains('jui-grid--cols-3')).toBe(true)
    expect(el.classList.contains('jui-grid--gap-sm')).toBe(true)
    expect(el.classList.contains('jui-grid--dense')).toBe(true)
  })
})
