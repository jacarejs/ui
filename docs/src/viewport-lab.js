export const tapRiverChecks = [
  {
    id: 'open-close',
    label: 'Open / close (tap + Escape for overlays)',
  },
  {
    id: 'choose-confirm',
    label: 'Choose a value / confirm / cancel',
  },
  {
    id: 'scroll-gesture',
    label: 'Page scroll does not capture the wrong gesture',
  },
  {
    id: 'hit-target',
    label: 'Targets ≥ 44×44 CSS px (or padded hit area)',
  },
  {
    id: 'zoom-200',
    label: 'Works at 200% zoom',
  },
  {
    id: 'orientation',
    label: 'Portrait and landscape',
  },
  {
    id: 'virtual-keyboard',
    label: 'Virtual keyboard does not hide the focused field',
  },
  {
    id: 'no-hover',
    label: 'Actions are discoverable without hover',
  },
]

export const viewportWidths = [
  { id: '320', label: '320', width: 320, blurb: 'Small phone' },
  { id: '390', label: '390', width: 390, blurb: 'Common phone' },
  { id: '768', label: '768', width: 768, blurb: 'Tablet portrait' },
  { id: 'full', label: 'Fluid', width: null, blurb: 'Stage width' },
]

export const VIEWPORT_CHECK_KEY = 'jui-viewport-lab-checks'

export function readViewportChecks() {
  if (typeof localStorage === 'undefined') return {}
  try {
    const raw = localStorage.getItem(VIEWPORT_CHECK_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function writeViewportChecks(map) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(VIEWPORT_CHECK_KEY, JSON.stringify(map))
}
