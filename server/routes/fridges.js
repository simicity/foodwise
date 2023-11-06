import express from 'express'
import FridgesController from '../controllers/fridges.js'

const router = express.Router()

router.get('/', FridgesController.getFridges)
router.get('/:id', FridgesController.getFridge)
router.post('/', FridgesController.createFridge)
router.patch('/:id', FridgesController.updateFridge)
router.delete('/:id', FridgesController.deleteFridge)

export default router