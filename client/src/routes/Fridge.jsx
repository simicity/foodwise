import { useState } from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setOpenFridgeFoodItemForm, setFridgeFoodItemFormEditMode } from '../slices/openFridgeFoodItemForm'
import { setOpenShoppingListFoodItemForm, setShoppingListItemFormEditMode } from '../slices/openShoppingListFoodItemForm'
import { setFridgeList, setShoppingList } from '../slices/listType'
import FridgeList from "../components/FridgeList"
import Button from "@mui/material/Button"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ShoppingList from "../components/ShoppingList"
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import FridgeFoodItemForm from "../components/FridgeFoodItemForm"
import ShoppingListFoodItemForm from "../components/ShoppingListFoodItemForm"

const Fridge = () => {
  const fridge_id = useParams().id
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [fridge, setFridge] = useState({id: fridge_id, name: "Fridge 1"}) // TODO: dummy data for UI testing get fridge data from API
  const [fridgeNameEdit, setFridgeNameEdit] = useState(fridge.name)
  const listType = useSelector(state => state.listType.listType)
  const isOpenFridgeFoodItemForm = useSelector(state => state.openFridgeFoodItemForm.flag)
  const isOpenShoppingListFoodItemForm = useSelector(state => state.openShoppingListFoodItemForm.flag)
  const dispatch = useDispatch()

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
    handleMenuClose()
  }

  const handleSubmitEdit = () => {
    setOpenEdit(false)
    handleMenuClose()
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
    handleMenuClose()
  }

  const handleSubmitDelete = () => {
    setOpenDelete(false)
    handleMenuClose()
  }

  const handleFridgeNameChange = (event) => {
    const { value } = event.target
    setFridgeNameEdit(value)
  }

  const handleListTypeChange = (event, newListType) => {
    if(newListType == "fridgeList") {
      dispatch(setFridgeList())
    } else {
      dispatch(setShoppingList())
    }
  }

  return (
    <>
      {/* Header */}
      <Box display="flex" mb={1}>
        <Typography variant="h4" component="div" fontWeight={"bold"} sx={{ flexGrow: 1 }}>{fridge.name}</Typography>
        <IconButton
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleMenuClick}
          >
          <MoreHorizIcon fontSize="large" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleOpenEdit}>Edit Fridge name</MenuItem>
          <MenuItem onClick={handleOpenDelete}>Delete Fridge</MenuItem>
        </Menu>

        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Fridge name</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Fridge Name" variant="outlined" sx={{ width: "300px" }} value={fridgeNameEdit} onChange={handleFridgeNameChange} />
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleCloseEdit}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmitEdit}>Update</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Are you sure you want to delete this fridge?</DialogTitle>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleCloseDelete}>Cancel</Button>
            <Button variant='contained' onClick={handleSubmitDelete} color='error'>Delete</Button>
          </DialogActions>
        </Dialog>

      </Box>
      <Box display="flex" position="relative" justifyContent="center" mb={1}>
        <ToggleButtonGroup
          value={listType}
          exclusive
          onChange={handleListTypeChange}
          aria-label="ListType"
          size="small"
        >
          <ToggleButton value="fridgeList" sx={{ px: 2 }}>Fridge List</ToggleButton>
          <ToggleButton value="shoppingList" sx={{ px: 2 }}>Shopping List</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={() => { listType == "fridgeList" ? dispatch(setOpenFridgeFoodItemForm()) && dispatch(setFridgeFoodItemFormEditMode("add")) : dispatch(setOpenShoppingListFoodItemForm()) && dispatch(setShoppingListItemFormEditMode("add"))}} sx={{ position: 'absolute', right: 0, ml: 2 }}>Add Food</Button>
      </Box>

      {/* Fridge and Shopping List */}
      {listType == "fridgeList" ? <FridgeList /> : <ShoppingList />}

      {/* Add Fridge Food Item Form */}
      {isOpenFridgeFoodItemForm && <FridgeFoodItemForm />}

      {/* Add Shopping List Food Item Form */}
      {isOpenShoppingListFoodItemForm && <ShoppingListFoodItemForm />}
    </>
  )
}

export default Fridge