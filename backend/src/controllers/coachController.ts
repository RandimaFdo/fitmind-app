import type { Response } from 'express'
import type { AuthRequest } from '../middleware/authMiddleware'
import { aiCoachService } from '../services/aiCoachService'
import { analyzerService } from '../services/analyzerService'
import { mealScannerService } from '../services/mealScannerService'

export const analyzeFitness = async (req: AuthRequest, res: Response) => {
  const summary = analyzerService.analyzeLevel(req.body)
  res.json(summary)
}

export const getCoachPlan = async (req: AuthRequest, res: Response) => {
  const plan = aiCoachService.generatePlan(req.userId!, req.body)
  res.json(plan)
}

export const scanMeal = async (req: AuthRequest, res: Response) => {
  const result = mealScannerService.analyze(req.body.imageUrl)
  res.json(result)
}
