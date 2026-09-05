import type { ValidationErrors } from '../validators/userValidator.js'

export class HttpError extends Error {
  status: number
  errors?: ValidationErrors

  constructor(status: number, message: string, errors?: ValidationErrors) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.errors = errors
  }
}
