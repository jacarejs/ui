import { pulse } from '@jacare/core'
import { read } from './utils.js'

export const SVG_NS = 'http://www.w3.org/2000/svg'

export function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function ensureChartTip(host) {
  if (!host) return null
  let tip = host.__juiChartTip
  if (tip?.isConnected) return tip
  tip = document.createElement('div')
  tip.className = 'jui-chart-tip'
  tip.hidden = true
  tip.setAttribute('role', 'tooltip')
  const scope = host.getAttribute?.('data-jacare-s') || host.closest?.('[data-jacare-s]')?.getAttribute('data-jacare-s')
  if (scope) tip.setAttribute('data-jacare-s', scope)
  tip.style.cssText =
    'position:absolute;z-index:5;max-width:min(16rem,70%);padding:0.35rem 0.55rem;border:1px solid var(--j-border);border-radius:var(--j-radius-sm);background:var(--j-surface-2);color:var(--j-text);box-shadow:var(--j-shadow);font-size:0.75rem;font-weight:600;line-height:1.3;pointer-events:none;white-space:nowrap'
  host.appendChild(tip)
  host.__juiChartTip = tip
  return tip
}

function placeChartTip(host, tip, clientX, clientY) {
  if (!host || !tip) return
  const bounds = host.getBoundingClientRect()
  const x = clientX - bounds.left
  const y = clientY - bounds.top
  const maxLeft = Math.max(8, bounds.width - tip.offsetWidth - 8)
  const left = Math.min(maxLeft, Math.max(8, x + 12))
  const top = Math.max(8, y - tip.offsetHeight - 10)
  tip.style.left = `${left}px`
  tip.style.top = `${top}px`
}

export function armChartTips(host, svg) {
  if (!host || !svg || typeof document === 'undefined') return
  const tip = ensureChartTip(host)
  const nodes = svg.querySelectorAll('[data-jui-tip]')
  for (const node of nodes) {
    if (node.__juiTipBound) continue
    node.__juiTipBound = true
    node.style.cursor = 'pointer'
    node.addEventListener('pointerenter', (event) => {
      const text = node.getAttribute('data-jui-tip') || ''
      if (!text) return
      tip.textContent = text
      tip.hidden = false
      placeChartTip(host, tip, event.clientX, event.clientY)
    })
    node.addEventListener('pointermove', (event) => {
      if (tip.hidden) return
      placeChartTip(host, tip, event.clientX, event.clientY)
    })
    node.addEventListener('pointerleave', () => {
      tip.hidden = true
    })
  }
}

export function paintChartSvg(host, { width, height, label, html }) {
  if (!host || typeof document === 'undefined') return null
  let svg = host.__juiChartSvg
  if (!svg?.isConnected) {
    svg = document.createElementNS(SVG_NS, 'svg')
    const tip = host.__juiChartTip
    host.replaceChildren(svg)
    if (tip) host.appendChild(tip)
    host.__juiChartSvg = svg
  }
  const w = Math.max(120, Math.round(Number(width) || 420))
  const h = Math.max(100, Math.round(Number(height) || 260))
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', String(label || 'Chart'))
  svg.innerHTML = html || ''
  armChartTips(host, svg)
  return svg
}

export const CHART_COLORS = [
  'var(--j-primary)',
  '#0f766e',
  '#d97706',
  '#1f6feb',
  '#be185d',
  '#7c3aed',
  '#15803d',
  '#b45309',
]

export function num(value, fallback = 0) {
  const next = Number(read(value))
  return Number.isFinite(next) ? next : fallback
}

export function colorAt(index, colorsProp) {
  const custom = read(colorsProp)
  const palette = Array.isArray(custom) && custom.length ? custom.map(String) : CHART_COLORS
  return palette[index % palette.length]
}

export function sizeOf(widthProp, heightProp, fallbackW = 420, fallbackH = 260) {
  return {
    width: Math.max(120, Math.round(num(widthProp, fallbackW))),
    height: Math.max(100, Math.round(num(heightProp, fallbackH))),
  }
}

export function chartLayoutWidth(emitFn) {
  if (!emitFn.__juiChartLayoutWidth) {
    emitFn.__juiChartLayoutWidth = pulse(0)
  }
  return emitFn.__juiChartLayoutWidth
}

export function resolveChartWidth(widthProp, emitFn, fallbackW = 480) {
  const measured = Math.round(Number(chartLayoutWidth(emitFn)()) || 0)
  if (measured >= 120) return measured
  return sizeOf(widthProp, null, fallbackW, 280).width
}

export function padOf(paddingProp) {
  const raw = read(paddingProp)
  if (raw && typeof raw === 'object') {
    return {
      top: num(raw.top, 24),
      right: num(raw.right, 20),
      bottom: num(raw.bottom, 36),
      left: num(raw.left, 44),
    }
  }
  const all = num(paddingProp, 0)
  if (all > 0) return { top: all, right: all, bottom: all, left: all }
  return { top: 24, right: 20, bottom: 36, left: 44 }
}

export function asArray(value) {
  const next = read(value)
  return Array.isArray(next) ? next : []
}

