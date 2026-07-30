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
})
