import mongoose from 'mongoose'
import { config } from '../config/env.js'

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri)
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ Mongo connection failed', error)
    process.exit(1)
  }
}
