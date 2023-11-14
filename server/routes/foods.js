import express from 'express'
import FoodsController from '../controllers/foods.js'

const router = express.Router()

router.get('/:id', FoodsController.getFood)
router.get('/fridge/:fridge_id', FoodsController.getFoodsByFridgeId)
router.get('/fridge/:fridge_id/sorted', FoodsController.getFoodsByFridgeIdSorted)
router.post('/fridge/:fridge_id', FoodsController.createFoodInFridge)
router.patch('/:id', FoodsController.updateFood)
router.patch('/:id/count', FoodsController.updateFoodCount)
router.patch('/:id/expiration-date', FoodsController.updateFoodExpirationDate)
router.delete('/:id', FoodsController.deleteFood)

export default router