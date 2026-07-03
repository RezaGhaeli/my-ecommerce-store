-- ============================================================
-- ShopFlow — Seed Data
-- ============================================================

insert into public.products
  (name, description, price, original_price, category, image_url, badge, in_stock, stock_count, rating, review_count)
values
  (
    'Wireless Noise-Cancelling Headphones',
    'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.',
    299.99, 399.99, 'Electronics',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'Best Seller', true, 142, 4.8, 2341
  ),
  (
    'Minimalist Leather Watch',
    'Slim, elegant watch with genuine leather strap, sapphire crystal glass, and Japanese movement.',
    189.99, null, 'Electronics',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    null, true, 67, 4.6, 876
  ),
  (
    'Merino Wool Crewneck Sweater',
    '100% extra-fine merino wool sweater, naturally breathable and machine washable.',
    89.99, 129.99, 'Clothing',
    'https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?w=400&h=400&fit=crop',
    'Sale', true, 210, 4.7, 1204
  ),
  (
    'Portable Espresso Maker',
    'Brew barista-quality espresso anywhere with this compact, hand-operated espresso maker.',
    69.99, null, 'Home',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
    'New', true, 89, 4.5, 543
  ),
  (
    'Running Shoes Pro',
    'Lightweight, responsive running shoes with advanced cushioning and breathable mesh upper.',
    134.99, 159.99, 'Sports',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    'Top Rated', true, 304, 4.9, 3892
  ),
  (
    'Atomic Habits',
    'The #1 New York Times bestseller on building good habits and breaking bad ones.',
    16.99, null, 'Books',
    'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop',
    null, true, 500, 4.9, 12840
  ),
  (
    'Smart Home Speaker',
    'Voice-controlled smart speaker with rich, room-filling sound and a built-in assistant.',
    129.99, 179.99, 'Electronics',
    'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
    'Sale', true, 55, 4.4, 2105
  ),
  (
    'Yoga Mat Premium',
    'Eco-friendly, non-slip yoga mat with alignment lines and carrying strap.',
    78.99, null, 'Sports',
    'https://images.unsplash.com/photo-1601925228267-7a7a77e8a4f3?w=400&h=400&fit=crop',
    null, false, 0, 4.6, 987
  );
