import { pulse } from '@jacare/core'
import { read } from '../internal/utils.js'

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const URL_RE = /^(https?:)?\/\/[^\s/$.?#].[^\s]*$/i

export function asArray(value) {
  if (value == null) return []
  return Array.isArray(value) ? value : [value]
}

export function normalizeTrigger(value) {
  const list = asArray(value)
    .map((item) => String(item || '').trim())
    .filter(Boolean)
  return list.length ? list : ['blur', 'change']
}

export function getByPath(source, path) {
  if (!path) return undefined
  const parts = String(path).split('.').filter(Boolean)
  let current = source
  for (const part of parts) {
    if (current == null) return undefined
    current = typeof current === 'function' && typeof current.set === 'function' ? current() : current
    if (current == null || typeof current !== 'object') return undefined
    current = current[part]
  }
  return typeof current === 'function' && typeof current.set === 'function' ? current() : current
}

export function setByPath(source, path, next) {
  if (!path || source == null) return
  const parts = String(path).split('.').filter(Boolean)
  if (!parts.length) return
  let current = source
  for (let index = 0; index < parts.length - 1; index += 1) {
    const part = parts[index]
    let node = current[part]
    if (typeof node === 'function' && typeof node.set === 'function') node = node()
    if (node == null || typeof node !== 'object') {
      node = {}
      const slot = current[part]
      if (typeof slot === 'function' && typeof slot.set === 'function') slot.set(node)
      else current[part] = node
    }
    current = node
  }
  const leaf = parts[parts.length - 1]
  const target = current[leaf]
  if (typeof target === 'function' && typeof target.set === 'function') target.set(next)
  else current[leaf] = next
}

function isEmptyValue(value) {
  if (value == null) return true
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  return false
}

function typeOfValue(value) {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'null'
  return typeof value
}

function messageOf(rule, fallback) {
  const next = read(rule?.message)
  return next == null || next === '' ? fallback : String(next)
}

function runValidator(rule, value, model) {
  const validator = rule?.validator
  if (typeof validator !== 'function') return Promise.resolve(null)
  return new Promise((resolve) => {
    let settled = false
    const finish = (error) => {
      if (settled) return
      settled = true
      if (!error) return resolve(null)
      if (typeof error === 'string') return resolve(error)
      if (error instanceof Error) return resolve(error.message || messageOf(rule, 'Invalid value'))
      resolve(messageOf(rule, 'Invalid value'))
    }
    try {
      const result = validator(rule, value, finish, model)
      if (result != null && typeof result.then === 'function') {
        result.then(() => finish(null)).catch((error) => finish(error))
        return
      }
      if (validator.length < 3) finish(result)
    } catch (error) {
      finish(error)
    }
  })
}

export async function validateRule(rule, value, model = {}) {
  const current = rule && typeof rule === 'object' ? rule : {}
  const label = String(read(current.label) || read(current.fullField) || 'Field')

  if (current.required) {
    const empty =
      isEmptyValue(value) ||
      (current.whitespace !== false && typeof value === 'string' && value.trim() === '')
    if (empty) return messageOf(current, `${label} is required`)
  }

  if (isEmptyValue(value) && !current.required) {
    if (typeof current.validator === 'function') return runValidator(current, value, model)
    return null
  }

  if (current.type) {
    const expected = String(current.type)
    if (expected === 'email') {
      if (typeof value !== 'string' || !EMAIL_RE.test(value)) {
        return messageOf(current, `${label} must be a valid email`)
      }
    } else if (expected === 'url') {
      if (typeof value !== 'string' || !URL_RE.test(value)) {
        return messageOf(current, `${label} must be a valid url`)
      }
    } else if (expected === 'integer') {
      if (!Number.isInteger(Number(value)) || String(value).trim() === '') {
        return messageOf(current, `${label} must be an integer`)
      }
    } else if (expected === 'number') {
      if (typeof value !== 'number' && !(typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)))) {
        return messageOf(current, `${label} must be a number`)
      }
    } else if (expected === 'boolean') {
      if (typeof value !== 'boolean') return messageOf(current, `${label} must be a boolean`)
    } else if (expected === 'array') {
      if (!Array.isArray(value)) return messageOf(current, `${label} must be an array`)
    } else if (expected === 'string') {
      if (typeof value !== 'string') return messageOf(current, `${label} must be a string`)
    } else if (typeOfValue(value) !== expected) {
      return messageOf(current, `${label} must be a ${expected}`)
    }
  }

  if (current.pattern) {
    const pattern =
      current.pattern instanceof RegExp ? current.pattern : new RegExp(String(current.pattern))
    if (!pattern.test(String(value ?? ''))) {
      return messageOf(current, `${label} is invalid`)
    }
  }

  const length =
    typeof value === 'string' || Array.isArray(value)
      ? value.length
      : value == null
        ? 0
        : String(value).length

  if (current.len != null && length !== Number(current.len)) {
    return messageOf(current, `${label} must be exactly ${current.len} characters`)
  }
  if (current.min != null && length < Number(current.min)) {
    return messageOf(current, `${label} must be at least ${current.min}`)
  }
  if (current.max != null && length > Number(current.max)) {
    return messageOf(current, `${label} must be at most ${current.max}`)
  }

  if (typeof current.validator === 'function') {
    return runValidator(current, value, model)
  }

  return null
}

