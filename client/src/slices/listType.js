import { createSlice } from '@reduxjs/toolkit'
import { ListMode } from '../constants.js'

export const initialState = {
  listType: ListMode.FRIDGE,
};

const listTypeSlice = createSlice({
  name: 'listType',
  initialState,
  reducers: {
    setFridgeList: state => {
      state.listType = ListMode.FRIDGE
    },
    setShoppingList: state => {
      state.listType = ListMode.SHOPPING_LIST
    },
  },
})

export const { setFridgeList, setShoppingList } = listTypeSlice.actions
export default listTypeSlice.reducer