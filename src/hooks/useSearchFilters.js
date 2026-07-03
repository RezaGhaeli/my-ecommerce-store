import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '@/data/products'

const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)))

export function useSearchFilters() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE])
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  const activeFilterCount =
    categories.length +
    (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  const filtered = useMemo(() => {
    let result = products

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }

    if (categories.length > 0) {
      result = result.filter((p) => categories.includes(p.category))
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating)
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating)
      case 'reviews':
        return [...result].sort((a, b) => b.reviewCount - a.reviewCount)
      default:
        return result
    }
  }, [query, categories, priceRange, minRating, inStockOnly, sortBy])

  const clearAll = () => {
    setCategories([])
    setPriceRange([0, MAX_PRICE])
    setMinRating(0)
    setInStockOnly(false)
  }

  const toggleCategory = (cat) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )

  return {
    query, setQuery,
    categories, toggleCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    inStockOnly, setInStockOnly,
    sortBy, setSortBy,
    filtered,
    activeFilterCount,
    clearAll,
    maxPrice: MAX_PRICE,
  }
}
