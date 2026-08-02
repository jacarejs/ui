export const shareData = [
  { label: 'Direct', value: 44 },
  { label: 'Organic', value: 28 },
  { label: 'Referral', value: 18 },
  { label: 'Social', value: 10 },
]

export const trendData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    { name: 'Revenue', data: [42, 48, 51, 58, 62, 70] },
    { name: 'Cost', data: [28, 30, 33, 36, 38, 41] },
  ],
}

export const rankData = [
  { label: 'Product', value: 86 },
  { label: 'Sales', value: 72 },
  { label: 'Support', value: 64 },
  { label: 'Marketing', value: 51 },
]

export const scatterData = {
  series: [
    {
      name: 'Team A',
      data: [
        { x: 12, y: 28, size: 10 },
        { x: 22, y: 36, size: 16 },
        { x: 34, y: 24, size: 12 },
        { x: 48, y: 42, size: 20 },
      ],
    },
    {
      name: 'Team B',
      data: [
        { x: 18, y: 18, size: 8 },
        { x: 30, y: 32, size: 14 },
        { x: 40, y: 46, size: 22 },
        { x: 52, y: 38, size: 18 },
      ],
    },
  ],
}

export const radarData = {
  axes: ['Speed', 'Quality', 'Support', 'Features', 'Price'],
  series: [
    { name: 'Us', data: [80, 90, 70, 85, 60] },
    { name: 'Peer', data: [65, 75, 80, 70, 85] },
  ],
}

export const heatmapData = {
  x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  y: ['Morning', 'Afternoon', 'Evening'],
  values: [
    [12, 18, 22, 16, 10],
    [28, 34, 40, 36, 24],
    [16, 20, 18, 14, 12],
  ],
}

export const treemapData = [
  { label: 'Checkout', value: 42 },
  { label: 'Catalog', value: 28 },
  { label: 'Support', value: 18 },
  { label: 'Billing', value: 12 },
]

export const candleData = [
  { label: 'Mon', open: 120, high: 132, low: 118, close: 128 },
  { label: 'Tue', open: 128, high: 136, low: 122, close: 124 },
  { label: 'Wed', open: 124, high: 130, low: 116, close: 118 },
  { label: 'Thu', open: 118, high: 140, low: 117, close: 136 },
  { label: 'Fri', open: 136, high: 142, low: 130, close: 134 },
]

export const waterfallData = [
  { label: 'Start', value: 40 },
  { label: 'Sales', value: 28 },
  { label: 'Refunds', value: -12 },
  { label: 'Fees', value: -6 },
  { label: 'Total', type: 'total' },
]
