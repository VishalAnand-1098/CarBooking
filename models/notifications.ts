import { Db } from 'mongodb'

export const collectionName = 'notifications'

export interface Notification {
  _id?: string
  user_id: string
  title: string
  message?: string
  type?: string
  read?: boolean
  created_at?: Date
}

export async function ensureNotifications(db: Db) {
  const exists = await db.listCollections({ name: collectionName }).hasNext()
  if (!exists) {
    await db.createCollection(collectionName)
  }
  const coll = db.collection(collectionName)
  await coll.createIndex({ user_id: 1 }, { background: true })
}
