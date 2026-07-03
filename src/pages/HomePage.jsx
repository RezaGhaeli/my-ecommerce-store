import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useProducts } from '@/hooks/useProducts'
import FilterBar from '@/components/product/FilterBar'
import ProductGrid from '@/components/product/ProductGrid'
import SEO from '@/components/SEO'

const trustItems = [
  { icon: '🚚', label: 'Free Shipping', sub: 'On all orders over $50' },
  { icon: '↩', label: '30-Day Returns', sub: 'No questions asked' },
  { icon: '🔒', label: 'Secure Checkout', sub: 'SSL encrypted payments' },
  { icon: '💬', label: '24/7 Support', sub: 'Here when you need us' },
]

const categoryCards = [
  { name: 'Electronics', emoji: '⚡', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  { name: 'Clothing',    emoji: '👕', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
  { name: 'Home',        emoji: '🏠', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  { name: 'Books',       emoji: '📚', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  { name: 'Sports',      emoji: '🏃', bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
]

function Hero() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-3.5 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Summer Sale — Up to 40% off</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-[-0.03em] mb-6">
              Find what<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                moves you.
              </span>
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed max-w-md mb-10">
              Curated products across electronics, fashion, home, and sport —
              each picked for quality and delivered fast.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
              >
                Shop All Products
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <a
                href="#products"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
              >
                Today's Picks
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-10 pt-10 border-t border-gray-100">
              <div>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">12k+</p>
                <p className="text-xs text-gray-500 mt-0.5">Happy customers</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">4.9</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900 tracking-tight">500+</p>
                <p className="text-xs text-gray-500 mt-0.5">Curated products</p>
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl" />
            <div className="relative grid grid-cols-2 gap-4 p-8">
              {[
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=300&h=300&fit=crop',
              ].map((src, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl overflow-hidden shadow-md ${i === 1 ? 'mt-6' : ''} ${i === 3 ? '-mt-6' : ''}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
          {trustItems.map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 py-5 px-6">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-1">Browse by</p>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Category</h2>
        </div>
        <Link to="/search" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors flex items-center gap-1">
          View all <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {categoryCards.map(({ name, emoji, bg, text, border }) => (
          <Link
            key={name}
            to={`/search?category=${name}`}
            className={`group flex flex-col items-center gap-2.5 p-4 ${bg} border ${border} rounded-2xl hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
          >
            <span className="text-3xl">{emoji}</span>
            <span className={`text-xs font-semibold ${text}`}>{name}</span>
          </Link>
        ))}
      </div>
    </section>
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
    <div className="bg-[#f8f8f6] min-h-screen">
      <SEO
        title="Shop Smarter, Live Better"
        description="Discover curated products across electronics, fashion, home, and sport — each picked for quality and delivered fast. Free shipping over $50."
        path="/"
      />
      <Hero />
      <TrustStrip />
      <Categories />

      {/* Products section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-1">
              {search ? 'Search results' : "Today's picks"}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {search ? `"${search}"` : 'Featured Products'}
            </h2>
          </div>
          <span className="text-sm text-gray-400">{products.length} products</span>
        </div>

        <FilterBar
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <ProductGrid products={products} />
      </section>

      {/* Bottom CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gray-900 rounded-3xl px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-1">Still looking?</h3>
            <p className="text-gray-400 text-sm">Use advanced search to filter by price, rating, and more.</p>
          </div>
          <Link
            to="/search"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Advanced Search
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
