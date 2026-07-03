import clsx from 'clsx'

const variants = {
  'Best Seller': 'bg-amber-100 text-amber-800',
  Sale: 'bg-red-100 text-red-700',
  New: 'bg-emerald-100 text-emerald-700',
  'Top Rated': 'bg-indigo-100 text-indigo-700',
}

export default function Badge({ label }) {
  if (!label) return null
  return (
    <span className={clsx('text-xs font-semibold px-2 py-0.5 rounded-full', variants[label] ?? 'bg-gray-100 text-gray-700')}>
      {label}
    </span>
  )
}
