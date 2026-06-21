/**
 * Format large numbers: 125000 → "125K"
 */
export function formatNumber(n) {
  if (!n) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(0) + 'K'
  return n.toLocaleString('fa-IR')
}

/**
 * Map English manga status to Farsi
 */
export function statusFa(status) {
  const map = {
    'Publishing':     'در حال انتشار',
    'Finished':       'تمام شده',
    'On Hiatus':      'متوقف',
    'Discontinued':   'منتشر نمی‌شود',
    'Not yet published': 'منتشر نشده',
  }
  return map[status] ?? status ?? '—'
}

/**
 * Get Tailwind color classes for status badge
 */
export function statusColor(status) {
  const map = {
    'Publishing':  'bg-green-500/10 border-green-500/30 text-green-400',
    'Finished':    'bg-blue-500/10  border-blue-500/30  text-blue-400',
    'On Hiatus':   'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  }
  return map[status] ?? 'bg-gray-500/10 border-gray-500/30 text-gray-400'
}

/**
 * Truncate text to maxLength with ellipsis
 */
export function truncate(text, maxLength = 150) {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