export async function validateRules(rules, value, model = {}, trigger = '') {
  const list = asArray(rules)
  const wanted = String(trigger || '')
  for (const rule of list) {
    if (!rule || typeof rule !== 'object') continue
    const triggers = normalizeTrigger(rule.trigger)
    if (wanted && !triggers.includes(wanted) && wanted !== 'submit') continue
    const message = await validateRule(rule, value, model)
    if (message) return message
  }
  return null
}

function cloneValue(value) {
  if (Array.isArray(value)) return value.map((item) => cloneValue(item))
  if (value && typeof value === 'object') return { ...value }
  return value
}

function snapshotModel(model) {
  const source = read(model) || {}
  const out = {}
  for (const key of Object.keys(source)) {
    out[key] = cloneValue(getByPath(source, key))
  }
  return out
}

function assignErrors(errorsPulse, next) {
  if (errorsPulse && typeof errorsPulse.set === 'function') errorsPulse.set({ ...next })
}

export function createForm(options = {}) {
  const model = options.model || {}
  const rulesState =
    options.rules && typeof options.rules.set === 'function' ? options.rules : pulse(options.rules || {})
  const errors = options.errors && typeof options.errors.set === 'function' ? options.errors : pulse({})
  const fields = new Map()
  const initial = snapshotModel(model)

  function fieldRules(prop, localRules, required, label) {
    const fromForm = asArray((read(rulesState) || {})[prop])
    const fromItem = asArray(localRules)
    const merged = [...fromForm, ...fromItem].map((rule) => ({
      ...rule,
      label: rule.label || label || prop,
      fullField: prop,
    }))
    if (required && !merged.some((rule) => rule.required)) {
      merged.unshift({
        required: true,
        message: `${label || prop} is required`,
        trigger: ['blur', 'change'],
        label: label || prop,
        fullField: prop,
      })
    }
    return merged
  }

  function registerField(prop, field) {
    if (!prop) return () => {}
    fields.set(String(prop), field)
    return () => {
      if (fields.get(String(prop)) === field) fields.delete(String(prop))
    }
  }

  async function validateField(props, triggerOrCallback = 'submit', maybeCallback) {
    let trigger = 'submit'
    let callback
    if (typeof triggerOrCallback === 'function') {
      callback = triggerOrCallback
    } else {
      trigger = triggerOrCallback || 'submit'
      callback = maybeCallback
    }

    const names = props == null || (Array.isArray(props) && props.length === 0)
      ? [...new Set([...fields.keys(), ...Object.keys(read(rulesState) || {})])]
      : asArray(props).map(String)
    const unique = [...new Set(names.filter(Boolean))]
    const nextErrors = { ...read(errors) }
    const invalid = {}

    for (const prop of unique) {
      const field = fields.get(prop)
      const rules = fieldRules(prop, field?.rules?.(), field?.required?.(), field?.label?.())
      if (!rules.length) {
        delete nextErrors[prop]
        field?.setError?.('')
        continue
      }
      const value = field?.getValue ? field.getValue() : getByPath(model, prop)
      const message = await validateRules(rules, value, model, trigger)
      if (message) {
        nextErrors[prop] = message
        invalid[prop] = [{ message, field: prop }]
        field?.setError?.(message)
      } else {
        delete nextErrors[prop]
        field?.setError?.('')
      }
    }

    assignErrors(errors, nextErrors)
    const valid = Object.keys(invalid).length === 0
    if (typeof callback === 'function') {
      callback(valid, valid ? undefined : invalid)
      return valid
    }
    if (valid) return true
    throw Object.assign(new Error('Form validation failed'), { fields: invalid })
  }

  async function validate(callback) {
    try {
      const valid = await validateField(undefined, 'submit')
      if (typeof callback === 'function') callback(true)
      return valid
    } catch (error) {
      if (typeof callback === 'function') callback(false, error.fields || {})
      if (typeof callback === 'function') return false
      throw error
    }
  }

  function clearValidate(props) {
    const names =
      props == null || (Array.isArray(props) && props.length === 0)
        ? Object.keys(read(errors) || {})
        : asArray(props).map(String)
    const nextErrors = { ...read(errors) }
    for (const prop of names) {
      delete nextErrors[prop]
      fields.get(prop)?.setError?.('')
    }
    assignErrors(errors, nextErrors)
  }

  function resetFields(props) {
    const names =
      props == null || (Array.isArray(props) && props.length === 0)
        ? Object.keys(initial)
        : asArray(props).map(String)
    for (const prop of names) {
      if (Object.prototype.hasOwnProperty.call(initial, prop.split('.')[0]) || getByPath(initial, prop) !== undefined) {
        setByPath(model, prop, cloneValue(getByPath(initial, prop)))
      }
      fields.get(prop)?.setError?.('')
    }
    clearValidate(names)
  }

  function scrollToField(prop) {
    const field = fields.get(String(prop))
    field?.el?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })
  }

  function setInitialValues(nextModel = {}) {
    const source = read(nextModel) || {}
    for (const key of Object.keys(source)) {
      initial[key] = cloneValue(getByPath(source, key))
    }
  }

  return {
    model,
    rules: rulesState,
    errors,
    fields,
    registerField,
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField,
    setInitialValues,
    getFieldValue: (prop) => getByPath(model, prop),
    setFieldValue: (prop, value) => setByPath(model, prop, value),
  }
}
