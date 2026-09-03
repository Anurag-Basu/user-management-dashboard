import cors from 'cors'
import express from 'express'
import { PORT } from './config/index.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'User Management API' })
})

app.use('/api/users', userRoutes)

app.listen(Number(PORT), () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
