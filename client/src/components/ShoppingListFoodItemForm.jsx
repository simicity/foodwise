import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCloseShoppingListFoodItemForm } from '../slices/openShoppingListFoodItemForm'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const ShoppingListFoodItemForm = () => {
  const [item, setItem] = useState({name: "", category: "", addedDate: "", expirationDate: "", count: 0})
  const [categories, setCategories] = useState(["Fruit", "Vegetable", "Meat", "Dairy", "Grain", "Other"])
  const isOpenShoppingListFoodItemForm = useSelector(state => state.openShoppingListFoodItemForm.flag)
  const mode = useSelector(state => state.openShoppingListFoodItemForm.editMode)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    setItem({...item, [name]: value})
  }

  const handleSubmit = () => {
    dispatch(setCloseShoppingListFoodItemForm())
  }

  return (
    <>
      <Dialog open={isOpenShoppingListFoodItemForm} onClose={() => dispatch(setCloseShoppingListFoodItemForm())}>
        <DialogTitle>{mode == "add" ? "Add" : "Edit"} a food item to Shopping List</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField autoFocus margin="dense" label="Name" variant="outlined" sx={{ width: "300px" }} name="name" value={item.name} onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={item.category}
                label="Category"
                onChange={handleChange}
                sx={{ width: "300px" }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField autoFocus margin="dense" label="Quantity" variant="outlined" sx={{ width: "300px" }} value={item.count} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={() => dispatch(setCloseShoppingListFoodItemForm())}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>{mode == "add" ? "Add" : "Update"}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShoppingListFoodItemForm