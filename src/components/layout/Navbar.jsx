import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCartIcon, HeartIcon, MagnifyingGlassIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect, useRef } from 'react'
import { categories } from '@/data/products'
import clsx from 'clsx'

const navCategories = categories.filter((c) => c !== 'All')

export default function Navbar() {
  const items = useCartStore((s) => s.items)
  const wishlist = useWishlistStore((s) => s.items)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const menuRef = useRef(null)
  const { isAuthenticated, displayName, initials, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    setUserMenuOpen(false)
    await signOut()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="sticky top-0 z-40">
      {/* Announcement bar */}
      {announcementVisible && (
        <div className="bg-gray-900 text-white text-xs font-medium text-center py-2.5 px-4 flex items-center justify-center gap-3">
          <span>
            ✦ Free shipping on orders over $50 — <span className="underline underline-offset-2 cursor-pointer">Shop the summer sale</span>
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 p-0.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main nav */}
      <header className={clsx(
        'bg-white/95 backdrop-blur-md border-b transition-shadow duration-200',
        scrolled ? 'border-gray-200 shadow-sm' : 'border-gray-100'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-6">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2">
              <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tight">SF</span>
              </div>
              <span className="font-semibold text-[15px] text-gray-900 tracking-tight hidden sm:block">ShopFlow</span>
            </Link>

            {/* Category nav links */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1">
              {navCategories.map((cat) => (
                <Link
                  key={cat}
                  to={`/search?q=&category=${cat}`}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  {cat}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Search toggle */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products…"
                      className="w-52 pl-9 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-1 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
                </button>
              )}

              <Link
                to="/wishlist"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <HeartIcon className="w-5 h-5 text-gray-600" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cart"
              >
                <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-gray-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Auth: avatar dropdown or sign-in link */}
              {isAuthenticated ? (
                <div className="relative ml-1" ref={menuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer select-none"
                    aria-label="Account menu"
                  >
                    {initials || <UserCircleIcon className="w-4 h-4" />}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg py-1 z-50">
                      <div className="px-4 py-2.5 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-900 truncate">{displayName}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserCircleIcon className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <HeartIcon className="w-4 h-4" />
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:flex ml-1 items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
