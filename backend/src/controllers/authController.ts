import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models/User'
import { signToken } from '../utils/jwt'

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed, name })

  res.status(201).json({ id: user.id, email: user.email, name: user.name })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = signToken({ sub: user.id })
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, fitnessLevel: user.fitnessLevel },
  })
}
