import mongoose from 'mongoose'

export const connectDB = async () => {
  const uri = "mongodb+srv://sonusaini:blog12345678@cluster0.v3qldvn.mongodb.net"
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')
}

