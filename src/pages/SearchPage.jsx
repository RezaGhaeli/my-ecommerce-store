import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSearchFilters } from '@/hooks/useSearchFilters'
import FiltersSidebar from '@/components/product/FiltersSidebar'
import ProductGrid from '@/components/product/ProductGrid'
import SEO from '@/components/SEO'
import clsx from 'clsx'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]

function ActiveFilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-indigo-900 cursor-pointer">
        <XMarkIcon className="w-3 h-3" />
      </button>
    </span>
  )
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const inputRef = useRef(null)

  const {
    query, setQuery,
    categories, toggleCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    inStockOnly, setInStockOnly,
    sortBy, setSortBy,
    filtered,
    activeFilterCount,
    clearAll,
    maxPrice,
  } = useSearchFilters()

  // Sync query from URL param on mount
  useEffect(() => {
    const q = searchParams.get('q') || ''
    if (q) setQuery(q)
    inputRef.current?.focus()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={query ? `Search: "${query}"` : 'Search Products'}
        description={`Search ShopFlow's catalogue${query ? ` for "${query}"` : ''}. Filter by category, price, rating, and availability.`}
        path={`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}
      />
      {/* Search bar */}
      <div className="relative mb-6 max-w-2xl">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products by name or description…"
          className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <XMarkIcon className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {query ? `Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 lg:hidden px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            <FunnelIcon className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((c) => (
            <ActiveFilterChip key={c} label={c} onRemove={() => toggleCategory(c)} />
          ))}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <ActiveFilterChip
              label={`$${priceRange[0]} – $${priceRange[1]}`}
              onRemove={() => setPriceRange([0, maxPrice])}
            />
          )}
          {minRating > 0 && (
            <ActiveFilterChip label={`${minRating}+ stars`} onRemove={() => setMinRating(0)} />
          )}
          {inStockOnly && (
            <ActiveFilterChip label="In Stock" onRemove={() => setInStockOnly(false)} />
          )}
          <button
            onClick={clearAll}
            className="text-xs text-gray-500 hover:text-gray-800 underline cursor-pointer"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        <FiltersSidebar
          categories={categories} toggleCategory={toggleCategory}
          priceRange={priceRange} setPriceRange={setPriceRange}
          minRating={minRating} setMinRating={setMinRating}
          inStockOnly={inStockOnly} setInStockOnly={setInStockOnly}
          activeFilterCount={activeFilterCount} clearAll={clearAll}
          maxPrice={maxPrice}
          mobileOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
