import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
})

// Service-role client bypasses RLS — never expose this key to the browser.
const getSupabase = () => {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

/**
 * POST /api/checkout
 *
 * Body: {
 *   items: Array<{ id: string|number, name: string, price: number, image: string, quantity: number }>
 * }
 *
 * Returns: { url: string }  — Stripe-hosted checkout URL to redirect the browser to.
 */
export default async function handler(req, res) {
  // CORS headers for local dev (Vercel handles this in prod automatically)
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin ?? '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items } = req.body ?? {}

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty.' })
  }

  // ── Price validation ────────────────────────────────────────────────────────
  // If Supabase is configured, fetch authoritative prices from the DB so the
  // client cannot manipulate unit_amount values.
  let authoritative = null
  const supabase = getSupabase()

  if (supabase) {
    const ids = items.map((i) => String(i.id))
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('id, name, price, image_url, in_stock')
      .in('id', ids)

    if (error) {
      console.error('Supabase fetch error:', error)
      return res.status(500).json({ error: 'Could not verify product prices.' })
    }

    const outOfStock = dbProducts.filter((p) => !p.in_stock)
    if (outOfStock.length > 0) {
      return res.status(400).json({
        error: 'One or more items are out of stock.',
        items: outOfStock.map((p) => p.name),
      })
    }

    authoritative = Object.fromEntries(dbProducts.map((p) => [String(p.id), p]))
  }

  // ── Build Stripe line items ─────────────────────────────────────────────────
  let lineItems
  try {
    lineItems = items.map((item) => {
      const db = authoritative?.[String(item.id)]

      // Use DB price when available; fall back to client price in dev/demo mode.
      const unitPrice = db ? db.price : item.price
      const name      = db ? db.name  : item.name
      const image     = db ? db.image_url : item.image

      if (!unitPrice || unitPrice <= 0) {
        throw new Error(`Invalid price for "${name}".`)
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name,
            ...(image ? { images: [image] } : {}),
            metadata: { product_id: String(item.id) },
          },
          unit_amount: Math.round(unitPrice * 100), // cents
        },
        quantity: item.quantity,
      }
    })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }

  // ── Create Stripe Checkout Session ──────────────────────────────────────────
  const origin = req.headers.origin ?? `https://${req.headers.host}`

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${origin}/cart?cancelled=1`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'AU'],
      },
      billing_address_collection: 'auto',
      payment_method_types: ['card'],
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 min
      metadata: {
        item_count: String(items.reduce((s, i) => s + i.quantity, 0)),
      },
    })

    return res.status(200).json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: err.message })
  }
}
