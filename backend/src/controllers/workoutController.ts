import type { Response } from 'express'
import type { AuthRequest } from '../middleware/authMiddleware'
import { WorkoutPlan } from '../models/WorkoutPlan'

export const listWorkouts = async (req: AuthRequest, res: Response) => {
  const plans = await WorkoutPlan.find({ user: req.userId })
  res.json(plans)
}

export const createWorkout = async (req: AuthRequest, res: Response) => {
  const plan = await WorkoutPlan.create({ ...req.body, user: req.userId })
  res.status(201).json(plan)
}
