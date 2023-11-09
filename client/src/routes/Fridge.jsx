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
import FridgeMembers from "../components/FridgeMembers.jsx"
import { API_URL } from "../main"
import { EditMode } from "../constants"

const Fridge = () => {
  const fridge_id = useParams().id
  const user = useSelector(state => state.user.user)
  const [fridge, setFridge] = useState("")
  const [members, setMembers] = useState([])
  const listType = useSelector(state => state.listType.listType)
  const dispatch = useDispatch()

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
      <Box display="flex">
        <Box sx={{ flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="h4" component="div" fontWeight={"bold"}>{fridge.name}</Typography>
        </Box>
        <FridgeMembers />
        {user && user.id == fridge.user_id && (
          <IconButton component="a" href={`/fridge/${fridge.id}/settings`} sx={{ margin: "auto" }}>
            <MoreHorizIcon fontSize="large" />
          </IconButton>
        )}
      </Box>

      {/* Sub Header */}
      <Box display="flex" mb={1}>
        <Typography variant="subtitle2" component="div"><b>Manager: </b>{members.find((member) => member?.user_id === fridge?.user_id)?.username}</Typography>
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
        <Button variant="contained" onClick={() => { listType == "fridgeList" ? dispatch(setOpenFridgeFoodItemForm()) && dispatch(setFridgeFoodItemFormEditMode(EditMode.ADD)) : dispatch(setOpenShoppingListFoodItemForm()) && dispatch(setShoppingListItemFormEditMode(EditMode.ADD))}} sx={{ position: 'absolute', right: 0, ml: 2 }}>Add Food</Button>
      </Box>

      {/* Fridge and Shopping List */}
      {listType == "fridgeList" ? <FridgeList /> : <ShoppingList />}
    </>
  )
}

export default Fridge