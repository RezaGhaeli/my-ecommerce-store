import { Link } from 'react-router-dom'
import { ShoppingBagIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/hooks/useCart'
import CartItem from '@/components/cart/CartItem'
import Button from '@/components/ui/Button'
import SEO from '@/components/SEO'
import { formatPrice } from '@/utils/format'

function OrderSummary({ subtotal, shipping, tax, grandTotal, freeShippingRemaining, startCheckout, isCheckingOut, checkoutError }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
      <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? <span className="text-emerald-600 font-medium">Free</span>
              : formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-[15px]">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {freeShippingRemaining > 0 && (
        <div className="mt-4 bg-indigo-50 rounded-xl px-3 py-2.5">
          <p className="text-xs text-indigo-700 font-medium">
            Add <strong>{formatPrice(freeShippingRemaining)}</strong> more for free shipping
          </p>
          <div className="mt-1.5 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.min(100, ((50 - freeShippingRemaining) / 50) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {checkoutError && (
        <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
          <ExclamationCircleIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-700">{checkoutError}</p>
        </div>
      )}

      <button
        onClick={startCheckout}
        disabled={isCheckingOut}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer"
      >
        {isCheckingOut ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Redirecting to Stripe…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            Pay with Stripe
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Secured by{' '}
        <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
          Stripe
        </a>
        {' '}· SSL encrypted
      </p>

      <Link to="/" className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-3 transition-colors">
        ← Continue Shopping
      </Link>
    </div>
  )
}

export default function CartPage() {
  const {
    items, clearCart,
    subtotal, shipping, tax, grandTotal, freeShippingRemaining,
    startCheckout, isCheckingOut, checkoutError,
  } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <SEO title="Your Cart" description="Review your cart and proceed to checkout." noIndex />
        <ShoppingBagIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
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
      <SEO title="Your Cart" description="Review your cart and proceed to secure Stripe checkout." noIndex />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Shopping Cart
          <span className="ml-2 text-base font-normal text-gray-400">({items.length} item{items.length !== 1 ? 's' : ''})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          grandTotal={grandTotal}
          freeShippingRemaining={freeShippingRemaining}
          startCheckout={startCheckout}
          isCheckingOut={isCheckingOut}
          checkoutError={checkoutError}
        />
      </div>
    </div>
  )
}
