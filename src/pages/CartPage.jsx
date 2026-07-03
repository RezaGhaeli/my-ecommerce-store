import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/cart/CartItem'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/utils/format'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer">
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-emerald-600">Free</span> : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>{formatPrice(total + shipping + tax)}</span>
            </div>
          </div>

          {total <= 50 && (
            <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2 mt-4">
              Add {formatPrice(50 - total)} more for free shipping!
            </p>
          )}

          <Link to="/checkout" className="block mt-6">
            <Button size="lg" className="w-full">Proceed to Checkout</Button>
          </Link>
          <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
