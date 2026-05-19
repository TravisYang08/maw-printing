-- M.A.W Printing — orders table (v2 — aligned with catalog)
-- Run this in the Supabase SQL Editor

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  payment_method text not null,
  notes text,
  category text not null,
  product_id text not null,
  product_name text not null,
  color_id text not null,
  color_name text not null,
  size text not null,
  print_method text not null,
  print_position text not null,
  print_size text not null,
  quantity integer not null default 1,
  design_url text,
  design_file_name text,
  total_price numeric(12, 0) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Migration from v1 schema (run if upgrading)
-- alter table public.orders add column if not exists category text;
-- alter table public.orders add column if not exists product_id text;
-- alter table public.orders add column if not exists product_name text;
-- alter table public.orders add column if not exists color_id text;
-- alter table public.orders add column if not exists color_name text;
-- alter table public.orders add column if not exists print_method text;

alter table public.orders enable row level security;

create policy "Allow public insert orders"
  on public.orders for insert to anon with check (true);

create policy "Allow public read orders"
  on public.orders for select to anon using (true);

create policy "Allow public update orders"
  on public.orders for update to anon using (true) with check (true);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
