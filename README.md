# 🚗 CarHub360 — Premium Car Rental Marketplace

A world-class, AI-powered luxury car rental and booking marketplace. Built to feel like a fusion of **Tesla + Airbnb + BMW + Uber Black + Stripe + Linear**, with cinematic visuals, glassmorphism, and buttery-smooth micro-interactions.

![CarHub360](public/og-image.jpg)

---

## ✨ Features

- **Cinematic Landing Page** — full-screen hero with parallax, floating particles, animated counters
- **Premium Booking Widget** — glassmorphism search with locations, dates, car type & budget
- **Featured Fleet** — filterable premium car cards with hover lift, image zoom & glow
- **Luxury Collection** — showcase of Lamborghini, Ferrari, BMW, Mercedes, Porsche, Rolls Royce & more
- **AI Road Trip Planner** — instant car/fuel/hotel/food cost estimates
- **AI Chat Assistant** — floating glassmorphism assistant with quick questions
- **Car Details** — image gallery, specs grid, sticky booking panel, similar cars
- **4-Step Booking Flow** — Dates → Details → Payment → Confirmation with live order summary
- **User Dashboard** — bookings, wishlist, rewards, profile, activity timeline
- **Admin Dashboard** — revenue charts, analytics, searchable data tables
- **Become a Partner** — earnings calculator, how-it-works, registration flow
- **Corporate Rentals** — fleet plans & pricing tiers
- **Auth** — login/signup with social login UI
- **SEO** — metadata, Open Graph, Twitter cards, JSON-LD, sitemap & robots
- **Accessibility** — ARIA labels, keyboard nav, focus states
- **Fully Responsive** — mobile-first, beautiful from 375px to 1440px+

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack, Server Components) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** + custom glassmorphism design system |
| UI Primitives | **shadcn/ui** + Radix UI |
| Animation | **Framer Motion** |
| Icons | **Lucide React** (+ custom brand SVGs) |
| Forms | **React Hook Form** + **Zod** |
| Backend | **MongoDB** (Database) — replace Supabase queries with MongoDB calls in `lib/mongodb.ts` |
| Notifications | **Sonner** |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0B0F19` |
| Secondary | `#111827` |
| Glass cards | `rgba(255,255,255,0.06)` + `blur(18px)` |
| Primary accent | Electric Blue `#3B82F6` |
| Luxury accent | Gold `#D4AF37` |
| Text | `#FFFFFF` / `#A1A1AA` / `#71717A` |

Utility classes available in `globals.css`: `.glass`, `.glass-dark`, `.glow-blue`, `.glow-gold`, `.text-gradient-blue`, `.text-gradient-gold`, `.float-animation`, `.pulse-glow`, `.shimmer`.

---

## 📁 Project Structure

```
app/
  (main)/              # Public + app routes (shared navbar/footer/chat)
    page.tsx           # Landing page
    cars/              # Listing + dynamic [id] details
    booking/[carId]/   # 4-step booking flow
    dashboard/         # User dashboard
    admin/             # Admin panel
    partner/           # Become a partner
    corporate/         # Corporate rentals
    about/ contact/    # Marketing pages
    auth/login + signup
  layout.tsx           # Root layout (fonts, metadata, toaster)
  sitemap.ts / robots.ts
components/
  landing/   cars/   booking/   dashboard/   admin/   ai/   shared/
  ui/                  # shadcn components
lib/
  data.ts              # Mock cars, brands, testimonials, stats
  utils.ts             # cn(), formatCurrency(), formatDate()...
  supabase.ts          # Supabase client
types/                 # Shared TypeScript types
supabase/
  schema.sql           # Full DB schema + RLS + triggers + realtime
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local`:
```bash
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net
MONGODB_DB=carhub360

# (optional) site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set up Supabase (optional — app runs with mock data by default)
If you were using Supabase, migrate your schema/data into MongoDB collections. The project includes `supabase/schema.sql` as a reference for tables/fields.

### 4. Run the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build && npm start
```

---

## 🧪 Demo Tips

- **Promo code** `CARHUB10` gives 10% off in the booking flow.
- The **AI Trip Planner** and **AI Chat Assistant** use smart mock logic — no API key needed.
- All car data lives in `lib/data.ts`; swap to Supabase queries to go live.

---

## 📄 License

Built as a premium showcase project. Use it, learn from it, ship something beautiful. 🚀
