import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  flag: false,
  editMode: "add"
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