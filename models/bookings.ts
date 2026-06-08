import { Db } from 'mongodb'

export const collectionName = 'bookings'

export interface Booking {
  _id?: string
  user_id: string
  car_id: string
  pickup_location?: string
  drop_location?: string
  pickup_date: string
  return_date: string
  total_days: number
  base_price: number
  insurance_fee?: number
  taxes?: number
  total_amount: number
  status?: string
  payment_status?: string
  promo_code?: string
  discount?: number
  created_at?: Date
  updated_at?: Date
}

export async function ensureBookings(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ user_id: 1 }, { background: true })
  await coll.createIndex({ car_id: 1 }, { background: true })
  await coll.createIndex({ status: 1 }, { background: true })
}
