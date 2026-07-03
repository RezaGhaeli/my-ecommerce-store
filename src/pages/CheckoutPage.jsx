import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/utils/format'

function Field({ label, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  )
}

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false)
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const navigate = useNavigate()
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping = total > 50 ? 0 : 9.99
  const tax = total * 0.08

  if (items.length === 0 && !submitted) {
    navigate('/cart')
    return null
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircleIcon className="w-20 h-20 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <Link to="/"><Button size="lg">Continue Shopping</Button></Link>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearCart()
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First Name" placeholder="John" required />
              <Field label="Last Name" placeholder="Doe" required />
              <Field label="Email" type="email" placeholder="john@example.com" required />
              <Field label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Street Address" placeholder="123 Main St" required />
              </div>
              <Field label="City" placeholder="New York" required />
              <Field label="State" placeholder="NY" required />
              <Field label="ZIP Code" placeholder="10001" required />
              <Field label="Country" placeholder="United States" required />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Payment</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Card Number" placeholder="1234 5678 9012 3456" required />
              </div>
              <Field label="Expiry Date" placeholder="MM/YY" required />
              <Field label="CVV" placeholder="123" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm text-gray-600">
                <span className="truncate mr-2">{i.name} ×{i.quantity}</span>
                <span className="flex-shrink-0">{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>{formatPrice(total + shipping + tax)}</span>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full mt-6">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  )
}
