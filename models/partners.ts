import { Db } from 'mongodb'

export const collectionName = 'partners'

export interface Partner {
  _id?: string
  user_id: string
  business_name: string
  license_number?: string
  total_cars?: number
  total_earnings?: number
  rating?: number
  verified?: boolean
  created_at?: Date
}

export async function ensurePartners(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ user_id: 1 }, { unique: true, background: true })
}
