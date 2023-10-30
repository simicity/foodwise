import { useState } from "react"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"
import FridgeList from "../components/FridgeList"
import Button from "@mui/material/Button"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ShoppingList from "../components/ShoppingList"

const Fridge = () => {
  const fridge_id = useParams().id
  const [fridge, setFridge] = useState({id: fridge_id, name: "Fridge 1"}) // TODO: dummy data for UI testing; get fridge data from API
  const [listType, setListType] = useState('fridgeList');

  const handleListTypeChange = (event, newListType) => {
    setListType(newListType);
  };

  return (
    <>
      {/* Header */}
      <Box display="flex" mb={3}>
        <Typography variant="h4" component="div" fontWeight={"bold"} sx={{ flexGrow: 1 }}>{fridge.name}</Typography>
        <Box>
          <ToggleButtonGroup
            value={listType}
            exclusive
            onChange={handleListTypeChange}
            aria-label="ListType"
            size="small"
          >
            <ToggleButton value="fridgeList">Fridge List</ToggleButton>
            <ToggleButton value="shoppingList">Shopping List</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" sx={{ ml: 2 }}>Add Food</Button>
        </Box>
      </Box>
      {/* Fridge and Shopping List */}
      {listType == "fridgeList" ? <FridgeList /> : <ShoppingList />}
    </>
  )
}

export default Fridge