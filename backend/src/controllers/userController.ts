import type { Request, Response } from 'express'

export const getUsers = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
}

export const getUserById = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
}

export const createUser = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
}

export const updateUser = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
}

export const deleteUser = (_req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented' })
}
