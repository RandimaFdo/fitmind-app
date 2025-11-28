import { Router } from 'express'
import { analyzeFitness, getCoachPlan, scanMeal } from '../controllers/coachController'
import { requireAuth } from '../middleware/authMiddleware'

export const coachRouter = Router()

coachRouter.post('/analyze', requireAuth, analyzeFitness)
coachRouter.post('/plan', requireAuth, getCoachPlan)
coachRouter.post('/scan', requireAuth, scanMeal)
