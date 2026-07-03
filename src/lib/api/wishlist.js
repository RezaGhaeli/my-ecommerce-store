import { supabase } from '@/lib/supabase'

/** Fetch all wishlist items for the authenticated user. */
export async function getWishlistItems() {
  const { data, error } = await supabase
    .from('wishlist_items')
    .select(`
      id,
      created_at,
      product:products (
        id, name, price, original_price, category, image_url, badge, in_stock, rating, review_count
      )
    `)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/**
 * Add a product to the wishlist.
 * Silently ignores if it already exists (unique constraint).
 * @param {string} productId
 */
export async function addToWishlist(productId) {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('wishlist_items')
    .upsert({ user_id: user.id, product_id: productId }, { onConflict: 'user_id,product_id', ignoreDuplicates: true })
  if (error) throw error
}

/**
 * Remove a product from the wishlist.
 * @param {string} productId
 */
export async function removeFromWishlist(productId) {
  const { data: { user } } = await supabase.auth.getUser()
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)
  if (error) throw error
}
