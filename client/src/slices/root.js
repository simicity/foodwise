import { combineReducers } from 'redux'

import listTypeReducer from './listType'
import openFridgeFoodItemFormReducer from './openFridgeFoodItemForm'
import openShoppingListFoodItemFormReducer from './openShoppingListFoodItemForm'

const rootReducer = combineReducers({
  listType: listTypeReducer,
  openFridgeFoodItemForm: openFridgeFoodItemFormReducer,
  openShoppingListFoodItemForm: openShoppingListFoodItemFormReducer,
})

export default rootReducer