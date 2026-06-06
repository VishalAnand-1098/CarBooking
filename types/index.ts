export interface Car {
  id: string
  name: string
  brand: string
  model: string
  year: number
  category: 'economy' | 'premium' | 'luxury' | 'suv' | 'sports' | 'electric'
  price_per_day: number
  images: string[]
  thumbnail: string
  rating: number
  review_count: number
  seats: number
  fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid'
  transmission: 'automatic' | 'manual'
  mileage: string
  engine: string
  top_speed: string
  horsepower: string
  features: string[]
  location: string
  city: string
  available: boolean
  description: string
  owner_id?: string
  insurance_included: boolean
  security_deposit: number
  min_booking_days: number
  created_at?: string
}

export interface Booking {
  id: string
  user_id: string
  car_id: string
  car?: Car
  pickup_location: string
  drop_location: string
  pickup_date: string
  return_date: string
  total_days: number
  base_price: number
  insurance_fee: number
  taxes: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  promo_code?: string
  discount?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  role: 'user' | 'partner' | 'admin'
  reward_points: number
  total_bookings: number
  created_at: string
}

export interface Review {
  id: string
  user_id: string
  car_id: string
  booking_id: string
  rating: number
  comment: string
  user?: User
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'booking' | 'payment' | 'promo' | 'system'
  read: boolean
  created_at: string
}

export interface Partner {
  id: string
  user_id: string
  business_name: string
  license_number: string
  total_cars: number
  total_earnings: number
  rating: number
  verified: boolean
  created_at: string
}

export interface SearchFilters {
  pickup_location?: string
  drop_location?: string
  pickup_date?: string
  return_date?: string
  car_type?: string
  min_price?: number
  max_price?: number
  fuel_type?: string
  transmission?: string
  seats?: number
}

export interface AITripPlan {
  destination: string
  days: number
  budget: number
  travelers: number
  recommended_car: Car | null
  fuel_estimate: number
  toll_charges: number
  hotel_budget: number
  food_estimate: number
  total_expense: number
  tips: string[]
}

export interface Stats {
  total_customers: number
  total_cars: number
  total_cities: number
  average_rating: number
}
