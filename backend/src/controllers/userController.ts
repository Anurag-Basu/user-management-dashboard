import type { Request, Response } from 'express'
import { User } from '../models/User.js'
import { HttpError } from '../middleware/httpError.js'
import type { UserPayload } from '../validators/userValidator.js'

export async function getUsers(_req: Request, res: Response) {
  const users = await User.find().sort({ createdAt: -1 })
  res.json(users)
}

export async function getUserById(req: Request, res: Response) {
  const user = await User.findById(req.params.id)

  if (!user) {
    throw new HttpError(404, 'User not found')
  }

  res.json(user)
}

export async function createUser(req: Request, res: Response) {
  const user = await User.create(req.body as UserPayload)
  res.status(201).json(user)
}

export async function updateUser(req: Request, res: Response) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body as UserPayload, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    throw new HttpError(404, 'User not found')
  }

  res.json(user)
}

export async function deleteUser(req: Request, res: Response) {
  const user = await User.findByIdAndDelete(req.params.id)

  if (!user) {
    throw new HttpError(404, 'User not found')
  }

  res.json({ message: 'User deleted' })
}
