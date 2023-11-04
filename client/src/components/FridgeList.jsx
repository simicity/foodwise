import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import FridgeFoodItemForm from './FridgeFoodItemForm'
import ShoppingListFoodItemForm from "../components/ShoppingListFoodItemForm"

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

/* dummy data */
function createData(name, category, addedDate, expirationDate, count) {
  return { name, category, addedDate, expirationDate, count }
}
/* dummy data end */

const FridgeList = () => {
  const [items, setItems] = useState([
    createData('Frozen yoghurt', "Dairy", 6.0, 24, 4.0),
    createData('Ice cream sandwich', "Dairy", 9.0, 37, 4.3),
    createData('Eclair', "Sweets", 16.0, 24, 6.0),
    createData('Cupcake', "Sweets", 3.7, 67, 4.3),
    createData('Gingerbread', "Sweets", 16.0, 49, 3.9),
  ])
  const isOpenFridgeFoodItemForm = useSelector(state => state.openFridgeFoodItemForm.flag)
  const isOpenShoppingListFoodItemForm = useSelector(state => state.openShoppingListFoodItemForm.flag)
  const dispatch = useDispatch()

  const handleCountUp = useCallback((index) => {
    items[index].count += 1
    setItems([...items])
  }, [items])

  const handleCountDown = useCallback((index) => {
    if(items[index].count <= 0) return
    items[index].count -= 1
    setItems([...items])
  }, [items])

  const handleAddToShoppingListClick = () => {
    dispatch(setShoppingListItemFormEditMode("add"))
    dispatch(setOpenShoppingListFoodItemForm())
  }

  const handleEditClick = () => {
    dispatch(setFridgeFoodItemFormEditMode("edit"))
    dispatch(setOpenFridgeFoodItemForm())
  }

  const handleDeleteClick = () => {
    
  }

  return (
    <>
      {/* Fridge List */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
                <StyledTableCell>Food Item</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Added Date</StyledTableCell>
                <StyledTableCell align="center">Expiration Date</StyledTableCell>
                <StyledTableCell align="center">Count</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
          </TableHead>
          <TableBody>
            {(items && items.length > 0) ? items.map((item, index) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.addedDate}</TableCell>
                <TableCell align="center">{item.expirationDate}</TableCell>
                <TableCell align="center">
                  <Stack direction="row">
                    <IconButton
                      fontSize="small"
                      onClick={() => handleCountUp(index)}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: "center", m: "auto" }}>
                      {item.count}
                    </Box>
                    <IconButton
                      fontSize="small"
                      onClick={() => handleCountDown(index)}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Stack> 
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" display="flex" justifyContent="end">
                    <Tooltip title="Add to Shopping List">
                      <IconButton onClick={handleAddToShoppingListClick}>
                        <AddShoppingCartIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={handleEditClick}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={handleDeleteClick}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Stack>           
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No food items in this fridge</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Fridge Food Item Form */}
      {isOpenFridgeFoodItemForm && <FridgeFoodItemForm />}

      {/* Add Shopping List Food Item Form */}
      {isOpenShoppingListFoodItemForm && <ShoppingListFoodItemForm />}
    </>
  )
}

export default FridgeList