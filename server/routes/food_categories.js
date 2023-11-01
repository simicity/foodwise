import express from 'express'
import FoodCategoriesController from '../controllers/food_categories.js'

const router = express.Router()

router.get('/', FoodCategoriesController.getFoodCategories)

export default router