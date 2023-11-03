import express from 'express'
import FridgesUsersController from '../controllers/fridges_users.js'

const router = express.Router()

router.get('/:id', FridgesUsersController.getUsersByFridgeId)
router.post('/:id', FridgesUsersController.addUserToFridge)
router.delete('/:id', FridgesUsersController.deleteUserFromFridge)

export default router