import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const dbName = process.env.MONGODB_DB || 'carhub360'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null
let loggedConnected = false

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb

  if (!cachedClient) {
    const client = new MongoClient(uri)
    cachedClient = client
    await cachedClient.connect()
    if (!loggedConnected) {
      try {
        console.log(`MongoDB connected (${dbName})`)
      } catch (e) {
        // ignore logging errors
      }
      loggedConnected = true
    }
  }

  cachedDb = cachedClient.db(dbName)
  return cachedDb
}

export async function initMongo() {
  return getDb()
}

export async function getCollection<T = any>(name: string) {
  const db = await getDb()
  return db.collection<T>(name)
}

export async function closeConnection() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
    loggedConnected = false
    try {
      console.log('MongoDB connection closed')
    } catch (e) {
      // ignore
    }
  }
}

export default { getDb, getCollection, closeConnection }
