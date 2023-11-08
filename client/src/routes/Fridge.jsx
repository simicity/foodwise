import { useState, useEffect } from "react"
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
import { API_URL } from "../main"

const Fridge = () => {
  const fridge_id = useParams().id
  const user = useSelector(state => state.user.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [fridge, setFridge] = useState("")
  const [members, setMembers] = useState([])
  const [fridgeNameEdit, setFridgeNameEdit] = useState("")
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
    const editFridge = async () => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...fridge, name: fridgeNameEdit })
      }

      await fetch(`${API_URL}/api/fridges/${fridge_id}`, options)
    }

    editFridge()
    .then(() => {
      window.location.href = `/fridge/${fridge_id}`
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
    handleMenuClose()
  }

  const handleSubmitDelete = () => {
    const deleteFridge = async () => {
      const options = {
        method: 'DELETE'
      }

      await fetch(`${API_URL}/api/fridges/${fridge_id}`, options)
    }

    deleteFridge()
    .then(() => {
      window.location.href = '/'
    })
    .catch((err) => {
      console.log(err)
    })
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

  useEffect(() => {
    const fetchFridges = async () => {
      const response = await fetch(`${API_URL}/api/fridges/${fridge_id}}`)
      const data = await response.json()
      setFridge(data)
      setFridgeNameEdit(data.name)
    }

    const fetchMembers = async () => {
      const response = await fetch(`${API_URL}/api/fridges-users/users/${fridge_id}}`)
      const data = await response.json()
      setMembers(data)
    }

    fetchFridges()
    .catch((err) => {
      console.log(err)
    })
    fetchMembers()
    .catch((err) => {
      console.log(err)
    })
  }, [fridge_id])

  return (
    <>
      {/* Header */}
      <Box display="flex" mb={1}>
        <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="h4" component="div" fontWeight={"bold"}>{fridge.name}</Typography>
          <Typography variant="subtitle2" component="div">Creator: {members.find((member) => member?.user_id === fridge?.user_id)?.username}</Typography>
        </Box>
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
          {user && user.id == fridge.user_id && <MenuItem onClick={handleOpenDelete}>Delete Fridge</MenuItem>}
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
    </>
  )
}

export default Fridge