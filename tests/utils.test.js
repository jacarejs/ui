import { describe, expect, it } from 'vitest'
import { pulse } from '@jacare/core'
import { coalesce, cx, read } from '../src/internal/utils.js'

describe('internal utils', () => {
  it('reads plain values, thunks, and pulses', () => {
    expect(read('ok')).toBe('ok')
    expect(read(() => 42)).toBe(42)
    expect(read(pulse('signal'))).toBe('signal')
  })

  it('unwraps lazy prop thunks into translation derives', () => {
    const translated = pulse('Salvar')
    expect(read(() => translated)).toBe('Salvar')
  })

  it('stops unwrapping after nested function depth limit', () => {
    const tooDeep = () => () => () => () => () => 'bottom'
    const value = read(tooDeep)
    expect(typeof value).toBe('function')
    expect(value()).toBe('bottom')
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
