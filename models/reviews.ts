import { Db } from 'mongodb'

export const collectionName = 'reviews'

export interface Review {
  _id?: string
  user_id: string
  car_id: string
  booking_id?: string
  rating: number
  comment?: string
  created_at?: Date
}

export async function ensureReviews(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ car_id: 1 }, { background: true })
  await coll.createIndex({ user_id: 1 }, { background: true })
}
