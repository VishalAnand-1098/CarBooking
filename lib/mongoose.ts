import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const dbName = process.env.MONGODB_DB || 'carhub360'

let connected = false

export async function connectMongoose() {
  if (connected || mongoose.connection.readyState === 1) return mongoose

  try {
    await mongoose.connect(uri, { dbName })
    console.log(`Mongoose connected (${mongoose.connection.name})`)
    connected = true

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected')
      connected = false
    })

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err)
    })

    return mongoose
  } catch (err) {
    console.error('Failed to connect Mongoose:', err)
    throw err
  }
}

export async function disconnectMongoose() {
  if (connected || mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
    connected = false
    console.log('Mongoose disconnected')
  }
}

export default mongoose
