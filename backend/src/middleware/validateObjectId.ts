import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { HttpError } from './httpError.js'

export function validateObjectId(req: Request, _res: Response, next: NextFunction) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

  if (!id || !mongoose.Types.ObjectId.isValid(id) || String(new mongoose.Types.ObjectId(id)) !== id) {
    return next(new HttpError(400, 'Invalid user id'))
  }

  next()
}
