import 'express-async-errors'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { authRouter } from './routes/authRoutes'
import { coachRouter } from './routes/coachRoutes'
import { progressRouter } from './routes/progressRoutes'
import { workoutRouter } from './routes/workoutRoutes'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'FitMind API' })
})

app.use('/api/auth', authRouter)
app.use('/api/coach', coachRouter)
app.use('/api/progress', progressRouter)
app.use('/api/workouts', workoutRouter)

app.use(errorHandler)
