import { supabase } from '@/lib/supabase'

/** Fetch all cart items for the authenticated user, joined with product data. */
export async function getCartItems() {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      updated_at,
      product:products (
        id, name, price, original_price, category, image_url, badge, in_stock
      )
    `)
    .order('updated_at', { ascending: false })
  if (error) throw error
  return data
}

/**
 * Add a product to the cart (or increment quantity if it already exists).
 * @param {string} productId
 * @param {number} quantity
 */
export async function upsertCartItem(productId, quantity = 1) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('cart_items')
    .upsert(
      { user_id: user.id, product_id: productId, quantity },
      { onConflict: 'user_id,product_id', ignoreDuplicates: false }
    )
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Update quantity of an existing cart item.
 * @param {string} cartItemId
 * @param {number} quantity
 */
export async function updateCartItemQuantity(cartItemId, quantity) {
  if (quantity < 1) return removeCartItem(cartItemId)
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
  if (error) throw error
}

/** Remove a single cart item. */
export async function removeCartItem(cartItemId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
  if (error) throw error
}

/** Clear the entire cart for the authenticated user. */
export async function clearCart() {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id)
  if (error) throw error
}
