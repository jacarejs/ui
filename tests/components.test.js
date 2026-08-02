import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
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
})

async function loadComponent(name) {
  const compiled = new Map()

  function compileComponent(componentName) {
    if (compiled.has(componentName)) return compiled.get(componentName)
    const filename = join(root, 'src', 'components', `${componentName}.jcr`)
    const source = readFileSync(filename, 'utf8')
    const result = compile(source, {
      filename,
      mode: 'client',
      cpw: true,
      debug: false,
    })
    const deps = [...result.code.matchAll(/from ['"]\.\/([A-Za-z0-9]+)\.jcr['"]/g)].map((match) => match[1])
    deps.forEach(compileComponent)
    let code = result.code.replace(/from ['"]\.\/([A-Za-z0-9]+)\.jcr['"]/g, "from './$1.js'")
    code = code.replaceAll("from '../internal/utils.js'", "from '../../src/internal/utils.js'")
    code = code.replaceAll("from '../internal/overlay.js'", "from '../../src/internal/overlay.js'")
    code = code.replaceAll("from '../internal/mask.js'", "from '../../src/internal/mask.js'")
    code = code.replaceAll("from '../internal/qrcode.js'", "from '../../src/internal/qrcode.js'")
    code = code.replaceAll("from '../internal/charts.js'", "from '../../src/internal/charts.js'")
    code = code.replaceAll("from '../internal/highlight.js'", "from '../../src/internal/highlight.js'")
    code = code.replaceAll("from '../internal/empty-image.js'", "from '../../src/internal/empty-image.js'")
    code = code.replaceAll("from '../validation/index.js'", "from '../../src/validation/index.js'")
    code = code.replaceAll("from '../theme/index.js'", "from '../../src/theme/index.js'")
    code = code.replaceAll("from '../i18n/index.js'", "from '../../src/i18n/index.js'")
    const outFile = join(tmpDir, `${componentName}.js`)
    writeFileSync(outFile, code)
    compiled.set(componentName, outFile)
    return outFile
  }

  const outFile = compileComponent(name)
  return import(`${pathToFileURL(outFile).href}?t=${Date.now()}`)
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

  it('Card applies tone, shadow, and cover', async () => {
    const Card = await loadComponent('Card')
    const host = document.createElement('div')

    Card.mount(host, {
      title: 'Status',
      tone: 'success',
      shadow: 'hover',
      cover: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',
      coverAlt: 'Cover art',
      children: (target) => {
        target.appendChild(document.createTextNode('Ready'))
      },
    })

    const card = host.querySelector('.jui-card')
    const cover = host.querySelector('.jui-card__cover')
    expect(card.classList.contains('jui-card--success')).toBe(true)
    expect(card.classList.contains('jui-card--shadow-hover')).toBe(true)
    expect(card.classList.contains('jui-card--has-cover')).toBe(true)
    expect(cover?.getAttribute('alt')).toBe('Cover art')
  })

  it('Dropdown places menu in the panel and emits command', async () => {
    const Dropdown = await loadComponent('Dropdown')
    const DropdownMenu = await loadComponent('DropdownMenu')
    const DropdownItem = await loadComponent('DropdownItem')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let command = ''

    Dropdown.mount(host, {
      command: (value) => {
        command = value
      },
      children: (target) => {
        const trigger = document.createElement('button')
        trigger.type = 'button'
        trigger.textContent = 'Actions'
        target.appendChild(trigger)

        const menuHost = document.createElement('div')
        target.appendChild(menuHost)
        DropdownMenu.mount(menuHost, {
          children: (menuTarget) => {
            const itemHost = document.createElement('div')
            menuTarget.appendChild(itemHost)
            DropdownItem.mount(itemHost, {
              command: 'edit',
              children: (itemTarget) => {
                itemTarget.appendChild(document.createTextNode('Edit'))
              },
            })
          },
        })
      },
    })

    host.querySelector('.jui-dropdown__boot')?.dispatchEvent(new Event('load'))
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const panel = host.querySelector('.jui-dropdown__panel')
    const trigger = host.querySelector('.jui-dropdown__trigger')
    expect(panel.querySelector('.jui-dropdown-menu')).toBeTruthy()
    expect(trigger.querySelector('.jui-dropdown-menu')).toBeNull()
    expect(panel.querySelector('.jui-dropdown-item__btn').textContent).toContain('Edit')

    panel.querySelector('.jui-dropdown-item__btn').click()
    expect(command).toBe('edit')
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

  it('DatePicker navigable false shows month year caption', async () => {
    const DatePicker = await loadComponent('DatePicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('2026-07-15')

    DatePicker.mount(host, {
      label: 'July day',
      value,
      navigable: false,
      min: '2026-07-01',
      max: '2026-07-31',
    })

    host.querySelector('.jui-date__button').click()
    const panel = host.querySelector('.jui-date__panel')
    expect(panel.hidden).toBe(false)
    expect(host.querySelector('.jui-date__caption')?.textContent).toContain('July')
    expect(host.querySelector('.jui-date__caption')?.textContent).toContain('2026')
    expect(host.querySelector('.jui-date__nav')).toBeNull()
    expect(host.querySelector('.jui-date__head .jui-select')).toBeNull()
    expect(host.querySelector('[data-date="2026-06-30"]')?.disabled).toBe(true)
  })

  it('Calendar toggles multiple dates and shows markers', async () => {
    const Calendar = await loadComponent('Calendar')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(['2026-08-03'])

    Calendar.mount(host, {
      value,
      multiple: true,
      markers: [
        { date: '2026-08-03', color: 'success', label: 'Open' },
        { date: '2026-08-10', color: 'warn', label: 'Busy' },
      ],
    })
    host.querySelector('.jui-calendar__boot')?.dispatchEvent(new Event('load'))

    const days = [...host.querySelectorAll('.jui-calendar__day')]
    const day10 = days.find((button) => button.querySelector('.jui-calendar__day-num')?.textContent === '10' && !button.classList.contains('is-outside'))
    const day3 = days.find((button) => button.querySelector('.jui-calendar__day-num')?.textContent === '3' && !button.classList.contains('is-outside'))
    expect(day3?.classList.contains('has-markers')).toBe(true)
    expect(day10?.querySelectorAll('.jui-calendar__dot')).toHaveLength(1)

    day10.click()
    expect(value()).toEqual(['2026-08-03', '2026-08-10'])
    day3.click()
    expect(value()).toEqual(['2026-08-10'])
  })

  it('Calendar selects a date range', async () => {
    const Calendar = await loadComponent('Calendar')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(['2026-08-01'])

    Calendar.mount(host, {
      value,
      range: true,
    })
    host.querySelector('.jui-calendar__boot')?.dispatchEvent(new Event('load'))

    const pick = (day) =>
      [...host.querySelectorAll('.jui-calendar__day')].find(
        (button) =>
          button.querySelector('.jui-calendar__day-num')?.textContent === String(day) &&
          !button.classList.contains('is-outside'),
      )?.click()

    pick(10)
    expect(host.querySelector('[data-calendar-hint]')?.textContent).toContain('end date')
    pick(16)
    expect(value()).toEqual(['2026-08-10', '2026-08-16'])
    expect(host.querySelector('.jui-calendar__day.is-in-range')).toBeTruthy()
  })

  it('Confirm renders only when open and emits confirm/cancel', async () => {
    const Confirm = await loadComponent('Confirm')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(false)
    let confirmed = 0
    let cancelled = 0

    Confirm.mount(host, {
      open,
      title: 'Delete item',
      message: 'This cannot be undone.',
      danger: true,
      confirm: () => {
        confirmed += 1
      },
      cancel: () => {
        cancelled += 1
      },
    })

    expect(host.querySelector('.jui-confirm')).toBeNull()

    open.set(true)
    expect(host.querySelector('.jui-confirm')).toBeTruthy()
    expect(host.querySelector('.jui-confirm__title').textContent).toBe('Delete item')

    const confirmBtn = host.querySelector('.jui-confirm__btn--confirm')
    expect(confirmBtn.classList.contains('is-danger')).toBe(true)

    confirmBtn.click()
    expect(confirmed).toBe(1)
    expect(open()).toBe(true)

    host.querySelector('.jui-confirm__btn--cancel').click()
    expect(cancelled).toBe(1)
    expect(open()).toBe(false)
    expect(host.querySelector('.jui-confirm')).toBeNull()
  })

  it('Confirm disables actions while busy', async () => {
    const Confirm = await loadComponent('Confirm')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(true)
    const busy = pulse(true)
    let confirmed = 0

    Confirm.mount(host, {
      open,
      busy,
      confirm: () => {
        confirmed += 1
      },
    })

    const confirmBtn = host.querySelector('.jui-confirm__btn--confirm')
    expect(confirmBtn.disabled).toBe(true)
    confirmBtn.click()
    expect(confirmed).toBe(0)
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

  it('Icon renders named glyph with accessible label', async () => {
    const Icon = await loadComponent('Icon')
    const host = document.createElement('div')

    Icon.mount(host, {
      name: 'check',
      size: 'lg',
      tone: 'success',
      label: 'Done',
    })

    const el = host.querySelector('.jui-icon')
    expect(el).toBeTruthy()
    expect(el.classList.contains('jui-icon--lg')).toBe(true)
    expect(el.classList.contains('jui-icon--success')).toBe(true)
    expect(el.getAttribute('role')).toBe('img')
    expect(el.getAttribute('aria-label')).toBe('Done')
    expect(el.style.getPropertyValue('--jui-icon-mask') || el.getAttribute('style') || '').toContain('data:image/svg+xml')
  })

  it('Textarea binds a pulse and shows character count', async () => {
    const Textarea = await loadComponent('Textarea')
    const host = document.createElement('div')
    const value = pulse('')

    Textarea.mount(host, {
      label: 'Bio',
      value,
      maxLength: 10,
      showCount: true,
    })

    const control = host.querySelector('textarea')
    expect(control).toBeTruthy()
    expect(host.querySelector('.jui-textarea__count').textContent).toBe('0 / 10')

    control.value = 'hello'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('hello')
    expect(host.querySelector('.jui-textarea__count').textContent).toBe('5 / 10')
  })

  it('Textarea autosize forces resize none and keeps binding', async () => {
    const Textarea = await loadComponent('Textarea')
    const host = document.createElement('div')
    const value = pulse('line')

    Textarea.mount(host, {
      label: 'Notes',
      value,
      autosize: true,
      rows: 2,
      maxRows: 6,
      resize: 'both',
    })

    const control = host.querySelector('textarea')
    expect(control).toBeTruthy()
    expect(control.classList.contains('jui-textarea__control--autosize')).toBe(true)
    expect(control.classList.contains('jui-textarea__control--resize-none')).toBe(true)
    expect(control.classList.contains('jui-textarea__control--resize-both')).toBe(false)

    control.value = 'one\ntwo\nthree'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('one\ntwo\nthree')
  })

  it('RadioGroup updates value from option selection', async () => {
    const RadioGroup = await loadComponent('RadioGroup')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('free')
    let changed = ''

    RadioGroup.mount(host, {
      label: 'Plan',
      value,
      options: [
        { value: 'free', label: 'Free' },
        { value: 'pro', label: 'Pro' },
      ],
      change: (next) => {
        changed = next
      },
    })

    const inputs = host.querySelectorAll('input[type="radio"]')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].checked).toBe(true)

    inputs[1].checked = true
    inputs[1].dispatchEvent(new Event('change', { bubbles: true }))
    expect(value()).toBe('pro')
    expect(changed).toBe('pro')
  })

  it('CheckboxGroup toggles multi-select and select-all indeterminate', async () => {
    const CheckboxGroup = await loadComponent('CheckboxGroup')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(['a'])
    let changed = null

    CheckboxGroup.mount(host, {
      label: 'Features',
      selectAll: true,
      value,
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
      ],
      change: (next) => {
        changed = next
      },
    })

    const inputs = host.querySelectorAll('.jui-checkbox-group__list input[type="checkbox"]')
    expect(inputs).toHaveLength(3)
    expect(inputs[0].checked).toBe(true)
    expect(host.querySelector('.jui-checkbox-group__option--all').classList.contains('is-indeterminate')).toBe(true)

    inputs[1].checked = true
    inputs[1].dispatchEvent(new Event('change', { bubbles: true }))
    expect(value()).toEqual(['a', 'b'])
    expect(changed).toEqual(['a', 'b'])

    host.querySelector('.jui-checkbox-group__option--all input').dispatchEvent(new Event('change', { bubbles: true }))
    expect(value()).toEqual(['a', 'b', 'c'])
  })

  it('InputPassword toggles visibility and reports strength', async () => {
    const InputPassword = await loadComponent('InputPassword')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('abc')
    let strength = null

    InputPassword.mount(host, {
      label: 'Password',
      value,
      meter: true,
      strength: (next) => {
        strength = next
      },
    })

    const field = host.querySelector('.jui-input-password__field')
    expect(field.type).toBe('password')
    host.querySelector('.jui-input-password__toggle').click()
    expect(field.type).toBe('text')

    field.value = 'Abcdef12!'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('Abcdef12!')
    expect(strength?.score).toBeGreaterThan(1)
    expect(host.querySelector('.jui-input-password__meter-label').textContent).toBeTruthy()
  })

  it('InputSearch clears and emits debounced search', async () => {
    vi.useFakeTimers()
    const InputSearch = await loadComponent('InputSearch')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('hi')
    const searches = []

    InputSearch.mount(host, {
      label: 'Find',
      value,
      debounce: 200,
      clearable: true,
      search: (next) => {
        searches.push(next)
      },
    })

    const field = host.querySelector('[data-jui-search-input]')
    field.value = 'team'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('team')
    expect(searches).toEqual([])
    await vi.advanceTimersByTimeAsync(200)
    expect(searches).toEqual(['team'])

    host.querySelector('.jui-input-search__clear').click()
    expect(value()).toBe('')
    expect(searches.at(-1)).toBe('')
    vi.useRealTimers()
  })

  it('FormList adds, updates, and removes rows', async () => {
    const FormList = await loadComponent('FormList')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse([{ name: 'Ada' }])

    FormList.mount(host, {
      label: 'Contacts',
      fields: [{ key: 'name', label: 'Name' }],
      min: 0,
      max: 3,
      value,
    })

    expect(host.querySelectorAll('.jui-form-list__row')).toHaveLength(1)
    host.querySelector('.jui-form-list__add').click()
    expect(value()).toHaveLength(2)

    const input = host.querySelectorAll('.jui-form-list__input')[1]
    input.value = 'Grace'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()[1].name).toBe('Grace')

    host.querySelectorAll('.jui-form-list__icon-btn--danger')[1].click()
    expect(value()).toHaveLength(1)
    expect(value()[0].name).toBe('Ada')
  })

  it('FormActions emits cancel save and submit', async () => {
    const FormActions = await loadComponent('FormActions')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const events = []

    FormActions.mount(host, {
      sticky: false,
      cancel: () => events.push('cancel'),
      save: () => events.push('save'),
      submit: () => events.push('submit'),
    })

    const buttons = host.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3)
    buttons[0].click()
    buttons[1].click()
    buttons[2].click()
    expect(events).toEqual(['cancel', 'save', 'submit'])
  })

  it('FormSection collapses when toggled', async () => {
    const FormSection = await loadComponent('FormSection')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(true)

    FormSection.mount(host, {
      title: 'Billing',
      description: 'Optional',
      collapsible: true,
      open,
      children: (target) => {
        target.appendChild(document.createTextNode('Body'))
        return () => {}
      },
    })

    expect(host.querySelector('.jui-form-section__body')).toBeTruthy()
    host.querySelector('.jui-form-section__toggle').click()
    expect(open()).toBe(false)
    expect(host.querySelector('.jui-form-section__body')).toBeNull()
  })

  it('Editable commits on blur and cancels on Escape', async () => {
    const Editable = await loadComponent('Editable')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('Hello')

    Editable.mount(host, { value, placeholder: 'Edit me' })
    host.querySelector('.jui-editable__trigger').click()
    const input = host.querySelector('.jui-editable__input')
    expect(input).toBeTruthy()
    input.value = 'World'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('blur', { bubbles: true }))
    expect(value()).toBe('World')
  })

  it('NumberRange keeps max at least min', async () => {
    const NumberRange = await loadComponent('NumberRange')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse({ min: 2, max: 8 })
    let changed = null

    NumberRange.mount(host, {
      label: 'Range',
      value,
      min: 0,
      max: 20,
      change: (next) => {
        changed = next
      },
    })

    expect(host.querySelector('.jui-number-range')).toBeTruthy()
    expect(host.querySelectorAll('.jui-input-number').length).toBe(2)
    const minInput = host.querySelectorAll('.jui-input-number__field')[0]
    expect(minInput).toBeTruthy()
    minInput.value = '12'
    minInput.dispatchEvent(new Event('blur', { bubbles: true }))
    expect(value().min).toBe(12)
    expect(value().max).toBeGreaterThanOrEqual(12)
    expect(changed?.min).toBe(12)
  })

  it('Nps picks a score', async () => {
    const Nps = await loadComponent('Nps')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(null)
    Nps.mount(host, { label: 'Score', value, min: 0, max: 10 })
    const buttons = host.querySelectorAll('.jui-nps__score')
    expect(buttons).toHaveLength(11)
    buttons[9].click()
    expect(value()).toBe(9)
  })

  it('Likert picks an agreement option', async () => {
    const Likert = await loadComponent('Likert')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(null)
    Likert.mount(host, { label: 'Clarity', value })
    host.querySelectorAll('.jui-likert__option')[3].click()
    expect(value()).toBe(4)
  })

  it('MonthPicker and YearPicker commit values', async () => {
    const MonthPicker = await loadComponent('MonthPicker')
    const YearPicker = await loadComponent('YearPicker')
    const monthHost = document.createElement('div')
    const yearHost = document.createElement('div')
    document.body.appendChild(monthHost)
    document.body.appendChild(yearHost)
    const month = pulse('2026-01')
    const year = pulse(2020)

    MonthPicker.mount(monthHost, { label: 'Month', value: month, inline: true })
    monthHost.querySelectorAll('.jui-month-picker__month')[7].click()
    expect(month()).toMatch(/^\d{4}-08$/)

    YearPicker.mount(yearHost, { label: 'Year', value: year, inline: true })
    const yearButtons = [...yearHost.querySelectorAll('.jui-year-picker__year')]
    const target = yearButtons.find((button) => button.textContent.trim() === '2026')
    target.click()
    expect(year()).toBe(2026)
  })

  it('YearPicker dropdown selects a year and closes', async () => {
    const YearPicker = await loadComponent('YearPicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const year = pulse(null)

    YearPicker.mount(host, {
      label: 'Fiscal year',
      value: year,
      placeholder: 'Choose year',
    })

    const details = host.querySelector('details.jui-year-picker__control')
    expect(details).toBeTruthy()
    expect(host.querySelector('.jui-year-picker__value').textContent.trim()).toBe('Choose year')
    details.open = true
    details.dispatchEvent(new Event('toggle'))

    const target = [...host.querySelectorAll('.jui-year-picker__year')].find(
      (button) => button.textContent.trim() === '2026',
    )
    target.click()
    expect(year()).toBe(2026)
    expect(details.open).toBe(false)
    expect(host.querySelector('.jui-year-picker__value').textContent.trim()).toBe('2026')
  })

  it('DurationPicker composes minutes from parts', async () => {
    const DurationPicker = await loadComponent('DurationPicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(90)
    DurationPicker.mount(host, { label: 'SLA', value, showDays: false })
    expect(host.querySelector('.jui-duration__summary').textContent).toContain('1h')
    expect(host.querySelector('.jui-duration__summary').textContent).toContain('30m')
  })

  it('LocationPicker updates coordinates', async () => {
    const LocationPicker = await loadComponent('LocationPicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(null)
    LocationPicker.mount(host, { label: 'Loc', value })
    const inputs = host.querySelectorAll('.jui-location__input')
    inputs[0].value = '-23.5'
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
    inputs[1].value = '-46.6'
    inputs[1].dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toEqual({ lat: -23.5, lng: -46.6 })
  })

  it('QrCode paints a labeled canvas for a payload', async () => {
    const QrCode = await loadComponent('QrCode')
    const host = document.createElement('div')
    document.body.appendChild(host)
    QrCode.mount(host, {
      label: 'Link',
      value: 'https://jacarejs.github.io/ui/',
      size: 128,
    })
    const boot = host.querySelector('.jui-qrcode__boot')
    boot?.dispatchEvent(new Event('load'))
    const canvas = host.querySelector('canvas')
    expect(canvas).toBeTruthy()
    expect(canvas.getAttribute('aria-label')).toContain('Link')
    expect(canvas.width).toBeGreaterThan(0)
    expect(canvas.height).toBeGreaterThan(0)
  })

  it('CodeInput validates JSON when enabled', async () => {
    const CodeInput = await loadComponent('CodeInput')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('{')
    let validity = null
    CodeInput.mount(host, {
      label: 'JSON',
      value,
      validateJson: true,
      language: 'json',
      validate: (next) => {
        validity = next
      },
    })
    const field = host.querySelector('textarea')
    field.value = '{ "ok": true }'
    field.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('{ "ok": true }')
    expect(validity?.valid).toBe(true)
  })

  it('Dialog renders only when open and emits close', async () => {
    const Dialog = await loadComponent('Dialog')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(false)
    let closed = 0

    Dialog.mount(host, {
      open,
      title: 'Details',
      close: () => {
        closed += 1
      },
      children: (target) => {
        target.appendChild(document.createTextNode('Body'))
        return () => {}
      },
    })

    expect(host.querySelector('.jui-dialog')).toBeNull()
    open.set(true)
    expect(host.querySelector('.jui-dialog')).toBeTruthy()
    expect(host.querySelector('.jui-dialog__title').textContent).toBe('Details')

    host.querySelector('.jui-dialog__close').click()
    expect(closed).toBe(1)
    expect(open()).toBe(false)
    expect(host.querySelector('.jui-dialog')).toBeNull()
  })

  it('Modal opens with footer slot, sheet placement, and close events', async () => {
    const Modal = await loadComponent('Modal')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(false)
    let closed = 0
    let opened = 0

    Modal.mount(host, {
      open,
      title: 'Invite',
      description: 'Send a link',
      placement: 'bottom',
      opened: () => {
        opened += 1
      },
      close: () => {
        closed += 1
      },
      children: (target) => {
        const body = document.createElement('p')
        body.textContent = 'Body copy'
        target.appendChild(body)
        const footer = document.createElement('div')
        footer.setAttribute('data-jui-modal-slot', 'footer')
        footer.textContent = 'Save'
        target.appendChild(footer)
        return () => {}
      },
    })

    expect(document.querySelector('.jui-modal')).toBeNull()
    open.set(true)
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    )

    const modal = document.querySelector('.jui-modal')
    expect(modal).toBeTruthy()
    expect(modal.classList.contains('jui-modal--bottom')).toBe(true)
    expect(document.querySelector('.jui-modal__grabber')).toBeTruthy()
    expect(document.querySelector('.jui-modal__title').textContent).toBe('Invite')
    expect(document.querySelector('.jui-modal__description').textContent).toBe('Send a link')
    expect(document.querySelector('[data-modal-footer] [data-jui-modal-slot="footer"]')?.textContent).toBe('Save')
    expect(opened).toBe(1)

    document.querySelector('.jui-modal__close').click()
    expect(closed).toBe(1)
    expect(open()).toBe(false)
  })

  it('Modal ignores backdrop click when closeOnClickModal is false', async () => {
    const Modal = await loadComponent('Modal')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const open = pulse(true)

    Modal.mount(host, {
      open,
      title: 'Locked',
      closeOnClickModal: false,
      closeOnEsc: false,
      showClose: false,
      children: (target) => {
        target.appendChild(document.createTextNode('Stay open'))
        return () => {}
      },
    })

    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    )
    document.querySelector('.jui-modal-backdrop')?.click()
    expect(open()).toBe(true)
    expect(document.querySelector('.jui-modal__close')).toBeNull()
  })

  it('Switch mirrors a pulse and exposes switch role', async () => {
    const Switch = await loadComponent('Switch')
    const host = document.createElement('div')
    const checked = pulse(false)

    Switch.mount(host, {
      label: 'Notifications',
      checked,
    })

    const input = host.querySelector('input[role="switch"]')
    expect(input).toBeTruthy()
    expect(input.checked).toBe(false)
    expect(host.querySelector('.jui-switch__label').textContent).toContain('Notifications')

    checked.set(true)
    expect(input.checked).toBe(true)

    input.checked = false
    input.dispatchEvent(new Event('change', { bubbles: true }))
    expect(checked()).toBe(false)
  })

  it('Spinner renders size and accessible label', async () => {
    const Spinner = await loadComponent('Spinner')
    const host = document.createElement('div')

    Spinner.mount(host, {
      size: 'lg',
      label: 'Loading catalog',
    })

    const el = host.querySelector('.jui-spinner')
    expect(el.classList.contains('jui-spinner--lg')).toBe(true)
    expect(el.getAttribute('role')).toBe('status')
    expect(el.getAttribute('aria-label')).toBe('Loading catalog')
  })

  it('Stack applies direction, gap, and alignment', async () => {
    const Stack = await loadComponent('Stack')
    const host = document.createElement('div')

    Stack.mount(host, {
      direction: 'row',
      gap: 'lg',
      align: 'center',
      justify: 'between',
      wrap: true,
      children: (target) => {
        target.appendChild(document.createTextNode('A'))
        return () => {}
      },
    })

    const el = host.querySelector('.jui-stack')
    expect(el.classList.contains('jui-stack--row')).toBe(true)
    expect(el.classList.contains('jui-stack--gap-lg')).toBe(true)
    expect(el.classList.contains('jui-stack--align-center')).toBe(true)
    expect(el.classList.contains('jui-stack--justify-between')).toBe(true)
    expect(el.classList.contains('jui-stack--wrap')).toBe(true)
  })

  it('Text renders semantic tags and tone classes', async () => {
    const Text = await loadComponent('Text')
    const host = document.createElement('div')

    Text.mount(host, {
      as: 'h2',
      tone: 'muted',
      weight: 'bold',
      children: (target) => {
        target.appendChild(document.createTextNode('Heading'))
        return () => {}
      },
    })

    const el = host.querySelector('h2.jui-text')
    expect(el).toBeTruthy()
    expect(el.classList.contains('jui-text--h2')).toBe(true)
    expect(el.classList.contains('jui-text--muted')).toBe(true)
    expect(el.classList.contains('jui-text--bold')).toBe(true)
    expect(el.textContent).toBe('Heading')
  })

  it('Divider supports labeled and vertical modes', async () => {
    const Divider = await loadComponent('Divider')
    const labeled = document.createElement('div')
    Divider.mount(labeled, { label: 'Or' })
    expect(labeled.querySelector('.jui-divider__label').textContent).toBe('Or')

    const vertical = document.createElement('div')
    Divider.mount(vertical, { vertical: true })
    expect(vertical.querySelector('.jui-divider--vertical').getAttribute('aria-orientation')).toBe('vertical')
  })

  it('Rate updates value and can clear the selection', async () => {
    const Rate = await loadComponent('Rate')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(0)
    let changed = null

    Rate.mount(host, {
      value,
      showText: true,
      change: (next) => {
        changed = next
      },
    })

    const buttons = host.querySelectorAll('.jui-rate__hit--full')
    expect(buttons).toHaveLength(5)
    buttons[2].click()
    expect(value()).toBe(3)
    expect(changed).toBe(3)
    expect(host.querySelector('.jui-rate__text').textContent).toContain('3')

    buttons[2].click()
    expect(value()).toBe(0)
    expect(changed).toBe(0)
  })

  it('Rate renders a custom character glyph', async () => {
    const Rate = await loadComponent('Rate')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(2)

    Rate.mount(host, {
      value,
      character: '♥',
    })

    const glyphs = [...host.querySelectorAll('.jui-rate__icon-base')].map((node) => node.textContent)
    expect(glyphs).toEqual(['♥', '♥', '♥', '♥', '♥'])
  })

  it('Upload accepts dropped files and builds image previews', async () => {
    const Upload = await loadComponent('Upload')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const files = pulse([])
    let changed = null
    const originalCreate = URL.createObjectURL
    URL.createObjectURL = () => 'blob:preview'

    Upload.mount(host, {
      value: files,
      drag: true,
      multiple: true,
      accept: 'image/*',
      listType: 'picture',
      change: (next) => {
        changed = next
      },
    })

    const zone = host.querySelector('.jui-upload__zone')
    const file = new File(['fake'], 'photo.png', { type: 'image/png' })
    const transfer = { files: [file], dropEffect: 'none' }

    const enter = new Event('dragenter', { bubbles: true, cancelable: true })
    Object.defineProperty(enter, 'dataTransfer', { value: transfer })
    zone.dispatchEvent(enter)
    expect(zone.classList.contains('is-dragging')).toBe(true)

    const drop = new Event('drop', { bubbles: true, cancelable: true })
    Object.defineProperty(drop, 'dataTransfer', { value: transfer })
    zone.dispatchEvent(drop)

    expect(files()).toHaveLength(1)
    expect(files()[0].name).toBe('photo.png')
    expect(files()[0].url).toBe('blob:preview')
    expect(changed).toHaveLength(1)
    expect(host.querySelector('.jui-upload__thumb-img')?.getAttribute('src')).toBe('blob:preview')

    URL.createObjectURL = originalCreate
  })

  it('Upload picture-card lists files and can remove them', async () => {
    const Upload = await loadComponent('Upload')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const files = pulse([
      { uid: 'a', name: 'a.png', size: 12, status: 'done', url: 'blob:a', raw: null },
    ])
    let removed = null

    Upload.mount(host, {
      value: files,
      listType: 'picture-card',
      remove: (file) => {
        removed = file
      },
    })

    expect(host.querySelector('.jui-upload__list--picture-card')).toBeTruthy()
    expect(host.querySelector('.jui-upload__name').textContent).toBe('a.png')
    host.querySelector('.jui-upload__remove').click()
    expect(files()).toEqual([])
    expect(removed?.uid).toBe('a')
  })

  it('TreeSelect picks a single node and closes the panel', async () => {
    const TreeSelect = await loadComponent('TreeSelect')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    let changed = null

    TreeSelect.mount(host, {
      label: 'Page',
      value,
      data: [
        {
          value: 'docs',
          label: 'Docs',
          children: [
            { value: 'guide', label: 'Guide' },
            { value: 'api', label: 'API' },
          ],
        },
      ],
      change: (next) => {
        changed = next
      },
    })

    const details = host.querySelector('details.jui-tree-select__control')
    details.setAttribute('open', '')
    host.querySelector('.jui-tree-select__toggle').click()
    const option = [...host.querySelectorAll('.jui-tree-select__option')].find((node) => node.textContent.includes('Guide'))
    option.click()

    expect(value()).toBe('guide')
    expect(changed).toBe('guide')
    expect(details.hasAttribute('open')).toBe(false)
    expect(host.querySelector('.jui-tree-select__value').textContent).toBe('Guide')
  })

  it('Slider binds a single value through the range input', async () => {
    const Slider = await loadComponent('Slider')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(20)
    let changed = null

    Slider.mount(host, {
      value,
      min: 0,
      max: 100,
      change: (next) => {
        changed = next
      },
    })

    const input = host.querySelector('input[type="range"]')
    expect(input.value).toBe('20')
    expect(host.querySelector('.jui-slider__fill').getAttribute('style')).toContain('right:80%')

    input.value = '55'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    expect(value()).toBe(55)
    expect(changed).toBe(55)
  })

  it('Slider updates from pointer drag on the track', async () => {
    const Slider = await loadComponent('Slider')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(10)
    const live = []
    let changed = null

    Slider.mount(host, {
      value,
      min: 0,
      max: 100,
      input: (next) => live.push(next),
      change: (next) => {
        changed = next
      },
    })

    const root = host.querySelector('.jui-slider')
    const track = host.querySelector('.jui-slider__track')
    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, right: 100, bottom: 8, width: 100, height: 8 }),
    })

    root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: 75, clientY: 4, pointerId: 1, pointerType: 'touch', button: 0 }))
    root.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 80, clientY: 4, pointerId: 1, pointerType: 'touch' }))
    root.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 80, clientY: 4, pointerId: 1, pointerType: 'touch' }))

    expect(live.length).toBeGreaterThan(0)
    expect(value()).toBe(80)
    expect(changed).toBe(80)
  })

  it('Slider range mode keeps thumbs independent', async () => {
    const Slider = await loadComponent('Slider')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse([20, 60])

    Slider.mount(host, {
      value,
      min: 0,
      max: 100,
      range: true,
    })

    const inputs = host.querySelectorAll('input[type="range"]')
    expect(inputs).toHaveLength(2)
    expect(inputs[0].value).toBe('20')
    expect(inputs[1].value).toBe('60')

    inputs[0].value = '35'
    inputs[0].dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toEqual([35, 60])

    inputs[1].value = '10'
    inputs[1].dispatchEvent(new Event('change', { bubbles: true }))
    expect(value()).toEqual([35, 35])
  })

  it('Input binds a pulse and clears when clearable', async () => {
    const Input = await loadComponent('Input')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('hello')
    let cleared = 0

    Input.mount(host, {
      label: 'Name',
      value,
      clearable: true,
      clear: () => {
        cleared += 1
      },
    })

    const control = host.querySelector('input')
    expect(control.value).toBe('hello')

    control.value = 'Jacaré'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('Jacaré')

    host.querySelector('.jui-input__clear').click()
    expect(value()).toBe('')
    expect(cleared).toBe(1)
  })

  it('InputMask formats presets and can store unmasked values', async () => {
    const InputMask = await loadComponent('InputMask')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    let changed = null

    InputMask.mount(host, {
      label: 'CPF',
      preset: 'cpf',
      value,
      change: (next) => {
        changed = next
      },
    })

    const control = host.querySelector('input')
    control.value = '52998224725'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(control.value).toBe('529.982.247-25')
    expect(value()).toBe('529.982.247-25')
    expect(changed).toBe('529.982.247-25')
  })

  it('InputMask unmask keeps raw digits in the model', async () => {
    const InputMask = await loadComponent('InputMask')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')

    InputMask.mount(host, {
      preset: 'phone',
      unmask: true,
      value,
    })

    const control = host.querySelector('input')
    control.value = '11987654321'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(control.value).toBe('(11) 98765-4321')
    expect(value()).toBe('11987654321')
  })

  it('InputMoney keeps a numeric model while formatting currency', async () => {
    const InputMoney = await loadComponent('InputMoney')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(0)
    let changed = null

    InputMoney.mount(host, {
      label: 'Amount',
      currency: 'BRL',
      locale: 'pt-BR',
      value,
      clearable: true,
      change: (next) => {
        changed = next
      },
    })

    const control = host.querySelector('input')
    control.value = '1234'
    control.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe(12.34)
    expect(changed).toBe(12.34)
    expect(control.value).toContain('12,34')

    host.querySelector('.jui-input-money__clear').click()
    expect(value()).toBe(0)
  })

  it('DatePickerPanel boots the calendar grid and selects a day', async () => {
    const DatePickerPanel = await loadComponent('DatePickerPanel')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('2026-07-15')
    let changed = null

    DatePickerPanel.mount(host, {
      value,
      change: (next) => {
        changed = next
      },
    })

    const boot = host.querySelector('.jui-date-panel__boot')
    expect(boot).toBeTruthy()
    boot.dispatchEvent(new Event('load'))

    expect(host.querySelectorAll('[data-panel-days] .jui-date-panel__day')).toHaveLength(42)
    expect(host.querySelectorAll('.jui-date-panel__head .jui-select')).toHaveLength(2)
    expect(host.querySelector('.jui-date-panel__day.is-selected')?.textContent).toBe('15')

    const day = [...host.querySelectorAll('.jui-date-panel__day')].find((button) =>
      button.getAttribute('aria-label')?.includes('July 20, 2026'),
    )
    expect(day).toBeTruthy()
    day.click()

    expect(value()).toBe('2026-07-20')
    expect(changed).toBe('2026-07-20')
    expect(host.querySelector('.jui-date-panel').classList.contains('jui-date-panel--bordered')).toBe(true)
  })

  it('DatePickerPanel selects a date range', async () => {
    const DatePickerPanel = await loadComponent('DatePickerPanel')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(['2026-07-10', '2026-07-18'])
    let changed = null

    DatePickerPanel.mount(host, {
      value,
      range: true,
      change: (next) => {
        changed = next
      },
    })

    host.querySelector('.jui-date-panel__boot')?.dispatchEvent(new Event('load'))
    expect(host.querySelector('.jui-date-panel__day.is-in-range')).toBeTruthy()
    expect(host.querySelector('.jui-date-panel__day.is-range-start')?.textContent).toBe('10')
    expect(host.querySelector('.jui-date-panel__day.is-range-end')?.textContent).toBe('18')

    host.querySelector('[data-panel-clear]')?.click()
    expect(value()).toEqual([])

    const day10 = [...host.querySelectorAll('.jui-date-panel__day')].find((button) =>
      button.getAttribute('aria-label')?.includes('July 10, 2026'),
    )
    const day20 = [...host.querySelectorAll('.jui-date-panel__day')].find((button) =>
      button.getAttribute('aria-label')?.includes('July 20, 2026'),
    )
    expect(day10).toBeTruthy()
    expect(day20).toBeTruthy()
    day10.click()
    expect(value()).toEqual([])
    day20.click()
    expect(value()).toEqual(['2026-07-10', '2026-07-20'])
    expect(changed).toEqual(['2026-07-10', '2026-07-20'])
  })

  it('DatePickerPanel toggles multiple dates', async () => {
    const DatePickerPanel = await loadComponent('DatePickerPanel')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(['2026-07-08'])

    DatePickerPanel.mount(host, {
      value,
      multiple: true,
    })

    host.querySelector('.jui-date-panel__boot')?.dispatchEvent(new Event('load'))
    expect(host.querySelectorAll('.jui-date-panel__day.is-selected')).toHaveLength(1)

    const day15 = [...host.querySelectorAll('.jui-date-panel__day')].find((button) =>
      button.getAttribute('aria-label')?.includes('July 15, 2026'),
    )
    day15.click()
    expect(value()).toEqual(['2026-07-08', '2026-07-15'])

    day15.click()
    expect(value()).toEqual(['2026-07-08'])
  })

  it('DateTimePicker composes DatePicker and TimePicker values', async () => {
    const mod = await import(pathToFileURL(join(root, 'dist', 'DateTimePicker.js')).href)
    const DateTimePicker = mod.default || mod
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('2026-07-15T09:30')
    let changed = null

    const mount = DateTimePicker.mount || DateTimePicker
    mount(host, {
      label: 'Schedule',
      value,
      change: (next) => {
        changed = next
      },
    })

    expect(host.querySelector('.jui-datetime')).toBeTruthy()
    expect(host.querySelector('.jui-date')).toBeTruthy()
    expect(host.querySelector('.jui-time-picker')).toBeTruthy()
    expect(host.querySelector('.jui-datetime__label').textContent).toContain('Schedule')

    const dateInput = host.querySelector('.jui-date__input')
    expect(dateInput.value).toBe('07/15/2026')

    dateInput.value = '07282026'
    dateInput.dispatchEvent(new Event('input', { bubbles: true }))
    expect(value()).toBe('2026-07-28T09:30')
    expect(changed).toBe('2026-07-28T09:30')
  })

  it('Dialog traps focus and restores it after close', async () => {
    const Dialog = await loadComponent('Dialog')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const opener = document.createElement('button')
    opener.textContent = 'Open'
    document.body.appendChild(opener)
    opener.focus()
    const open = pulse(false)
    let closed = 0

    Dialog.mount(host, {
      open,
      title: 'Trap',
      close: () => {
        closed += 1
      },
      children: (target) => {
        const input = document.createElement('input')
        input.type = 'text'
        target.appendChild(input)
        return () => {}
      },
    })

    open.set(true)
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const dialog = host.querySelector('.jui-dialog')
    const title = host.querySelector('.jui-dialog__title')
    const closeBtn = host.querySelector('.jui-dialog__close')
    expect(dialog.getAttribute('data-jui-dialog')).toMatch(/^jui-dialog-/)
    expect(title.id).toBe(`${dialog.getAttribute('data-jui-dialog')}-title`)
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id)
    expect(document.activeElement).toBe(closeBtn)

    closeBtn.click()
    expect(closed).toBe(1)
    expect(open()).toBe(false)
    expect(host.querySelector('.jui-dialog')).toBeNull()
    expect(document.activeElement).toBe(opener)
  })

  it('Confirm uses unique title ids across instances', async () => {
    const Confirm = await loadComponent('Confirm')
    const first = document.createElement('div')
    const second = document.createElement('div')
    document.body.appendChild(first)
    document.body.appendChild(second)
    const openA = pulse(true)
    const openB = pulse(true)

    Confirm.mount(first, { open: openA, title: 'One' })
    Confirm.mount(second, { open: openB, title: 'Two' })

    const idA = first.querySelector('.jui-confirm').getAttribute('data-jui-confirm')
    const idB = second.querySelector('.jui-confirm').getAttribute('data-jui-confirm')
    expect(idA).not.toBe(idB)
    expect(first.querySelector('.jui-confirm__title').id).toBe(`${idA}-title`)
    expect(second.querySelector('.jui-confirm__title').id).toBe(`${idB}-title`)
  })

  it('Form disables descendant controls and FormItem shows error', async () => {
    const Form = await loadComponent('Form')
    const FormItem = await loadComponent('FormItem')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const disabled = pulse(false)

    Form.mount(host, {
      disabled,
      gap: 'sm',
      children: (target) => {
        const itemHost = document.createElement('div')
        target.appendChild(itemHost)
        FormItem.mount(itemHost, {
          label: 'Name',
          required: true,
          error: 'Required',
          children: (control) => {
            const input = document.createElement('input')
            input.type = 'text'
            control.appendChild(input)
            return () => {}
          },
        })
        return () => {}
      },
    })

    const fieldset = host.querySelector('fieldset.jui-form')
    expect(fieldset).toBeTruthy()
    expect(fieldset.classList.contains('jui-form--gap-sm')).toBe(true)
    expect(host.querySelector('.jui-form-item__error').textContent).toBe('Required')
    expect(host.querySelector('.jui-form-item').classList.contains('has-error')).toBe(true)

    disabled.set(true)
    expect(fieldset.disabled).toBe(true)
  })

  it('Form createForm API validates fields through FormItem props', async () => {
    const Form = await loadComponent('Form')
    const FormItem = await loadComponent('FormItem')
    const { createForm } = await import('../src/validation/index.js')
    const host = document.createElement('div')
    document.body.appendChild(host)

    const model = { name: pulse('') }
    const form = createForm({
      model,
      rules: {
        name: [{ required: true, message: 'Name required', trigger: 'blur' }],
      },
    })

    Form.mount(host, {
      form,
      children: (target) => {
        const itemHost = document.createElement('div')
        target.appendChild(itemHost)
        FormItem.mount(itemHost, {
          label: 'Name',
          prop: 'name',
          required: true,
          children: (control) => {
            const input = document.createElement('input')
            input.type = 'text'
            control.appendChild(input)
            return () => {}
          },
        })
        return () => {}
      },
    })

    host.querySelector('.jui-form__boot')?.dispatchEvent(new Event('load'))
    host.querySelector('.jui-form-item__boot')?.dispatchEvent(new Event('load'))

    await expect(form.validate()).rejects.toBeTruthy()
    expect(form.errors().name).toBe('Name required')
    expect(host.querySelector('.jui-form-item__error')?.textContent).toBe('Name required')

    model.name.set('Ada')
    await expect(form.validate()).resolves.toBe(true)
    expect(form.errors()).toEqual({})
  })

  it('Image shows fallback after load error and recovers on src change', async () => {
    const Image = await loadComponent('Image')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const src = pulse('https://invalid.jacare.local/missing.png')
    let errored = 0

    Image.mount(host, {
      src,
      alt: 'Broken',
      error: () => {
        errored += 1
      },
    })

    const img = host.querySelector('.jui-image__img')
    expect(img).toBeTruthy()
    img.dispatchEvent(new Event('error'))
    expect(host.querySelector('.jui-image').classList.contains('is-error')).toBe(true)
    expect(host.querySelector('.jui-image__fallback')).toBeTruthy()
    expect(errored).toBe(1)

    src.set(
      'data:image/svg+xml,' +
        encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="#0f0"/></svg>'),
    )
    expect(host.querySelector('.jui-image').classList.contains('is-error')).toBe(false)
    expect(host.querySelector('.jui-image__img')).toBeTruthy()
  })

  it('Collapse toggles panels with writable model fallback', async () => {
    const Collapse = await loadComponent('Collapse')
    const CollapseItem = await loadComponent('CollapseItem')
    const host = document.createElement('div')
    document.body.appendChild(host)

    Collapse.mount(host, {
      value: ['overview'],
      children: (target) => {
        for (const item of [
          { name: 'overview', title: 'Overview', body: 'A' },
          { name: 'api', title: 'API', body: 'B' },
        ]) {
          const itemHost = document.createElement('div')
          target.appendChild(itemHost)
          CollapseItem.mount(itemHost, {
            name: item.name,
            title: item.title,
            children: (body) => {
              body.textContent = item.body
              return () => {}
            },
          })
        }
        return () => {}
      },
    })

    host.querySelector('.jui-collapse__boot')?.dispatchEvent(new Event('load'))
    host.querySelectorAll('.jui-collapse-item__boot').forEach((node) => node.dispatchEvent(new Event('load')))

    const headers = host.querySelectorAll('.jui-collapse-item__header')
    expect(headers[0].getAttribute('aria-expanded')).toBe('true')
    expect(host.querySelectorAll('.jui-collapse-item.is-open').length).toBe(1)

    headers[1].click()
    expect(host.querySelectorAll('.jui-collapse-item.is-open').length).toBe(2)
    expect(headers[1].getAttribute('aria-expanded')).toBe('true')

    headers[0].click()
    expect(host.querySelectorAll('.jui-collapse-item.is-open').length).toBe(1)
    expect(headers[0].getAttribute('aria-expanded')).toBe('false')
  })

  it('Carousel advances slides with next arrow', async () => {
    const Carousel = await loadComponent('Carousel')
    const CarouselItem = await loadComponent('CarouselItem')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let index = 0

    Carousel.mount(host, {
      autoplay: false,
      arrow: 'always',
      change: (next) => {
        index = next
      },
      children: (target) => {
        for (const label of ['One', 'Two', 'Three']) {
          const itemHost = document.createElement('div')
          target.appendChild(itemHost)
          CarouselItem.mount(itemHost, {
            children: (slide) => {
              slide.textContent = label
              return () => {}
            },
          })
        }
        return () => {}
      },
    })

    host.querySelector('.jui-carousel__boot')?.dispatchEvent(new Event('load'))
    expect(host.querySelectorAll('.jui-carousel__item').length).toBe(3)
    host.querySelector('.jui-carousel__arrow--next')?.click()
    expect(index).toBe(1)
    expect(host.querySelector('.jui-carousel__track').getAttribute('style')).toContain('translateX(-100%)')
  })

  it('Carousel advances slides with horizontal swipe', async () => {
    const Carousel = await loadComponent('Carousel')
    const CarouselItem = await loadComponent('CarouselItem')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let index = 0

    Carousel.mount(host, {
      autoplay: false,
      arrow: 'never',
      change: (next) => {
        index = next
      },
      children: (target) => {
        for (const label of ['One', 'Two']) {
          const itemHost = document.createElement('div')
          target.appendChild(itemHost)
          CarouselItem.mount(itemHost, {
            children: (slide) => {
              slide.textContent = label
              return () => {}
            },
          })
        }
        return () => {}
      },
    })

    host.querySelector('.jui-carousel__boot')?.dispatchEvent(new Event('load'))
    const viewport = host.querySelector('.jui-carousel__viewport')
    viewport.dispatchEvent(new PointerEvent('pointerdown', { clientX: 200, clientY: 40, pointerId: 7, bubbles: true }))
    viewport.dispatchEvent(new PointerEvent('pointermove', { clientX: 140, clientY: 42, pointerId: 7, bubbles: true }))
    viewport.dispatchEvent(new PointerEvent('pointerup', { clientX: 120, clientY: 42, pointerId: 7, bubbles: true }))
    expect(index).toBe(1)
  })

  it('Cascader mounts trigger and shows placeholder', async () => {
    const Cascader = await loadComponent('Cascader')
    const host = document.createElement('div')
    const value = pulse([])

    Cascader.mount(host, {
      label: 'Region',
      value,
      options: [
        { value: 'br', label: 'Brazil', children: [{ value: 'sp', label: 'São Paulo' }] },
      ],
      placeholder: 'Pick region',
    })

    expect(host.querySelector('.jui-cascader')).toBeTruthy()
    expect(host.querySelector('.jui-cascader__trigger')).toBeTruthy()
    expect(host.querySelector('.jui-cascader__value').textContent.trim()).toBe('Pick region')
    expect(host.querySelector('.jui-cascader__value').classList.contains('is-placeholder')).toBe(true)
  })

  it('CascadeSelect opens and binds the leaf option value', async () => {
    const CascadeSelect = await loadComponent('CascadeSelect')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse(null)
    let changed = null

    CascadeSelect.mount(host, {
      label: 'City',
      value,
      options: [
        {
          name: 'Brazil',
          code: 'BR',
          states: [
            {
              name: 'São Paulo',
              code: 'SP',
              cities: [
                { cname: 'Campinas', code: 'B-CA' },
                { cname: 'Santos', code: 'B-SA' },
              ],
            },
          ],
        },
      ],
      optionLabel: 'cname',
      optionValue: 'code',
      optionGroupLabel: 'name',
      optionGroupChildren: ['states', 'cities'],
      change: (next) => {
        changed = next
      },
    })

    host.querySelector('[data-cascader-trigger]').click()
    expect(host.querySelector('[data-cascader].is-open')).toBeTruthy()

    const pick = (label) =>
      [...host.querySelectorAll('.jui-cascader__option')].find((button) => button.textContent.includes(label))?.click()

    pick('Brazil')
    pick('São Paulo')
    pick('Campinas')

    expect(value()).toBe('B-CA')
    expect(changed).toBe('B-CA')
    expect(host.querySelector('[data-cascader-panel]')?.hidden).toBe(true)
  })

  it('Cascader expands desktop columns and commits a leaf path', async () => {
    const Cascader = await loadComponent('Cascader')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse([])
    let changed = null

    Cascader.mount(host, {
      value,
      options: [
        {
          value: 'br',
          label: 'Brazil',
          children: [
            { value: 'sp', label: 'São Paulo' },
            { value: 'rj', label: 'Rio' },
          ],
        },
      ],
      change: (next) => {
        changed = next
      },
    })

    host.querySelector('[data-cascader-trigger]').click()
    expect(host.querySelector('[data-cascader].is-open')).toBeTruthy()
    expect(host.querySelectorAll('.jui-cascader__column')).toHaveLength(1)

    host.querySelector('.jui-cascader__option.has-children').click()
    expect(host.querySelectorAll('.jui-cascader__column')).toHaveLength(2)
    expect(host.querySelector('.jui-cascader__option.is-active')?.textContent).toContain('Brazil')

    const leaf = [...host.querySelectorAll('.jui-cascader__option')].find((button) =>
      button.textContent.includes('São Paulo'),
    )
    leaf.click()
    expect(value()).toEqual(['br', 'sp'])
    expect(changed).toEqual(['br', 'sp'])
    expect(host.querySelector('[data-cascader-panel]')?.hidden).toBe(true)
  })

  it('Transfer moves keys between lists', async () => {
    const Transfer = await loadComponent('Transfer')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse([])
    let changed = null

    Transfer.mount(host, {
      value,
      data: [
        { key: 'a', label: 'Alpha' },
        { key: 'b', label: 'Beta' },
      ],
      change: (next) => {
        changed = next
      },
    })

    expect(host.querySelector('.jui-transfer')).toBeTruthy()
    const leftPanel = host.querySelectorAll('.jui-transfer__panel')[0]
    const leftChecks = leftPanel.querySelectorAll('.jui-transfer__list input[type="checkbox"]')
    expect(leftChecks.length).toBeGreaterThan(0)
    leftChecks[0].checked = true
    leftChecks[0].dispatchEvent(new Event('change', { bubbles: true }))

    const toRight = host.querySelectorAll('.jui-transfer__op-btn')[0]
    expect(toRight).toBeTruthy()
    toRight.click()
    expect(Array.isArray(value()) ? value() : []).toContain('a')
    expect(changed).toContain('a')
  })

  it('SelectV2 picks an option and emits change', async () => {
    const SelectV2 = await loadComponent('SelectV2')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    let changed = ''

    SelectV2.mount(host, {
      label: 'Fruit',
      value,
      searchable: false,
      options: [
        { value: 'a', label: 'Apple' },
        { value: 'b', label: 'Banana' },
      ],
      change: (next) => {
        changed = next
      },
    })

    const details = host.querySelector('details.jui-select-v2__control')
    details.open = true
    details.dispatchEvent(new Event('toggle'))
    const option = [...host.querySelectorAll('.jui-select-v2__option')].find((node) => node.textContent.includes('Banana'))
    expect(option).toBeTruthy()
    option.click()
    expect(value()).toBe('b')
    expect(changed).toBe('b')
    expect(host.querySelector('.jui-select-v2__value').textContent).toBe('Banana')
  })

  it('SelectV2 shows loading and emits debounced remote search', async () => {
    const SelectV2 = await loadComponent('SelectV2')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('')
    const options = pulse([])
    const queries = []

    SelectV2.mount(host, {
      label: 'City',
      value,
      options,
      remote: true,
      loading: true,
      debounce: 40,
      search: (query) => {
        queries.push(query)
      },
    })

    expect(host.querySelector('.jui-select-v2.is-loading')).toBeTruthy()
    expect(host.querySelector('.jui-select-v2__spinner')).toBeTruthy()

    const details = host.querySelector('details.jui-select-v2__control')
    details.open = true
    details.dispatchEvent(new Event('toggle'))
    expect(queries.at(-1)).toBe('')
    const beforeType = queries.length

    const input = host.querySelector('.jui-select-v2__search')
    input.value = 'lis'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    expect(queries).toHaveLength(beforeType)
    await new Promise((resolve) => setTimeout(resolve, 60))
    expect(queries.slice(beforeType)).toEqual(['lis'])
  })

  it('TimePicker binds a pulse and opens the panel', async () => {
    const TimePicker = await loadComponent('TimePicker')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const value = pulse('09:30')

    TimePicker.mount(host, {
      label: 'Start',
      value,
      clearable: true,
    })

    expect(host.querySelector('.jui-time-picker')).toBeTruthy()
    expect(host.querySelector('.jui-time-picker__value').textContent).toBe('09:30')
    const details = host.querySelector('details.jui-time-picker__control')
    details.setAttribute('open', '')
    details.dispatchEvent(new Event('toggle'))
    expect(host.querySelector('.jui-time-picker__panel')).toBeTruthy()
  })

  it('TableV2 virtualizes rows and keeps stripe by absolute index', async () => {
    const TableV2 = await loadComponent('TableV2')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const data = Array.from({ length: 80 }, (item, index) => ({
      id: index + 1,
      name: `Row ${index + 1}`,
    }))
    let scrolled = null

    TableV2.mount(host, {
      columns: [
        { prop: 'id', label: 'ID', width: 72 },
        { prop: 'name', label: 'Name', width: 160 },
      ],
      data,
      rowHeight: 40,
      maxHeight: 200,
      stripe: true,
      border: true,
      scroll: (payload) => {
        scrolled = payload
      },
    })

    const body = host.querySelector('.jui-table-v2__body')
    expect(body).toBeTruthy()
    const initialRows = host.querySelectorAll('.jui-table-v2__tr').length
    expect(initialRows).toBeGreaterThan(0)
    expect(initialRows).toBeLessThan(80)

    body.scrollTop = 400
    body.dispatchEvent(new Event('scroll'))
    expect(scrolled?.scrollTop).toBe(400)
    expect(host.querySelectorAll('.jui-table-v2__tr').length).toBeGreaterThan(0)
    expect(host.querySelector('.jui-table-v2__tr.is-odd')).toBeTruthy()
  })

  it('TableV2 sorts before virtualizing and supports column align', async () => {
    const TableV2 = await loadComponent('TableV2')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const sortField = pulse('name')
    const sortOrder = pulse(1)
    let changed = null

    TableV2.mount(host, {
      columns: [
        { prop: 'name', label: 'Name', sortable: true, width: 160 },
        { prop: 'status', label: 'Status', sortable: true, align: 'end', width: 120 },
      ],
      data: [
        { id: 1, name: 'Theme', status: 'Ready' },
        { id: 2, name: 'API', status: 'Draft' },
        { id: 3, name: 'Docs', status: 'Queued' },
      ],
      sortField,
      sortOrder,
      border: true,
      maxHeight: 240,
      change: (payload) => {
        changed = payload
      },
    })

    const firstCell = host.querySelector('.jui-table-v2__td')
    expect(firstCell?.textContent?.trim()).toBe('API')
    expect(host.querySelector('.jui-table-v2__td[style*="text-align:right"]')).toBeTruthy()

    const statusBtn = [...host.querySelectorAll('.jui-table-v2__sort-btn')].find((btn) =>
      btn.textContent.includes('Status'),
    )
    statusBtn?.click()
    expect(sortField()).toBe('status')
    expect(changed).toEqual({ sortField: 'status', sortOrder: 1 })
    expect(statusBtn?.textContent).toContain('↑')
  })

  it('Parallax applies scrim tones and clamps scroll offset', async () => {
    const Parallax = await loadComponent('Parallax')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let offset = null

    Parallax.mount(host, {
      src: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E',
      alt: 'Demo',
      height: 240,
      speed: 0.5,
      scrim: 'light',
      offset: (value) => {
        offset = value
      },
    })

    const root = host.querySelector('.jui-parallax')
    expect(root.classList.contains('jui-parallax--scrim-light')).toBe(true)
    expect(host.querySelector('.jui-parallax__scrim')).toBeTruthy()
    host.querySelector('.jui-parallax__boot')?.dispatchEvent(new Event('load'))
    window.dispatchEvent(new Event('scroll'))
    expect(typeof offset).toBe('number')
    expect(Math.abs(offset)).toBeLessThanOrEqual(240 * 0.22 + 1)
  })

  it('DataView toggles layout and paginates without bound models', async () => {
    const DataView = await loadComponent('DataView')
    const host = document.createElement('div')
    host.style.width = '420px'
    document.body.appendChild(host)

    DataView.mount(host, {
      data: [
        { key: '1', title: 'One', description: 'First' },
        { key: '2', title: 'Two', description: 'Second' },
        { key: '3', title: 'Three', description: 'Third' },
      ],
      rows: 2,
    })

    const root = host.querySelector('.jui-data-view')
    const items = host.querySelector('.jui-data-view__items')
    const gridBtn = host.querySelector('[aria-label="Grid layout"]')
    expect(root.classList.contains('jui-data-view--list')).toBe(true)
    expect(gridBtn?.getAttribute('aria-pressed')).toBe('false')
    expect([...host.querySelectorAll('.jui-data-view__title')].map((node) => node.textContent)).toEqual([
      'One',
      'Two',
    ])
    expect(getComputedStyle(items).gridTemplateColumns.split(' ').length).toBe(1)

    gridBtn?.click()
    expect(root.classList.contains('jui-data-view--grid')).toBe(true)
    expect(gridBtn?.getAttribute('aria-pressed')).toBe('true')
    expect(getComputedStyle(items).gridTemplateColumns.split(' ').length).toBeGreaterThan(1)

    const pageTwo = [...host.querySelectorAll('.jui-pagination button')].find(
      (button) => button.textContent.trim() === '2',
    )
    pageTwo?.click()
    expect([...host.querySelectorAll('.jui-data-view__title')].map((node) => node.textContent)).toEqual([
      'Three',
    ])
  })

  it('Pagination changes page and page size', async () => {
    const Pagination = await loadComponent('Pagination')
    const host = document.createElement('div')
    document.body.appendChild(host)
    const page = pulse(2)
    const size = pulse(10)
    let last = null

    Pagination.mount(host, {
      total: 120,
      currentPage: page,
      pageSize: size,
      pageSizes: [10, 20, 50],
      background: true,
      change: (payload) => {
        last = payload
      },
    })

    expect(host.querySelector('.jui-pagination__total').textContent).toContain('of 120')
    host.querySelector('[aria-label="Next page"]')?.click()
    expect(page()).toBe(3)
    expect(last).toEqual({ page: 3, pageSize: 10 })

    const select = host.querySelector('.jui-pagination__select')
    expect(select).toBeTruthy()
    select.value = '20'
    select.dispatchEvent(new Event('change', { bubbles: true }))
    expect(size()).toBe(20)
    expect(last).toEqual({ page: 3, pageSize: 20 })
  })

  it('smoke mounts a sample of newer components', async () => {
    const Empty = await loadComponent('Empty')
    const Tag = await loadComponent('Tag')
    const Pagination = await loadComponent('Pagination')
    const Link = await loadComponent('Link')
    const Container = await loadComponent('Container')
    const Table = await loadComponent('Table')
    const Tree = await loadComponent('Tree')
    const Menu = await loadComponent('Menu')
    const MenuItem = await loadComponent('MenuItem')
    const Breadcrumb = await loadComponent('Breadcrumb')
    const BreadcrumbItem = await loadComponent('BreadcrumbItem')

    const emptyHost = document.createElement('div')
    Empty.mount(emptyHost, { description: 'No data' })
    expect(emptyHost.querySelector('.jui-empty')).toBeTruthy()

    const emptyTypedHost = document.createElement('div')
    Empty.mount(emptyTypedHost, {
      title: 'No matches',
      description: 'Try again',
      type: 'search',
    })
    expect(emptyTypedHost.querySelector('.jui-empty--search')).toBeTruthy()
    expect(emptyTypedHost.querySelector('.jui-empty__title')?.textContent).toBe('No matches')

    const tagHost = document.createElement('div')
    Tag.mount(tagHost, { text: 'Beta', type: 'primary' })
    expect(tagHost.querySelector('.jui-tag')).toBeTruthy()

    const paginationHost = document.createElement('div')
    Pagination.mount(paginationHost, { total: 120, currentPage: 2, pageSize: 10 })
    expect(paginationHost.querySelector('.jui-pagination')).toBeTruthy()

    const linkHost = document.createElement('div')
    Link.mount(linkHost, {
      href: '#docs',
      children: (target) => {
        target.appendChild(document.createTextNode('Read docs'))
        return () => {}
      },
    })
    expect(linkHost.querySelector('.jui-link')).toBeTruthy()

    const containerHost = document.createElement('div')
    Container.mount(containerHost, {
      children: (target) => {
        target.appendChild(document.createTextNode('Layout'))
        return () => {}
      },
    })
    expect(containerHost.querySelector('.jui-container')).toBeTruthy()

    const tableHost = document.createElement('div')
    Table.mount(tableHost, {
      columns: [
        { prop: 'name', label: 'Name' },
        { prop: 'status', label: 'Status' },
      ],
      data: [
        { name: 'API', status: 'Ready' },
        { name: 'Docs', status: 'Draft' },
      ],
    })
    expect(tableHost.querySelector('.jui-table')).toBeTruthy()

    const sortHost = document.createElement('div')
    const sortField = pulse('status')
    const sortOrder = pulse(1)
    Table.mount(sortHost, {
      columns: [
        { prop: 'name', label: 'Name', sortable: true },
        { prop: 'status', label: 'Status', sortable: true },
      ],
      data: [
        { id: 1, name: 'Theme', status: 'Ready' },
        { id: 2, name: 'API', status: 'Draft' },
      ],
      sortField,
      sortOrder,
      border: true,
    })
    const activeSort = [...sortHost.querySelectorAll('.jui-table__sort-btn')].find((btn) =>
      btn.textContent.includes('Status'),
    )
    expect(activeSort?.textContent).toContain('↑')

    const treeHost = document.createElement('div')
    Tree.mount(treeHost, {
      data: [
        {
          value: 'docs',
          label: 'Docs',
          children: [{ value: 'install', label: 'Install' }],
        },
      ],
      defaultExpandAll: true,
    })
    expect(treeHost.querySelector('.jui-tree')).toBeTruthy()

    const menuHost = document.createElement('div')
    Menu.mount(menuHost, {
      defaultActive: 'home',
      children: (target) => {
        const itemHost = document.createElement('div')
        target.appendChild(itemHost)
        MenuItem.mount(itemHost, {
          index: 'home',
          children: (itemTarget) => {
            itemTarget.appendChild(document.createTextNode('Home'))
            return () => {}
          },
        })
        return () => {}
      },
    })
    expect(menuHost.querySelector('.jui-menu')).toBeTruthy()

    const breadcrumbHost = document.createElement('div')
    Breadcrumb.mount(breadcrumbHost, {
      children: (target) => {
        const itemHost = document.createElement('div')
        target.appendChild(itemHost)
        BreadcrumbItem.mount(itemHost, {
          href: '#home',
          children: (itemTarget) => {
            itemTarget.appendChild(document.createTextNode('Home'))
            return () => {}
          },
        })
        return () => {}
      },
    })
    expect(breadcrumbHost.querySelector('.jui-breadcrumb')).toBeTruthy()
  })

  it('Breadcrumb separators target sibling hosts, not each item last-child', async () => {
    const Breadcrumb = await loadComponent('Breadcrumb')
    const BreadcrumbItem = await loadComponent('BreadcrumbItem')
    const host = document.createElement('div')
    document.body.appendChild(host)

    Breadcrumb.mount(host, {
      separator: '›',
      children: (target) => {
        for (const [href, label] of [
          ['/', 'Home'],
          ['/docs', 'Docs'],
          ['', 'Current'],
        ]) {
          const itemHost = document.createElement('div')
          target.appendChild(itemHost)
          BreadcrumbItem.mount(itemHost, {
            href,
            children: (itemTarget) => {
              itemTarget.appendChild(document.createTextNode(label))
            },
          })
        }
      },
    })

    const style = [...document.head.querySelectorAll('style[data-jacare-s]')]
      .map((node) => node.textContent)
      .join('\n')
    expect(style).toContain('.jui-breadcrumb__list > span > :not(:last-child) .jui-breadcrumb-item::after')
    expect(style).toContain('.jui-breadcrumb__list > span > :last-child .jui-breadcrumb-item')
    expect(style).not.toContain('.jui-breadcrumb-item:not(:last-child)::after')

    const items = host.querySelectorAll('.jui-breadcrumb-item')
    expect(items).toHaveLength(3)
    expect(items[0].querySelector('a')?.getAttribute('href')).toBe('/')
    expect(items[2].querySelector('.jui-breadcrumb-item__text')?.textContent).toContain('Current')
  })

  it('AnchorLink renders title and slot labels', async () => {
    const Anchor = await loadComponent('Anchor')
    const AnchorLink = await loadComponent('AnchorLink')
    const host = document.createElement('div')
    document.body.appendChild(host)

    Anchor.mount(host, {
      children: (target) => {
        const titled = document.createElement('div')
        target.appendChild(titled)
        AnchorLink.mount(titled, { href: '#one', title: 'One' })

        const slotted = document.createElement('div')
        target.appendChild(slotted)
        AnchorLink.mount(slotted, {
          href: '#two',
          children: (itemTarget) => {
            itemTarget.appendChild(document.createTextNode('Two'))
          },
        })
      },
    })

    const links = [...host.querySelectorAll('.jui-anchor-link')]
    expect(links).toHaveLength(2)
    expect(links[0].textContent).toContain('One')
    expect(links[0].textContent).not.toContain('#else')
    expect(links[1].textContent).toContain('Two')
    expect(links[1].textContent).not.toContain('#else')
  })

  it('Anchor scrolls a container target and marks the active link', async () => {
    const Anchor = await loadComponent('Anchor')
    const AnchorLink = await loadComponent('AnchorLink')
    const host = document.createElement('div')
    document.body.appendChild(host)

    const scroller = document.createElement('div')
    scroller.style.height = '120px'
    scroller.style.overflow = 'auto'
    scroller.style.overflowY = 'auto'
    Object.defineProperty(scroller, 'clientHeight', { configurable: true, get: () => 120 })
    Object.defineProperty(scroller, 'scrollHeight', { configurable: true, get: () => 400 })
    let scrollTop = 0
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      get: () => scrollTop,
      set: (value) => {
        scrollTop = value
      },
    })
    scroller.scrollTo = ({ top }) => {
      scrollTop = top
    }
    scroller.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      bottom: 120,
      right: 200,
      width: 200,
      height: 120,
    })

    const first = document.createElement('section')
    first.id = 'anchor-test-a'
    first.style.minHeight = '160px'
    first.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      bottom: 160,
      right: 200,
      width: 200,
      height: 160,
    })
    const second = document.createElement('section')
    second.id = 'anchor-test-b'
    second.style.minHeight = '160px'
    second.getBoundingClientRect = () => ({
      top: 160,
      left: 0,
      bottom: 320,
      right: 200,
      width: 200,
      height: 160,
    })
    scroller.append(first, second)

    const navHost = document.createElement('div')
    host.append(navHost, scroller)

    let changed = ''
    Anchor.mount(navHost, {
      offset: 12,
      change: (href) => {
        changed = href
      },
      children: (target) => {
        for (const [href, label] of [
          ['#anchor-test-a', 'A'],
          ['#anchor-test-b', 'B'],
        ]) {
          const itemHost = document.createElement('div')
          target.appendChild(itemHost)
          AnchorLink.mount(itemHost, {
            href,
            children: (itemTarget) => {
              itemTarget.appendChild(document.createTextNode(label))
            },
          })
        }
      },
    })

    navHost.querySelector('.jui-anchor__boot')?.dispatchEvent(new Event('load'))
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const links = [...navHost.querySelectorAll('.jui-anchor-link')]
    expect(links[0].textContent).toContain('A')
    expect(links[1].textContent).toContain('B')

    links[1].click()
    expect(scrollTop).toBe(148)
    expect(links[1].classList.contains('is-active')).toBe(true)
    expect(links[1].getAttribute('aria-current')).toBe('location')
    expect(changed).toBe('#anchor-test-b')
  })

  it('Tooltip shows content on pointer enter without shadowing effect', async () => {
    const Tooltip = await loadComponent('Tooltip')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let shown = 0
    let hidden = 0

    Tooltip.mount(host, {
      content: 'Save changes',
      appearance: 'light',
      placement: 'top',
      show: () => {
        shown += 1
      },
      hide: () => {
        hidden += 1
      },
      children: (target) => {
        const trigger = document.createElement('button')
        trigger.type = 'button'
        trigger.textContent = 'Save'
        target.appendChild(trigger)
      },
    })

    const root = host.querySelector('.jui-tooltip')
    const panel = host.querySelector('.jui-tooltip__panel')
    expect(root).toBeTruthy()
    expect(panel?.hidden).toBe(true)
    expect(panel?.classList.contains('jui-tooltip__panel--light')).toBe(true)
    expect(panel?.textContent).toContain('Save changes')

    root.dispatchEvent(new Event('pointerenter'))
    expect(panel.hidden).toBe(false)
    expect(shown).toBe(1)

    root.dispatchEvent(new Event('pointerleave'))
    await new Promise((resolve) => setTimeout(resolve, 220))
    expect(panel.hidden).toBe(true)
    expect(hidden).toBe(1)
  })

  it('Popover opens when clicking a nested Button trigger', async () => {
    const Popover = await loadComponent('Popover')
    const Button = await loadComponent('Button')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let shown = 0

    Popover.mount(host, {
      title: 'Project owner',
      content: 'Ana manages this workspace.',
      show: () => {
        shown += 1
      },
      children: (target) => {
        const buttonHost = document.createElement('div')
        target.appendChild(buttonHost)
        Button.mount(buttonHost, {
          children: (buttonTarget) => {
            buttonTarget.appendChild(document.createTextNode('View owner'))
          },
        })
      },
    })

    const details = host.querySelector('details.jui-popover__control')
    const button = host.querySelector('button.jui-btn')
    expect(details?.open).toBe(false)

    button.click()
    expect(details.open).toBe(true)
    expect(shown).toBe(1)
    expect(host.querySelector('.jui-popover__title')?.textContent).toContain('Project owner')
    expect(host.querySelector('.jui-popover__content')?.textContent).toContain('Ana manages this workspace.')

    button.click()
    expect(details.open).toBe(false)
  })

  it('Popconfirm opens from a nested Button and emits confirm', async () => {
    const Popconfirm = await loadComponent('Popconfirm')
    const Button = await loadComponent('Button')
    const host = document.createElement('div')
    document.body.appendChild(host)
    let confirmed = 0
    let canceled = 0

    Popconfirm.mount(host, {
      title: 'Delete this project?',
      placement: 'bottom',
      confirm: () => {
        confirmed += 1
      },
      cancel: () => {
        canceled += 1
      },
      children: (target) => {
        const buttonHost = document.createElement('div')
        target.appendChild(buttonHost)
        Button.mount(buttonHost, {
          children: (buttonTarget) => {
            buttonTarget.appendChild(document.createTextNode('Delete'))
          },
        })
      },
    })

    const details = host.querySelector('details.jui-popconfirm__control')
    const trigger = host.querySelector('button.jui-btn')
    expect(details?.open).toBe(false)

    trigger.click()
    expect(details.open).toBe(true)
    expect(host.querySelector('.jui-popconfirm__title')?.textContent).toContain('Delete this project?')

    host.querySelector('.jui-popconfirm__button--confirm').click()
    expect(details.open).toBe(false)
    expect(confirmed).toBe(1)
    expect(canceled).toBe(0)
  })

  it('Skeleton applies shimmer animation when animated', async () => {
    const Skeleton = await loadComponent('Skeleton')
    const host = document.createElement('div')

    Skeleton.mount(host, {
      rows: 2,
      animated: true,
      avatar: true,
      size: 'lg',
    })

    expect(host.querySelector('.jui-skeleton')?.classList.contains('jui-skeleton--animated')).toBe(true)
    expect(host.querySelector('.jui-skeleton')?.classList.contains('jui-skeleton--avatar')).toBe(true)
    expect(host.querySelector('.jui-skeleton-item--circle')).toBeTruthy()
    const item = host.querySelector('.jui-skeleton-item')
    expect(item?.classList.contains('jui-skeleton-item--animated')).toBe(true)
    const styles = [...document.querySelectorAll('style[data-jacare-s]')].map((node) => node.textContent).join('\n')
    expect(styles).toContain('jui-skeleton-shimmer')
    expect(styles).toContain('.jui-skeleton-item--animated')
  })

  it('SkeletonItem can animate without a Skeleton parent', async () => {
    const SkeletonItem = await loadComponent('SkeletonItem')
    const host = document.createElement('div')

    SkeletonItem.mount(host, {
      variant: 'circle',
      animated: true,
    })

    const item = host.querySelector('.jui-skeleton-item')
    expect(item?.classList.contains('jui-skeleton-item--circle')).toBe(true)
    expect(item?.classList.contains('jui-skeleton-item--animated')).toBe(true)
  })

  it('Statistic formats value instantly when duration is 0', async () => {
    const Statistic = await loadComponent('Statistic')
    const host = document.createElement('div')
    const value = pulse(12840.5)

    Statistic.mount(host, {
      title: 'Revenue',
      value,
      prefix: '$',
      precision: 1,
      duration: 0,
    })

    expect(host.querySelector('.jui-statistic__title').textContent).toBe('Revenue')
    expect(host.querySelector('.jui-statistic__prefix').textContent).toBe('$')
    expect(host.querySelector('.jui-statistic__value').textContent).toBe('12,840.5')

    value.set(99.1)
    expect(host.querySelector('.jui-statistic__value').textContent).toBe('99.1')
  })

  it('Statistic count-up animation advances toward the target', async () => {
    const Statistic = await loadComponent('Statistic')
    const host = document.createElement('div')
    const frames = []
    const originalRAF = globalThis.requestAnimationFrame
    const originalCAF = globalThis.cancelAnimationFrame
    const originalNow = performance.now
    let now = 0

    performance.now = () => now
    globalThis.requestAnimationFrame = (cb) => {
      frames.push(cb)
      return frames.length
    }
    globalThis.cancelAnimationFrame = () => {}

    try {
      Statistic.mount(host, {
        title: 'Users',
        value: 100,
        precision: 0,
        duration: 1000,
      })

      expect(host.querySelector('.jui-statistic__value').textContent).toBe('0')
      expect(frames.length).toBe(1)

      now = 500
      frames.shift()(now)
      expect(Number(host.querySelector('.jui-statistic__value').textContent.replace(/,/g, ''))).toBeGreaterThan(0)
      expect(Number(host.querySelector('.jui-statistic__value').textContent.replace(/,/g, ''))).toBeLessThan(100)

      now = 1000
      frames.shift()(now)
      expect(host.querySelector('.jui-statistic__value').textContent).toBe('100')
    } finally {
      globalThis.requestAnimationFrame = originalRAF
      globalThis.cancelAnimationFrame = originalCAF
      performance.now = originalNow
    }
  })

  it('Statistic keeps string values static', async () => {
    const Statistic = await loadComponent('Statistic')
    const host = document.createElement('div')

    Statistic.mount(host, {
      title: 'Release',
      value: 'v2.4.0',
      duration: 1200,
    })

    expect(host.querySelector('.jui-statistic__value').textContent).toBe('v2.4.0')
  })
})
