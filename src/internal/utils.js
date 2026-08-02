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

export function isNarrowViewport(maxWidth = 640) {
  if (typeof matchMedia !== 'function') return false
  return matchMedia(`(max-width: ${maxWidth}px)`).matches
}

export function isCoarsePointer() {
  if (typeof matchMedia !== 'function') return false
  return matchMedia('(pointer: coarse)').matches
}

export function canHoverTrigger() {
  if (typeof matchMedia !== 'function') return true
  return matchMedia('(hover: hover) and (pointer: fine)').matches
}
