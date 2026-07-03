-- ============================================================
-- ShopFlow — Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles      enable row level security;
alter table public.products      enable row level security;
alter table public.orders        enable row level security;
alter table public.order_items   enable row level security;
alter table public.cart_items    enable row level security;
alter table public.wishlist_items enable row level security;

-- ============================================================
-- PROFILES
-- ============================================================

-- Users can read their own profile
create policy "profiles: owner can read"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "profiles: owner can update"
  on public.profiles for update
  using (auth.uid() = id);

-- ============================================================
-- PRODUCTS  (public catalogue — anyone can read)
-- ============================================================

create policy "products: public read"
  on public.products for select
  using (true);

-- ============================================================
-- ORDERS  (users see only their own orders)
-- ============================================================

create policy "orders: owner can read"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "orders: owner can insert"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- Only backend/service role can update order status
-- (no client-side update policy)

-- ============================================================
-- ORDER ITEMS  (readable if the parent order belongs to user)
-- ============================================================

create policy "order_items: owner can read"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and o.user_id = auth.uid()
    )
  );

-- ============================================================
-- CART ITEMS
-- ============================================================

create policy "cart_items: owner can read"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "cart_items: owner can insert"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "cart_items: owner can update"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "cart_items: owner can delete"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ============================================================
-- WISHLIST ITEMS
-- ============================================================

create policy "wishlist_items: owner can read"
  on public.wishlist_items for select
  using (auth.uid() = user_id);

create policy "wishlist_items: owner can insert"
  on public.wishlist_items for insert
  with check (auth.uid() = user_id);

create policy "wishlist_items: owner can delete"
  on public.wishlist_items for delete
  using (auth.uid() = user_id);
