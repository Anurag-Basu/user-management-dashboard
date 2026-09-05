import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.js'
import { requireDb } from '../middleware/requireDb.js'
import { validateObjectId } from '../middleware/validateObjectId.js'
import { validateUserBody } from '../middleware/validateUser.js'

const router = Router()

router.use(requireDb)

router.get('/', getUsers)
router.get('/:id', validateObjectId, getUserById)
router.post('/', validateUserBody, createUser)
router.put('/:id', validateObjectId, validateUserBody, updateUser)
router.delete('/:id', validateObjectId, deleteUser)

export default router
