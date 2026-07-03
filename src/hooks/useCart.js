import { useState, useCallback } from 'react'
import { useCartStore } from '@/store/cartStore'

const SHIPPING_THRESHOLD = 50
const SHIPPING_RATE      = 9.99
const TAX_RATE           = 0.08

/**
 * useCart — cart state + derived totals + Stripe checkout.
 *
 * Wraps the Zustand cartStore and adds:
 *   - subtotal / shipping / tax / grandTotal
 *   - freeShippingRemaining
 *   - startCheckout() → calls /api/checkout and redirects to Stripe
 *   - isCheckingOut, checkoutError
 */
export function useCart() {
  const items          = useCartStore((s) => s.items)
  const addItem        = useCartStore((s) => s.addItem)
  const removeItem     = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart      = useCartStore((s) => s.clearCart)

  const [isCheckingOut, setIsCheckingOut]   = useState(false)
  const [checkoutError, setCheckoutError]   = useState(null)

  // ── Derived totals ──────────────────────────────────────────────────────────
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal   = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const shipping   = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE
  const tax        = subtotal * TAX_RATE
  const grandTotal = subtotal + shipping + tax
  const freeShippingRemaining = Math.max(0, SHIPPING_THRESHOLD - subtotal)

  // ── Stripe checkout ─────────────────────────────────────────────────────────
  const startCheckout = useCallback(async () => {
    if (items.length === 0) return
    setIsCheckingOut(true)
    setCheckoutError(null)

    try {
      const payload = items.map((item) => ({
        id:       item.id,
        name:     item.name,
        price:    item.price,
        image:    item.image,
        quantity: item.quantity,
      }))

      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items: payload }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Checkout failed. Please try again.')
      }

      // Redirect the browser to Stripe's hosted checkout page.
      window.location.href = data.url
    } catch (err) {
      setCheckoutError(err.message)
      setIsCheckingOut(false)
    }
  }, [items])

  return {
    // Cart state
    items,
    totalItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // Totals
    subtotal,
    shipping,
    tax,
    grandTotal,
    freeShippingRemaining,

    // Checkout
    startCheckout,
    isCheckingOut,
    checkoutError,
  }
}
