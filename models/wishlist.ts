import { Db } from 'mongodb'

export const collectionName = 'wishlist'

export interface WishlistItem {
  _id?: string
  user_id: string
  car_id: string
  created_at?: Date
}

export async function ensureWishlist(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ user_id: 1, car_id: 1 }, { unique: true, background: true })
}
