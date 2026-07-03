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
    <Link to={`/product/${product.id}`} className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <Badge label={product.badge} />
        </div>
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow hover:bg-white transition-colors"
          aria-label="Toggle wishlist"
        >
          {wishlisted
            ? <HeartSolid className="w-4 h-4 text-red-500" />
            : <HeartIcon className="w-4 h-4 text-gray-500" />}
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs text-red-600 font-medium">-{calcDiscount(product.originalPrice, product.price)}%</span>
              </>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-lg transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCartIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  )
}
