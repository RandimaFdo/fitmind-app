import type { Response } from 'express'
import type { AuthRequest } from '../middleware/authMiddleware'
import { Progress } from '../models/Progress'

export const listProgress = async (req: AuthRequest, res: Response) => {
  const items = await Progress.find({ user: req.userId }).sort({ createdAt: -1 })
  res.json(items)
}

export const createProgress = async (req: AuthRequest, res: Response) => {
  const entry = await Progress.create({ ...req.body, user: req.userId })
  res.status(201).json(entry)
}
