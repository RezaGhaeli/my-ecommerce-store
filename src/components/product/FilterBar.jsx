import { categories } from '@/data/products'
import clsx from 'clsx'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function FilterBar({ category, setCategory, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5 mb-6 border-y border-gray-100">
      <div className="flex items-center gap-1.5 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer',
              c === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-xs font-medium border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
