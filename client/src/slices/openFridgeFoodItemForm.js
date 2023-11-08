import { createSlice } from '@reduxjs/toolkit'
import { EditMode } from '../constants.js'

export const initialState = {
  flag: false,
  editMode: EditMode.ADD
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