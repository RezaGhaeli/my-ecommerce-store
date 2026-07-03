import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { categories as allCategories } from '@/data/products'
import { formatPrice } from '@/utils/format'
import clsx from 'clsx'

const ratingOptions = [4.5, 4, 3.5, 3]

function Section({ title, children }) {
  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  )
}

export default function FiltersSidebar({
  categories, toggleCategory,
  priceRange, setPriceRange,
  minRating, setMinRating,
  inStockOnly, setInStockOnly,
  activeFilterCount, clearAll,
  maxPrice,
  // mobile drawer
  mobileOpen, onClose,
}) {
  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-1 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-4 h-4 text-gray-500" />
          <span className="font-semibold text-gray-900">Filters</span>
          {activeFilterCount > 0 && (
            <span className="text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg cursor-pointer lg:hidden">
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="space-y-2">
          {allCategories.filter((c) => c !== 'All').map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{cat}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-gray-700">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <div className="relative h-5 flex items-center">
            <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
            <div
              className="absolute h-1.5 bg-indigo-500 rounded-full"
              style={{
                left: `${(priceRange[0] / maxPrice) * 100}%`,
                right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
              }}
            />
            <input
              type="range" min={0} max={maxPrice} step={5}
              value={priceRange[0]}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v < priceRange[1]) setPriceRange([v, priceRange[1]])
              }}
              className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-sm"
            />
            <input
              type="range" min={0} max={maxPrice} step={5}
              value={priceRange[1]}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v > priceRange[0]) setPriceRange([priceRange[0], v])
              }}
              className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number" min={0} max={priceRange[1]} value={priceRange[0]}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v >= 0 && v < priceRange[1]) setPriceRange([v, priceRange[1]])
              }}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Min"
            />
            <span className="text-gray-400 self-center">–</span>
            <input
              type="number" min={priceRange[0]} max={maxPrice} value={priceRange[1]}
              onChange={(e) => {
                const v = Number(e.target.value)
                if (v > priceRange[0] && v <= maxPrice) setPriceRange([priceRange[0], v])
              }}
              className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Max"
            />
          </div>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Minimum Rating">
        <div className="space-y-2">
          {ratingOptions.map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(minRating === r ? 0 : r)}
                onClick={() => { if (minRating === r) setMinRating(0) }}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
              />
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={clsx('w-3.5 h-3.5', s <= Math.floor(r) ? 'text-amber-400' : s - 0.5 === r ? 'text-amber-300' : 'text-gray-200')} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-600 ml-0.5">{r}+</span>
              </div>
            </label>
          ))}
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <div
            onClick={() => setInStockOnly(!inStockOnly)}
            className={clsx(
              'relative w-9 h-5 rounded-full transition-colors cursor-pointer',
              inStockOnly ? 'bg-indigo-600' : 'bg-gray-200'
            )}
          >
            <span className={clsx(
              'absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
              inStockOnly ? 'translate-x-4' : 'translate-x-0'
            )} />
          </div>
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </Section>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0">{content}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto p-5">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
