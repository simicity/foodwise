import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  flag: false,
  editMode: "add"
};

const openFridgeFoodItemFormSlice = createSlice({
  name: 'openFridgeFoodItemForm',
  initialState,
  reducers: {
    setOpenFridgeFoodItemForm: state => {
      state.flag = true
    },
    setCloseFridgeFoodItemForm: state => {
      state.flag = false
    },
    setFridgeFoodItemFormEditMode: (state, { payload }) => {
      state.editMode = payload
    },
  },
})

export const { setOpenFridgeFoodItemForm, setCloseFridgeFoodItemForm, setFridgeFoodItemFormEditMode } = openFridgeFoodItemFormSlice.actions
export default openFridgeFoodItemFormSlice.reducer