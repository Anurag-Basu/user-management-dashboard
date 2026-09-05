import mongoose from 'mongoose'
import { MONGODB_URI } from './index.js'

export async function connectDB() {
  mongoose.set('bufferCommands', false)

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('MongoDB connection failed.')
    console.error(
      'Set MONGODB_URI in backend/.env to your MongoDB Atlas connection string and restart.',
    )
    console.error(error instanceof Error ? error.message : error)
  }
}
