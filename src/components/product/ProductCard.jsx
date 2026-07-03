import { Link } from 'react-router-dom'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice, calcDiscount } from '@/utils/format'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!product.inStock) return
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggle(product)
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: wishlisted ? '💔' : '❤️',
    })
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Overlays */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge label={product.badge} />
        </div>

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100 duration-150"
          aria-label="Toggle wishlist"
        >
          {wishlisted
            ? <HeartSolid className="w-4 h-4 text-red-500" />
            : <HeartIcon className="w-4 h-4 text-gray-600" />}
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[11px] font-semibold text-indigo-600 tracking-widest uppercase mb-1.5">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-gray-900 text-[15px]">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-[11px] text-red-500 font-semibold">
                  -{calcDiscount(product.originalPrice, product.price)}%
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-8 h-8 flex items-center justify-center bg-gray-900 hover:bg-gray-700 disabled:bg-gray-200 text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Link>
  )
}
