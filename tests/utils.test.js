import { describe, expect, it, vi, afterEach } from 'vitest'
import { pulse } from '@jacare/core'
import {
  canHoverTrigger,
  coalesce,
  cx,
  isCoarsePointer,
  isNarrowViewport,
  read,
} from '../src/internal/utils.js'

describe('internal utils', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

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

  it('detects narrow, coarse, and hover-capable pointers via matchMedia', () => {
    const matchMedia = vi.fn((query) => ({
      matches:
        query.includes('max-width') ||
        query.includes('pointer: coarse') ||
        query.includes('hover: hover'),
    }))
    vi.stubGlobal('matchMedia', matchMedia)

    expect(isNarrowViewport()).toBe(true)
    expect(isCoarsePointer()).toBe(true)
    expect(canHoverTrigger()).toBe(true)
    expect(matchMedia).toHaveBeenCalled()
  })

  it('returns safe defaults when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined)
    expect(isNarrowViewport()).toBe(false)
    expect(isCoarsePointer()).toBe(false)
    expect(canHoverTrigger()).toBe(true)
  })
})