export function pieSlices(dataProp, colorsProp) {
  const list = asArray(dataProp)
    .map((item, index) => {
      if (item == null || typeof item !== 'object') {
        return { key: String(index), label: String(item ?? index), value: num(item, 0), color: colorAt(index, colorsProp) }
      }
      return {
        key: String(item.key ?? item.label ?? index),
        label: String(item.label ?? item.name ?? index),
        value: Math.max(0, num(item.value, 0)),
        color: item.color ? String(item.color) : colorAt(index, colorsProp),
      }
    })
    .filter((item) => item.value > 0)
  const total = list.reduce((sum, item) => sum + item.value, 0) || 1
  let angle = -Math.PI / 2
  return list.map((item) => {
    const sweep = (item.value / total) * Math.PI * 2
    const start = angle
    const end = angle + sweep
    angle = end
    return { ...item, total, start, end, mid: start + sweep / 2, pct: (item.value / total) * 100 }
  })
}

export function polarPoint(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  }
}

export function arcPath(cx, cy, radius, start, end, inner = 0) {
  const large = end - start > Math.PI ? 1 : 0
  const s = polarPoint(cx, cy, radius, start)
  const e = polarPoint(cx, cy, radius, end)
  if (inner <= 0) {
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y} Z`
  }
  const si = polarPoint(cx, cy, inner, start)
  const ei = polarPoint(cx, cy, inner, end)
  return [
    `M ${s.x} ${s.y}`,
    `A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`,
    `L ${ei.x} ${ei.y}`,
    `A ${inner} ${inner} 0 ${large} 0 ${si.x} ${si.y}`,
    'Z',
  ].join(' ')
}

export function cartesianModel(dataProp) {
  const raw = read(dataProp)
  if (!raw || typeof raw !== 'object') {
    return { categories: [], series: [] }
  }
  if (Array.isArray(raw)) {
    return {
      categories: raw.map((item, index) => String(item?.label ?? item?.x ?? index + 1)),
      series: [{
        name: 'Series',
        data: raw.map((item) => num(item?.value ?? item?.y ?? item, 0)),
        color: raw[0]?.color,
      }],
    }
  }
  const categories = asArray(raw.categories ?? raw.labels).map(String)
  const series = asArray(raw.series).map((item, index) => ({
    key: String(item?.key ?? item?.name ?? index),
    name: String(item?.name ?? `Series ${index + 1}`),
    data: asArray(item?.data).map((value) => num(value, 0)),
    color: item?.color ? String(item.color) : '',
  }))
  return { categories, series }
}

export function extent(values, pad = 0.08) {
  const list = values.filter((value) => Number.isFinite(value))
  if (!list.length) return { min: 0, max: 1 }
  let min = Math.min(...list)
  let max = Math.max(...list)
  if (min === max) {
    min -= 1
    max += 1
  }
  const span = max - min
  return {
    min: min - span * pad,
    max: max + span * pad,
  }
}

export function scaleLinear(domainMin, domainMax, rangeMin, rangeMax) {
  const d0 = domainMin
  const d1 = domainMax === domainMin ? domainMin + 1 : domainMax
  return (value) => rangeMin + ((value - d0) / (d1 - d0)) * (rangeMax - rangeMin)
}

export function niceTicks(min, max, count = 4) {
  const span = max - min || 1
  const step = span / Math.max(count, 1)
  const magnitude = 10 ** Math.floor(Math.log10(step))
  const residual = step / magnitude
  const niceStep = residual >= 5 ? 5 * magnitude : residual >= 2 ? 2 * magnitude : magnitude
  const start = Math.ceil(min / niceStep) * niceStep
  const ticks = []
  for (let value = start; value <= max + niceStep * 0.01; value += niceStep) {
    ticks.push(Number(value.toFixed(6)))
  }
  return ticks.length ? ticks : [min, max]
}

export function linePath(points) {
  if (!points.length) return ''
  return points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ')
}

export function curvePath(points) {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`
  let path = `M ${points[0].x} ${points[0].y}`
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index === 0 ? 0 : index - 1]
    const p1 = points[index]
    const p2 = points[index + 1]
    const p3 = points[index + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  return path
}

