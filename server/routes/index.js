import express from 'express'
import foodCategoriesRoutes from './food_categories.js'
import fridgesRoutes from './fridges.js'
import foodsRoutes from './foods.js'
import usersRoutes from './users.js'
import fridgesUsersRoutes from './fridges_users.js'
import shoppingItemsRoutes from './shopping_items.js'

const apiRouter = express.Router()
apiRouter.use('/food-categories', foodCategoriesRoutes)
apiRouter.use('/fridges', fridgesRoutes)
apiRouter.use('/foods', foodsRoutes)
apiRouter.use('/users', usersRoutes)
apiRouter.use('/fridges-users', fridgesUsersRoutes)
apiRouter.use('/shopping-items', shoppingItemsRoutes)

export default apiRouter