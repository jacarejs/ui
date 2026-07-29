import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  VIEWPORT_CHECK_KEY,
  readViewportChecks,
  tapRiverChecks,
  viewportWidths,
  writeViewportChecks,
} from '../docs/src/viewport-lab.js'
import { densityExportCss, densityModes } from '../docs/src/density-preview.js'
import { motionDefaults, motionExportCss, motionModes, easePresets } from '../docs/src/motion-lab.js'

afterEach(() => {
  localStorage.clear()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('viewport-lab helpers', () => {
  it('exposes device widths and Tap River checklist', () => {
    expect(viewportWidths.map((item) => item.id)).toEqual(['320', '390', '768', 'full'])
    expect(tapRiverChecks.length).toBe(8)
    expect(tapRiverChecks[0].id).toBe('open-close')
    expect(tapRiverChecks[0].label).toContain('Open / close')
  })

  it('persists checklist state', () => {
    expect(readViewportChecks()).toEqual({})
    writeViewportChecks({ 'open-close': true })
    expect(localStorage.getItem(VIEWPORT_CHECK_KEY)).toContain('open-close')
    expect(readViewportChecks()['open-close']).toBe(true)
    localStorage.setItem(VIEWPORT_CHECK_KEY, '{bad')
    expect(readViewportChecks()).toEqual({})
    localStorage.setItem(VIEWPORT_CHECK_KEY, JSON.stringify('nope'))
    expect(readViewportChecks()).toEqual({})
    localStorage.setItem(VIEWPORT_CHECK_KEY, JSON.stringify(null))
    expect(readViewportChecks()).toEqual({})
  })

  it('no-ops storage helpers when localStorage is unavailable', () => {
    const original = globalThis.localStorage
    vi.stubGlobal('localStorage', undefined)
    expect(readViewportChecks()).toEqual({})
    writeViewportChecks({ 'open-close': true })
    vi.stubGlobal('localStorage', original)
  })
})

describe('density-preview helpers', () => {
  it('lists density modes and exports apply snippet', () => {
    expect(densityModes.map((item) => item.id)).toEqual(['compact', 'comfortable', 'spacious'])
    expect(densityExportCss('compact')).toContain("applyDensity('compact')")
  })
})

describe('motion-lab helpers', () => {
  it('exports scrubbed motion CSS', () => {
    expect(motionDefaults.normal).toBe(200)
    expect(easePresets.length).toBe(3)
    expect(motionModes.map((item) => item.id)).toEqual(['system', 'full', 'reduce'])
    const css = motionExportCss({
      fast: 80,
      normal: 160,
      slow: 300,
      ease: 'linear',
      mode: 'reduce',
    })
    expect(css).toContain("applyMotion('reduce')")
    expect(css).toContain('--j-duration-fast: 80ms')
    expect(css).toContain('--j-duration-slow: 300ms')
    expect(css).toContain('--j-ease-out: linear')
    expect(css).toContain('prefers-reduced-motion')
  })
})
