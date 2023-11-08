import express from 'express'
import ShoppingItemsController from '../controllers/shopping_items.js'

const router = express.Router()

router.get('/fridge/:fridge_id', ShoppingItemsController.getShoppingItems)
router.get('/:id', ShoppingItemsController.getShoppingItem)
router.post('/fridge/:fridge_id', ShoppingItemsController.createShoppingItem)
router.patch('/:id', ShoppingItemsController.updateShoppingItem)
router.patch('/:id/name', ShoppingItemsController.updateShoppingItemName)
router.patch('/:id/count', ShoppingItemsController.updateShoppingItemCount)
router.patch('/:id/category', ShoppingItemsController.updateShoppingItemCategory)
router.delete('/:id', ShoppingItemsController.deleteShoppingItem)

export default router