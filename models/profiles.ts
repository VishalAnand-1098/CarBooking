import { Db } from 'mongodb'

export const collectionName = 'profiles'

export interface Profile {
  _id?: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role?: 'user' | 'partner' | 'admin'
  reward_points?: number
  total_bookings?: number
  created_at?: Date
}

export async function ensureProfiles(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ email: 1 }, { unique: true, background: true })
}
