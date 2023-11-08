import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { API_URL } from '../main'

const FridgeFoodItemForm = ({ selectedItem, callback }) => {
  const fridge_id = useParams().id
  const [formItem, setFormItem] = useState({ name: "", category_id: "", expiration_date: null, count: ""})
  const [categories, setCategories] = useState([])
  const isOpenFridgeFoodItemForm = useSelector(state => state.openFridgeFoodItemForm.flag)
  const mode = useSelector(state => state.openFridgeFoodItemForm.editMode)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    console.log(formItem)
    setFormItem({...formItem, [name]: value})
  }

  const handleDatePickerChange = (date) => {
    setFormItem((prev) => ({...prev, "expiration_date": date.toDate()}))
  }

  const handleSubmit = () => {
    const addItem = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formItem)
      }

      await fetch(`${API_URL}/api/foods/fridge/${fridge_id}`, options)
    }

    const editItem = async () => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formItem)
      }

      await fetch(`${API_URL}/api/foods/${formItem.id}`, options)
    }

    if(mode == "add") {
      addItem()
      .then(() => {
        window.location.href = `/fridge/${fridge_id}`
      })
    } else {
      editItem()
      .then(() => {
        callback()
      })
    }

    dispatch(setCloseFridgeFoodItemForm())
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_URL}/api/food-categories`)
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])


  useEffect(() => {
    const updateFormItem = () => {
      if(mode == "add") {
        setFormItem({ name: "", category_id: "", expiration_date: null, count: ""})
      } else {
        setFormItem({...selectedItem})
      }
    }

    updateFormItem()
  }, [mode, selectedItem])

  return (
    <>
      <Dialog open={isOpenFridgeFoodItemForm} onClose={() => dispatch(setCloseFridgeFoodItemForm())}>
        <DialogTitle>{mode == "add" ? "Add" : "Edit"} a food item to Fridge</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField autoFocus margin="dense" label="Name" variant="outlined" sx={{ width: "300px" }} name="name" value={formItem.name} onChange={handleChange} />
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                name="category_id"
                value={formItem.category_id}
                label="Category"
                onChange={handleChange}
                sx={{ width: "300px" }}
              >
                {categories && categories.map((category) => (
                  <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiration Date"
                name="expirationDate"
                value={dayjs(formItem.expiration_date)}
                onChange={handleDatePickerChange}
              />
            </LocalizationProvider>
            <TextField autoFocus margin="dense" label="Quantity" variant="outlined" sx={{ width: "300px" }} name="count" value={formItem.count} onChange={handleChange} />
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