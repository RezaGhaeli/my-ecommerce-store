import { supabase } from '@/lib/supabase'

/**
 * Fetch products with optional filters.
 * @param {{ category?: string, search?: string, minPrice?: number, maxPrice?: number, minRating?: number, inStockOnly?: boolean, sortBy?: string }} opts
 */
export async function getProducts(opts = {}) {
  const { category, search, minPrice, maxPrice, minRating, inStockOnly, sortBy = 'created_at' } = opts

  let query = supabase.from('products').select('*')

  if (category && category !== 'All') query = query.eq('category', category)
  if (inStockOnly)                    query = query.eq('in_stock', true)
  if (minPrice != null)               query = query.gte('price', minPrice)
  if (maxPrice != null)               query = query.lte('price', maxPrice)
  if (minRating != null)              query = query.gte('rating', minRating)
  if (search)                         query = query.ilike('name', `%${search}%`)

  const sortMap = {
    'price-asc':  { column: 'price',        ascending: true  },
    'price-desc': { column: 'price',        ascending: false },
    'rating':     { column: 'rating',       ascending: false },
    'reviews':    { column: 'review_count', ascending: false },
    'featured':   { column: 'created_at',   ascending: false },
  }
  const { column, ascending } = sortMap[sortBy] ?? sortMap.featured
  query = query.order(column, { ascending })

  const { data, error } = await query
  if (error) throw error
  return data
}

/**
 * Fetch a single product by id.
 * @param {string} id
 */
export async function getProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

/**
 * Decrement stock when an item is purchased.
 * Called server-side / via Edge Function in production.
 * @param {string} id
 * @param {number} quantity
 */
export async function decrementStock(id, quantity) {
  const { error } = await supabase.rpc('decrement_stock', { product_id: id, qty: quantity })
  if (error) throw error
}
