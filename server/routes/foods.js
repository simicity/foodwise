import express from 'express'
import FoodsController from '../controllers/foods.js'

const router = express.Router()

router.get('/:id', FoodsController.getFood)
router.get('/fridge-id/:id', FoodsController.getFoodsByFridgeId)
router.post('/fridge-id/:id', FoodsController.createFoodInFridge)
router.patch('/:id', FoodsController.updateFood)
router.patch('/:id/count', FoodsController.updateFoodCount)
router.patch('/:id/expiration-date', FoodsController.updateFoodExpirationDate)
router.delete('/:id', FoodsController.deleteFood)

export default router