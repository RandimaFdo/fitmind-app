import { Router } from 'express'
import { createWorkout, listWorkouts } from '../controllers/workoutController'
import { requireAuth } from '../middleware/authMiddleware'

export const workoutRouter = Router()

workoutRouter.get('/', requireAuth, listWorkouts)
workoutRouter.post('/', requireAuth, createWorkout)
