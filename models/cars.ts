import { Db } from 'mongodb'

export const collectionName = 'cars'

export interface Car {
  _id?: string
  name: string
  brand: string
  model: string
  year: number
  category: string
  price_per_day: number
  images?: string[]
  thumbnail?: string
  rating?: number
  review_count?: number
  seats?: number
  fuel_type?: string
  transmission?: string
  location?: string
  city?: string
  available?: boolean
  description?: string
  owner_id?: string
  insurance_included?: boolean
  security_deposit?: number
  min_booking_days?: number
  created_at?: Date
}

export async function ensureCars(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ owner_id: 1 }, { background: true })
  await coll.createIndex({ city: 1 }, { background: true })
}
