import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  userId?: string
}

export function requireAuth(req: AuthRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new Error('Unauthorized')
  }

  const token = header.split(' ')[1]
  const payload = verifyToken<{ sub: string }>(token)

  req.userId = payload.sub
  next()
}
