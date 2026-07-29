import { describe, expect, it } from 'vitest'
import { coalesce, cx, read } from '../src/internal/utils.js'

describe('internal utils', () => {
  it('reads plain values and pulses', () => {
    expect(read('ok')).toBe('ok')
    expect(read(() => 42)).toBe(42)
  })

  it('joins truthy class parts', () => {
    expect(cx('a', false, null, 'b', '', 'c')).toBe('a b c')
  })

  it('coalesces the first defined non-empty value', () => {
    expect(coalesce(undefined, null, '', 'first', 'second')).toBe('first')
    expect(coalesce(undefined, null, '')).toBeUndefined()
    expect(coalesce(0)).toBe(0)
  })
})
