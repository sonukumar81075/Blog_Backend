import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import postRoutes from './routes/postRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
)
app.use(express.json())

app.use('/api/posts', postRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ message: 'Unexpected server error.' })
})

const start = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()

