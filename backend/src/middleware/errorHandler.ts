import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { HttpError } from './httpError.js'

function isDuplicateEmailError(error: unknown): boolean {
  if (error instanceof mongoose.mongo.MongoServerError && error.code === 11000) {
    return Boolean(error.keyPattern?.email)
  }

  return false
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Route not found' })
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof HttpError) {
    return res.status(error.status).json({
      message: error.message,
      ...(error.errors ? { errors: error.errors } : {}),
    })
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(
      Object.entries(error.errors).map(([field, value]) => [field, value.message]),
    )
    return res.status(400).json({ message: 'Invalid data', errors })
  }

  if (isDuplicateEmailError(error)) {
    return res.status(409).json({ message: 'Email already exists' })
  }

  console.error(error)
  return res.status(500).json({ message: 'Internal server error' })
}
