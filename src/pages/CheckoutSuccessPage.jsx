import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import SEO from '@/components/SEO'

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const cleared   = useRef(false)
  const clearCart = useCartStore((s) => s.clearCart)

  // Clear the cart exactly once when arriving on this page.
  useEffect(() => {
    if (!cleared.current) {
      clearCart()
      cleared.current = true
    }
  }, [clearCart])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <SEO title="Order Confirmed" description="Your ShopFlow order has been placed successfully." noIndex />
      <div className="max-w-md w-full text-center">
        {/* Animated check */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-14 h-14 text-emerald-500" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-ping opacity-20" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
          Order confirmed!
        </h1>
        <p className="text-gray-500 mb-2">
          Thanks for your purchase. Stripe processed your payment and a receipt
          has been sent to your email.
        </p>

        {sessionId && (
          <p className="text-xs text-gray-400 font-mono mt-2 mb-8">
            Ref: {sessionId.slice(-12).toUpperCase()}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Continue Shopping
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link
            to="/wishlist"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm"
          >
            View Wishlist
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
          {[
            { icon: '📦', label: 'Processing', sub: 'Usually 1–2 business days' },
            { icon: '🚚', label: 'Shipping',   sub: 'Standard 3–5 days' },
            { icon: '✅', label: 'Delivered',  sub: 'Tracking sent via email' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="text-center">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-xs font-semibold text-gray-700">{label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
