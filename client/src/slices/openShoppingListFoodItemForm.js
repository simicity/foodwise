import { createSlice } from '@reduxjs/toolkit'
import { EditMode } from '../constants.js'

export const initialState = {
  flag: false,
  editMode: EditMode.ADD
};

const openShoppingListFoodItemFormSlice = createSlice({
  name: 'openShoppingListFoodItemForm',
  initialState,
  reducers: {
    setOpenShoppingListFoodItemForm: state => {
      state.flag = true
    },
    setCloseShoppingListFoodItemForm: state => {
      state.flag = false
    },
    setShoppingListItemFormEditMode: (state, { payload }) => {
      state.editMode = payload
    },
  },
})

export const { setOpenShoppingListFoodItemForm, setCloseShoppingListFoodItemForm, setShoppingListItemFormEditMode } = openShoppingListFoodItemFormSlice.actions
export default openShoppingListFoodItemFormSlice.reducer