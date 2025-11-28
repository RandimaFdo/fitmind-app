import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { config } from '../config/env'

export function signToken(payload: object, options: SignOptions = {}) {
  const secret: Secret = config.jwtSecret
  const expiresIn = (options.expiresIn ?? config.tokenExpiresIn) as SignOptions['expiresIn']
  const merged: SignOptions = { ...options, expiresIn }
  return jwt.sign(payload, secret, merged)
}

export function verifyToken<T>(token: string) {
  const secret: Secret = config.jwtSecret
  return jwt.verify(token, secret) as T
}
