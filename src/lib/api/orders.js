import { supabase } from '@/lib/supabase'

/**
 * Create an order and its line items in a single transaction.
 *
 * @param {{
 *   items: Array<{ product_id: string, quantity: number, unit_price: number }>,
 *   shippingAddress: object,
 *   subtotal: number,
 *   shippingAmount: number,
 *   taxAmount: number,
 *   paymentIntent?: string,
 * }} payload
 */
export async function createOrder({ items, shippingAddress, subtotal, shippingAmount, taxAmount, paymentIntent }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be signed in to place an order.')

  const totalAmount = subtotal + shippingAmount + taxAmount

  // Insert order
  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert({
      user_id:          user.id,
      subtotal,
      shipping_amount:  shippingAmount,
      tax_amount:       taxAmount,
      total_amount:     totalAmount,
      shipping_address: shippingAddress,
      payment_intent:   paymentIntent ?? null,
      status:           'pending',
    })
    .select()
    .single()
  if (orderErr) throw orderErr

  // Insert line items
  const lineItems = items.map((item) => ({
    order_id:   order.id,
    product_id: item.product_id,
    quantity:   item.quantity,
    unit_price: item.unit_price,
  }))
  const { error: itemsErr } = await supabase.from('order_items').insert(lineItems)
  if (itemsErr) throw itemsErr

  return order
}

/** Fetch all orders for the authenticated user, newest first. */
export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, status, total_amount, created_at, shipping_address,
      order_items (
        id, quantity, unit_price,
        product:products (id, name, image_url)
      )
    `)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/**
 * Fetch a single order by id.
 * @param {string} orderId
 */
export async function getOrder(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id, quantity, unit_price,
        product:products (id, name, image_url, category)
      )
    `)
    .eq('id', orderId)
    .single()
  if (error) throw error
  return data
}
