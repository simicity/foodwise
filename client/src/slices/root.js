import { combineReducers } from 'redux'

import listTypeReducer from './listType'
import openFridgeFoodItemFormReducer from './openFridgeFoodItemForm'
import openShoppingListFoodItemFormReducer from './openShoppingListFoodItemForm'
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  listType: listTypeReducer,
  openFridgeFoodItemForm: openFridgeFoodItemFormReducer,
  openShoppingListFoodItemForm: openShoppingListFoodItemFormReducer,
})

export default rootReducer