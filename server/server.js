import express from 'express'
import cors from 'cors'

import foodCategoriesRoutes from './routes/food_categories.js'
import fridgesRoutes from './routes/fridges.js'
import foodsRoutes from './routes/foods.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Foodwise API</h1>')
})

app.use('/api/food-categories', foodCategoriesRoutes)
app.use('/api/fridges', fridgesRoutes)
app.use('/api/foods', foodsRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
})