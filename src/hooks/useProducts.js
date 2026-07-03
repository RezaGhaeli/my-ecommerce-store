import { useState, useMemo } from 'react'
import { products } from '@/data/products'

export function useProducts() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  const filtered = useMemo(() => {
    let result = products

    if (category !== 'All') {
      result = result.filter((p) => p.category === category)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...result].sort((a, b) => b.rating - a.rating)
      default:
        return result
    }
  }, [search, category, sortBy])

  return { products: filtered, search, setSearch, category, setCategory, sortBy, setSortBy }
}
