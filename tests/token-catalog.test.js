import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  copyToken,
  filterGroups,
  filterItems,
  matchesQuery,
  readToken,
  swatchStyle,
  tokenGroups,
} from '../docs/src/token-catalog.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('token-catalog', () => {
  it('exposes grouped token definitions', () => {
    expect(tokenGroups.length).toBeGreaterThan(3)
    expect(tokenGroups[0].items[0].name).toMatch(/^--j-/)
  })

  it('matches and filters token queries', () => {
    const item = { name: '--j-primary', kind: 'color', role: 'Primary action' }
    expect(matchesQuery(item, '')).toBe(true)
    expect(matchesQuery(item, 'primary')).toBe(true)
    expect(matchesQuery(item, 'danger')).toBe(false)
    expect(matchesQuery({ name: '--j-radius', kind: 'radius' }, 'radius')).toBe(true)

    const items = [
      item,
      { name: '--j-danger', kind: 'color', role: 'Danger' },
      { name: '--j-radius', kind: 'radius', role: 'Default radius' },
    ]
    expect(filterItems(items, 'danger')).toHaveLength(1)
    expect(filterGroups(tokenGroups, 'space-3').every((group) => group.items.length > 0)).toBe(true)
    expect(filterGroups(tokenGroups, 'zzz-missing')).toEqual([])
  })

  it('builds swatch styles for each token kind', () => {
    expect(swatchStyle({ name: '--j-primary', kind: 'color' })).toContain('--docs-token-fill:var(--j-primary)')
    expect(swatchStyle({ name: '--j-radius', kind: 'radius' })).toContain('border-radius:var(--j-radius)')
    expect(swatchStyle({ name: '--j-shadow', kind: 'shadow' })).toContain('box-shadow:var(--j-shadow)')
    expect(swatchStyle({ name: '--j-focus', kind: 'focus' })).toContain('box-shadow:var(--j-focus)')
    expect(swatchStyle({ name: '--j-space-3', kind: 'space' })).toContain('--docs-token-space:var(--j-space-3)')
    expect(swatchStyle({ name: '--j-ease-out', kind: 'motion' })).toContain('--docs-token-ease:var(--j-ease-out)')
    expect(swatchStyle({ name: '--j-duration-fast', kind: 'motion' })).toContain('--docs-token-motion:var(--j-duration-fast)')
    expect(swatchStyle({ name: '--j-font', kind: 'font' })).toContain('--docs-token-font:var(--j-font)')
  })

  it('reads computed token values', () => {
    document.documentElement.style.setProperty('--j-primary', ' #189030 ')
    expect(readToken('--j-primary')).toBe('#189030')

    const original = globalThis.getComputedStyle
    vi.stubGlobal('getComputedStyle', undefined)
    expect(readToken('--j-primary')).toBe('')
    vi.stubGlobal('getComputedStyle', original)
  })

  it('copies token names to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    await expect(copyToken('--j-primary')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('--j-primary')

    writeText.mockRejectedValue(new Error('denied'))
    await expect(copyToken('--j-primary')).resolves.toBe(false)
  })
})
