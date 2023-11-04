import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCloseFridgeFoodItemForm } from '../slices/openFridgeFoodItemForm'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const FridgeFoodItemForm = () => {
  const [item, setItem] = useState({name: "", category: "", addedDate: "", expirationDate: "", count: 0})
  const [categories, setCategories] = useState(["Fruit", "Vegetable", "Meat", "Dairy", "Grain", "Other"])
  const isOpenFridgeFoodItemForm = useSelector(state => state.openFridgeFoodItemForm.flag)
  const mode = useSelector(state => state.openFridgeFoodItemForm.editMode)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    setItem({...item, [name]: value})
  }

  const handleDatePickerChange = (date) => {
    setItem({...item, "expirationDate": date.toDate()})
  }

  const handleSubmit = () => {
    dispatch(setCloseFridgeFoodItemForm())
  }

  return (
    <>
      <Dialog open={isOpenFridgeFoodItemForm} onClose={() => dispatch(setCloseFridgeFoodItemForm())}>
        <DialogTitle>{mode == "add" ? "Add" : "Edit"} a food item to Fridge</DialogTitle>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Controlled picker"
                name="expirationDate"
                value={item.expirationDate}
                onChange={handleDatePickerChange}
              />
            </LocalizationProvider>
            <TextField autoFocus margin="dense" label="Quantity" variant="outlined" sx={{ width: "300px" }} value={item.count} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={() => dispatch(setCloseFridgeFoodItemForm())}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>{mode == "add" ? "Add" : "Update"}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FridgeFoodItemForm