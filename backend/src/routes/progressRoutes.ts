import { Router } from 'express'
import { createProgress, listProgress } from '../controllers/progressController'
import { requireAuth } from '../middleware/authMiddleware'

export const progressRouter = Router()

progressRouter.get('/', requireAuth, listProgress)
progressRouter.post('/', requireAuth, createProgress)
