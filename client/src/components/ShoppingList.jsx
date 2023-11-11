import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setOpenFridgeFoodItemForm, setFridgeFoodItemFormEditMode } from '../slices/openFridgeFoodItemForm'
import { setOpenShoppingListFoodItemForm, setShoppingListItemFormEditMode } from '../slices/openShoppingListFoodItemForm'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Tooltip from '@mui/material/Tooltip'
import FridgeFoodItemForm from './FridgeFoodItemForm'
import ShoppingListFoodItemForm from "../components/ShoppingListFoodItemForm"
import { API_URL } from '../main'
import { EditMode } from '../constants'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const ShoppingList = () => {
  const fridge_id = useParams().id
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({name: "", category_id: "", count: ""})
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()

  const handleAddToFridgeClick = (item) => {
    setSelectedItem(item)
    dispatch(setFridgeFoodItemFormEditMode(EditMode.ADD_WITH_DATA))
    dispatch(setOpenFridgeFoodItemForm())
  }

  const updateItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/shopping-items/fridge/${fridge_id}`)
      const data = await response.json()
      setItems(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditClick = (item) => {
    setSelectedItem(item)
    dispatch(setShoppingListItemFormEditMode(EditMode.EDIT))
    dispatch(setOpenShoppingListFoodItemForm())
  }

  const handleDeleteClick = async (item) => {
    const options = {
      method: 'DELETE'
    }

    setItems(items.filter((i) => i.id !== item.id))
    try {
      await fetch(`${API_URL}/api/shopping-items/${item.id}`, options)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/food-categories`)
        const data = await response.json()
        setCategories(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchCategories()
    updateItems()
  }, [fridge_id])

  return (
    <>
      {/* Shopping List */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
                <StyledTableCell>Food Item</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Count</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
          </TableHead>
          <TableBody>
            {(items && items.length > 0) ? items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="item">{item.name}</TableCell>
                <TableCell align="center">{(item.category_id !== null && categories.length > 0 ) ? categories.filter((category) => category.id == item.category_id)[0].name : ""}</TableCell>
                <TableCell align="center">{item.count}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" display="flex" justifyContent="end">
                    <Tooltip title="Add to Shopping List">
                      <IconButton onClick={() => handleAddToFridgeClick(item)}>
                        <CheckIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(item)}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteClick(item)}>
                        <RemoveCircleOutlineIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No food items in the shopping list</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Fridge Food Item Form */}
      <FridgeFoodItemForm selectedItem={selectedItem} callback={() => {}} />

      {/* Add Shopping List Food Item Form */}
      <ShoppingListFoodItemForm selectedItem={selectedItem} callback={updateItems} />
    </>
  )
}

export default ShoppingList