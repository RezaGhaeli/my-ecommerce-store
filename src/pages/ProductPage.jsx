import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import StarRating from '@/components/ui/StarRating'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SEO from '@/components/SEO'
import { formatPrice, calcDiscount } from '@/utils/format'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const addItem = useCartStore((s) => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = product ? isWishlisted(product.id) : false

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product not found</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Back to shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = () => {
    toggle(product)
    toast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', { icon: wishlisted ? '💔' : '❤️' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={product.name}
        description={`${product.description} — ${product.inStock ? 'In stock' : 'Out of stock'}. ${product.rating}★ (${product.reviewCount.toLocaleString()} reviews).`}
        image={product.image}
        path={`/product/${product.id}`}
        type="product"
      />
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8">
        <ArrowLeftIcon className="w-4 h-4" />
        Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 shadow-sm">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge label={product.badge} />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-indigo-600 mb-1">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{product.name}</h1>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          <div className="flex items-baseline gap-3 mt-6 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded-full">
                  Save {calcDiscount(product.originalPrice, product.price)}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {product.inStock ? (
            <p className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              In Stock — Ready to ship
            </p>
          ) : (
            <p className="text-sm text-red-500 font-medium mb-6">Currently out of stock</p>
          )}

          <div className="flex gap-3">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" onClick={handleWishlist}>
              {wishlisted ? <HeartSolid className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            {[
              { icon: '🚚', label: 'Free Shipping', sub: 'On orders over $50' },
              { icon: '↩️', label: 'Easy Returns', sub: '30-day return policy' },
              { icon: '🔒', label: 'Secure Payment', sub: 'SSL encrypted checkout' },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <p className="text-xs font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
