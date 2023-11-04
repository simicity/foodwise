import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  listType: "fridgeList",
};

const listTypeSlice = createSlice({
  name: 'listType',
  initialState,
  reducers: {
    setFridgeList: state => {
      state.listType = "fridgeList"
    },
    setShoppingList: state => {
      state.listType = "shoppingList"
    },
  },
})

export const { setFridgeList, setShoppingList } = listTypeSlice.actions
export default listTypeSlice.reducer