-- ============================================================
-- CarHub360 — Supabase Database Schema
-- Run this in the Supabase SQL Editor to provision the database.
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  phone text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'partner', 'admin')),
  reward_points integer not null default 0,
  total_bookings integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- CARS
-- ============================================================
create table if not exists public.cars (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  brand text not null,
  model text not null,
  year integer not null,
  category text not null check (category in ('economy','premium','luxury','suv','sports','electric')),
  price_per_day numeric not null,
  images text[] not null default '{}',
  thumbnail text,
  rating numeric not null default 0,
  review_count integer not null default 0,
  seats integer not null default 4,
  fuel_type text not null check (fuel_type in ('petrol','diesel','electric','hybrid')),
  transmission text not null check (transmission in ('automatic','manual')),
  mileage text,
  engine text,
  top_speed text,
  horsepower text,
  features text[] not null default '{}',
  location text,
  city text,
  available boolean not null default true,
  description text,
  owner_id uuid references public.profiles(id) on delete set null,
  insurance_included boolean not null default true,
  security_deposit numeric not null default 0,
  min_booking_days integer not null default 1,
  created_at timestamptz not null default now()
);

-- ============================================================
-- BOOKINGS
-- ============================================================
create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  pickup_location text,
  drop_location text,
  pickup_date date not null,
  return_date date not null,
  total_days integer not null,
  base_price numeric not null,
  insurance_fee numeric not null default 0,
  taxes numeric not null default 0,
  total_amount numeric not null,
  status text not null default 'pending' check (status in ('pending','confirmed','active','completed','cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','refunded')),
  promo_code text,
  discount numeric default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- WISHLIST
-- ============================================================
create table if not exists public.wishlist (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, car_id)
);

-- ============================================================
-- REVIEWS
-- ============================================================
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text,
  type text not null default 'system' check (type in ('booking','payment','promo','system')),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PARTNERS
-- ============================================================
create table if not exists public.partners (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  business_name text not null,
  license_number text,
  total_cars integer not null default 0,
  total_earnings numeric not null default 0,
  rating numeric not null default 0,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.cars enable row level security;
alter table public.bookings enable row level security;
alter table public.wishlist enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.partners enable row level security;

-- Profiles: users manage their own profile
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Cars: public read, owners/admins write
create policy "Cars are viewable by everyone" on public.cars for select using (true);
create policy "Owners can insert cars" on public.cars for insert with check (auth.uid() = owner_id);
create policy "Owners can update own cars" on public.cars for update using (auth.uid() = owner_id);

-- Bookings: users see/create their own
create policy "Users view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users create own bookings" on public.bookings for insert with check (auth.uid() = user_id);
create policy "Users update own bookings" on public.bookings for update using (auth.uid() = user_id);

-- Wishlist: users manage their own
create policy "Users manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- Reviews: public read, authenticated write
create policy "Reviews viewable by everyone" on public.reviews for select using (true);
create policy "Users create own reviews" on public.reviews for insert with check (auth.uid() = user_id);

-- Notifications: users see their own
create policy "Users view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- Partners: users manage their own partner profile
create policy "Partners viewable by everyone" on public.partners for select using (true);
create policy "Users manage own partner profile" on public.partners for all using (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ENABLE REALTIME for bookings
-- ============================================================
alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.notifications;
