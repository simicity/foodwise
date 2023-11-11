import express from 'express'
import FridgesUsersController from '../controllers/fridges_users.js'

const router = express.Router()

router.get('/users/:id', FridgesUsersController.getUsersByFridgeId)
router.get('/fridges/:user_id', FridgesUsersController.getFridgesByUserId)
router.post('/:id', FridgesUsersController.addUserToFridge)
router.post('/username/:id', FridgesUsersController.addUserToFridgeByUsername)
router.delete('/:id', FridgesUsersController.deleteUserFromFridge)

export default router