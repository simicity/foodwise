import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
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
import { API_URL } from '../main'

const ShoppingListFoodItemForm = ({ selectedItem, callback }) => {
  const fridge_id = useParams().id
  const [item, setItem] = useState({name: "", category_id: "", count: ""})
  const [categories, setCategories] = useState([])
  const isOpenShoppingListFoodItemForm = useSelector(state => state.openShoppingListFoodItemForm.flag)
  const user = useSelector(state => state.user.user)
  const mode = useSelector(state => state.openShoppingListFoodItemForm.editMode)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target
    setItem({...item, [name]: value})
  }

  const handleSubmit = () => {
    const addItem = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: item.name, category_id: item.category_id, count: item.count, user_id: user.id})
      }

      await fetch(`${API_URL}/api/shopping-items/fridge/${fridge_id}`, options)
    }

    const editItem = async () => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: item.name, category_id: item.category_id, count: item.count, user_id: user.id, fridge_id: fridge_id})
      }

      await fetch(`${API_URL}/api/shopping-items/${item.id}`, options)
    }

    if(mode == "add") {
      addItem()
      .then(() => {
        callback()
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      editItem()
      .then(() => {
        callback()
      })
      .catch((err) => {
        console.log(err)
      })
    }

    dispatch(setCloseShoppingListFoodItemForm())
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_URL}/api/food-categories`)
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
    .catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    const updateFormItem = () => {
      if(mode == "add") {
        setItem({name: "", category_id: "", count: ""})
      } else {
        setItem({...selectedItem})
      }
    }

    updateFormItem()
  }, [mode, selectedItem])

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
                name="category_id"
                value={item.category_id}
                label="Category"
                onChange={handleChange}
                sx={{ width: "300px" }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField autoFocus margin="dense" label="Quantity" variant="outlined" sx={{ width: "300px" }} name="count" value={item.count} onChange={handleChange} />
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