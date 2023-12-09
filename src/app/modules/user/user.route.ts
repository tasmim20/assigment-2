import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

//will call controller function
router.post('/', UserControllers.createUser)

router.get('/', UserControllers.getAllUsers)
router.get('/:userId', UserControllers.getSingleUsers)
router.patch('/:userId', UserControllers.updateUser)
router.delete('/:userId', UserControllers.deleteUser)

export const UserRoutes = router