export function areaPath(points, baselineY) {
  if (!points.length) return ''
  const line = linePath(points)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`
}

export function stackedSeries(model, colorsProp) {
  const { categories, series } = model
  const count = categories.length
  const stacked = []
  for (let serieIndex = 0; serieIndex < series.length; serieIndex += 1) {
    const serie = series[serieIndex]
    const points = []
    for (let index = 0; index < count; index += 1) {
      const prev = serieIndex === 0 ? 0 : stacked[serieIndex - 1].points[index].y1
      const value = num(serie.data[index], 0)
      points.push({
        xIndex: index,
        y0: prev,
        y1: prev + value,
        value,
      })
    }
    stacked.push({
      ...serie,
      color: serie.color || colorAt(serieIndex, colorsProp),
      points,
    })
  }
  return stacked
}

export function scatterPoints(dataProp, colorsProp) {
  const raw = read(dataProp)
  if (Array.isArray(raw)) {
    return [{
      key: 'series',
      name: 'Series',
      color: colorAt(0, colorsProp),
      points: raw.map((item, index) => ({
        key: String(item?.key ?? index),
        x: num(item?.x ?? item?.[0], 0),
        y: num(item?.y ?? item?.[1], 0),
        size: Math.max(4, num(item?.size ?? item?.r ?? item?.[2], 8)),
        label: String(item?.label ?? ''),
      })),
    }]
  }
  return asArray(raw?.series).map((serie, serieIndex) => ({
    key: String(serie?.key ?? serie?.name ?? serieIndex),
    name: String(serie?.name ?? `Series ${serieIndex + 1}`),
    color: serie?.color ? String(serie.color) : colorAt(serieIndex, colorsProp),
    points: asArray(serie?.data ?? serie?.points).map((item, index) => ({
      key: String(item?.key ?? index),
      x: num(item?.x ?? item?.[0], 0),
      y: num(item?.y ?? item?.[1], 0),
      size: Math.max(4, num(item?.size ?? item?.r ?? item?.[2], 8)),
      label: String(item?.label ?? ''),
    })),
  }))
}

export function radarModel(dataProp, colorsProp) {
  const raw = read(dataProp) || {}
  const axes = asArray(raw.axes ?? raw.categories).map(String)
  const series = asArray(raw.series).map((serie, index) => ({
    key: String(serie?.key ?? serie?.name ?? index),
    name: String(serie?.name ?? `Series ${index + 1}`),
    color: serie?.color ? String(serie.color) : colorAt(index, colorsProp),
    data: asArray(serie?.data).map((value) => num(value, 0)),
  }))
  return { axes, series }
}

export function heatmapModel(dataProp) {
  const raw = read(dataProp) || {}
  if (Array.isArray(raw)) {
    const xs = [...new Set(raw.map((item) => String(item.x)))]
    const ys = [...new Set(raw.map((item) => String(item.y)))]
    const map = new Map(raw.map((item) => [`${item.x}::${item.y}`, num(item.value, 0)]))
    return {
      x: xs,
      y: ys,
      values: ys.map((y) => xs.map((x) => map.get(`${x}::${y}`) ?? 0)),
    }
  }
  return {
    x: asArray(raw.x ?? raw.columns).map(String),
    y: asArray(raw.y ?? raw.rows).map(String),
    values: asArray(raw.values ?? raw.data).map((row) => asArray(row).map((value) => num(value, 0))),
  }
}

export function treemapLayout(nodes, x, y, width, height) {
  const list = nodes
    .map((node, index) => ({
      key: String(node.key ?? node.label ?? index),
      label: String(node.label ?? node.name ?? index),
      value: Math.max(0, num(node.value, 0)),
      color: node.color ? String(node.color) : '',
      children: Array.isArray(node.children) ? node.children : [],
    }))
    .filter((node) => node.value > 0)
  const total = list.reduce((sum, node) => sum + node.value, 0) || 1
  const rects = []
  let cursor = x
  let remaining = width
  list.forEach((node, index) => {
    const w = index === list.length - 1 ? remaining : (node.value / total) * width
    rects.push({ ...node, x: cursor, y, width: Math.max(0, w), height })
    cursor += w
    remaining -= w
  })
  return rects
}

export function candlesticks(dataProp) {
  return asArray(dataProp).map((item, index) => {
    const open = num(item?.open, 0)
    const close = num(item?.close, 0)
    const high = num(item?.high, Math.max(open, close))
    const low = num(item?.low, Math.min(open, close))
    return {
      key: String(item?.key ?? item?.label ?? item?.date ?? index),
      label: String(item?.label ?? item?.date ?? index + 1),
      open,
      high,
      low,
      close,
      up: close >= open,
    }
  })
}

export function waterfallSteps(dataProp, colorsProp) {
  const list = asArray(dataProp)
  let running = 0
  return list.map((item, index) => {
    const label = String(item?.label ?? index + 1)
    const type = String(item?.type || (index === list.length - 1 ? 'total' : 'auto'))
    let value = num(item?.value, 0)
    let y0 = 0
    let y1 = 0
    if (type === 'total') {
      y0 = 0
      y1 = running
      value = running
    } else {
      y0 = running
      y1 = running + value
      running = y1
    }
    const tone = type === 'total' ? 'total' : value >= 0 ? 'up' : 'down'
    const color = item?.color
      ? String(item.color)
      : tone === 'total'
        ? colorAt(0, colorsProp)
        : tone === 'up'
          ? '#15803d'
          : '#be185d'
    return {
      key: String(item?.key ?? label),
      label,
      value,
      y0,
      y1,
      tone,
      color,
    }
  })
}

export function formatNumber(value, digits = 0) {
  const next = Number(value)
  if (!Number.isFinite(next)) return ''
  return next.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  })
}

export function mixHeat(t) {
  const p = Math.max(0, Math.min(1, t))
  const r = Math.round(254 - p * 180)
  const g = Math.round(243 - p * 120)
  const b = Math.round(199 - p * 40)
  return `rgb(${r}, ${g}, ${b})`
}
