import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '@/hooks/useProducts'
import FilterBar from '@/components/product/FilterBar'
import ProductGrid from '@/components/product/ProductGrid'

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl overflow-hidden mb-12 text-white px-8 py-16 text-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative">
        <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
          Summer Sale — Up to 40% off
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
          Shop Smarter,<br />Live Better
        </h1>
        <p className="text-indigo-100 text-lg max-w-lg mx-auto mb-8">
          Discover curated products across electronics, fashion, home, and more — delivered fast.
        </p>
        <a href="#products" className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors">
          Shop Now
        </a>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const { products, search, setSearch, category, setCategory, sortBy, setSortBy } = useProducts()

  useEffect(() => {
    const q = searchParams.get('search')
    if (q) setSearch(q)
  }, [searchParams, setSearch])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero />
      <section id="products">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {search ? `Results for "${search}"` : 'All Products'}
          </h2>
          <span className="text-sm text-gray-500">{products.length} products</span>
        </div>
        <FilterBar category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} />
        <ProductGrid products={products} />
      </section>
    </div>
  )
}
