export function read(value) {
  let current = value
  for (let index = 0; index < 4; index += 1) {
    if (typeof current !== 'function') return current
    if (typeof current.set === 'function') return current()
    current = current()
  }
  return current
}

export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function coalesce(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value
  }
  return undefined
}
