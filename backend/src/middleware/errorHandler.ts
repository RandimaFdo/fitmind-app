import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)
  const status = err.status ?? 400
  res.status(status).json({ message: err.message ?? 'Unexpected error' })
}
