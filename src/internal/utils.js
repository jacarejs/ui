export function read(value) {
  return typeof value === 'function' ? value() : value
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
