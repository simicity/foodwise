import express from 'express'
import FridgesUsersController from '../controllers/fridges_users.js'

const router = express.Router()

router.get('/users/:id', FridgesUsersController.getUsersByFridgeId)
router.get('/fridges/:user_id', FridgesUsersController.getFridgesByUserId)
router.post('/:id', FridgesUsersController.addUserToFridge)
router.post('/fridge/:fridge_id', FridgesUsersController.addUserToFridgeByEmail)
router.delete('/:id', FridgesUsersController.deleteUserFromFridge)

export default router