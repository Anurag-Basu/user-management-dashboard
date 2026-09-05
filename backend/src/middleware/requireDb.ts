import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { HttpError } from './httpError.js'

export function requireDb(_req: Request, _res: Response, next: NextFunction) {
  if (mongoose.connection.readyState !== 1) {
    return next(
      new HttpError(
        503,
        'Database is not connected. Set MONGODB_URI in backend/.env and restart the server.',
      ),
    )
  }

  next()
}
