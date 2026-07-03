-- ============================================================
-- ShopFlow — Initial Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

create type order_status as enum (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

create type product_badge as enum (
  'Best Seller',
  'Sale',
  'New',
  'Top Rated'
);

-- ============================================================
-- PROFILES
-- Extends Supabase Auth users (auth.users is managed by Supabase)
-- ============================================================

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'Public profile data extending auth.users.';

-- ============================================================
-- PRODUCTS
-- ============================================================

create table public.products (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null,
  description    text not null default '',
  price          numeric(10, 2) not null check (price >= 0),
  original_price numeric(10, 2) check (original_price >= 0),
  category       text not null,
  image_url      text not null default '',
  badge          product_badge,
  in_stock       boolean not null default true,
  stock_count    integer not null default 0 check (stock_count >= 0),
  rating         numeric(3, 2) not null default 0 check (rating between 0 and 5),
  review_count   integer not null default 0 check (review_count >= 0),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.products is 'Product catalogue.';
comment on column public.products.original_price is 'Pre-sale price; null means no active discount.';

create index products_category_idx on public.products (category);
create index products_in_stock_idx  on public.products (in_stock);
create index products_price_idx     on public.products (price);
create index products_rating_idx    on public.products (rating desc);

-- ============================================================
-- ORDERS
-- ============================================================

create table public.orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles (id) on delete restrict,
  status           order_status not null default 'pending',
  subtotal         numeric(10, 2) not null check (subtotal >= 0),
  shipping_amount  numeric(10, 2) not null default 0 check (shipping_amount >= 0),
  tax_amount       numeric(10, 2) not null default 0 check (tax_amount >= 0),
  total_amount     numeric(10, 2) not null check (total_amount >= 0),
  shipping_address jsonb not null default '{}',
  payment_intent   text,
  notes            text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.orders is 'Customer orders.';
comment on column public.orders.shipping_address is 'Snapshot of address at time of order: {name, line1, line2, city, state, zip, country}.';
comment on column public.orders.payment_intent is 'Stripe PaymentIntent ID for reconciliation.';

create index orders_user_id_idx  on public.orders (user_id);
create index orders_status_idx   on public.orders (status);
create index orders_created_idx  on public.orders (created_at desc);

-- ============================================================
-- ORDER ITEMS
-- ============================================================

create table public.order_items (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid not null references public.orders (id) on delete cascade,
  product_id  uuid not null references public.products (id) on delete restrict,
  quantity    integer not null check (quantity > 0),
  unit_price  numeric(10, 2) not null check (unit_price >= 0),
  created_at  timestamptz not null default now()
);

comment on table public.order_items is 'Line items within an order. unit_price is snapshotted at purchase time.';

create index order_items_order_id_idx   on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

-- ============================================================
-- CART ITEMS  (server-side persistent cart)
-- ============================================================

create table public.cart_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  product_id  uuid not null references public.products (id) on delete cascade,
  quantity    integer not null default 1 check (quantity > 0),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  unique (user_id, product_id)
);

comment on table public.cart_items is 'Persistent cart — one row per user+product pair.';

create index cart_items_user_id_idx on public.cart_items (user_id);

-- ============================================================
-- WISHLIST ITEMS
-- ============================================================

create table public.wishlist_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  product_id  uuid not null references public.products (id) on delete cascade,
  created_at  timestamptz not null default now(),

  unique (user_id, product_id)
);

comment on table public.wishlist_items is 'Saved / wishlisted products per user.';

create index wishlist_items_user_id_idx on public.wishlist_items (user_id);

-- ============================================================
-- updated_at TRIGGER  (keeps updated_at current automatically)
-- ============================================================

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger trg_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

create trigger trg_orders_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

create trigger trg_cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.set_updated_at();

-- ============================================================
-- Auto-create profile on new auth signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
