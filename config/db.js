import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = "mongodb://localhost:27017/Blog-App"
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')
}

