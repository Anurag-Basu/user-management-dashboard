import type { NextFunction, Request, Response } from 'express'
import { validateUserPayload } from '../validators/userValidator.js'
import { HttpError } from './httpError.js'

export function validateUserBody(req: Request, _res: Response, next: NextFunction) {
  const result = validateUserPayload(req.body)

  if (result.errors) {
    return next(new HttpError(400, 'Invalid data', result.errors))
  }

  req.body = result.value
  next()
}
