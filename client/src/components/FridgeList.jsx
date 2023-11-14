import { useState, useCallback, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpenFridgeFoodItemForm, setFridgeFoodItemFormEditMode } from '../slices/openFridgeFoodItemForm'
import { setOpenShoppingListFoodItemForm, setShoppingListItemFormEditMode } from '../slices/openShoppingListFoodItemForm'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
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
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import Pagination from '@mui/material/Pagination'
import { visuallyHidden } from '@mui/utils'
import { API_URL } from '../main'
import formatDate from '../utils.js'
import { EditMode } from '../constants'
import dayjs from 'dayjs'

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

const FridgeList = () => {
  const fridge_id = useParams().id
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState({ name: "", category_id: "", expiration_date: null, count: ""})
  const [categories, setCategories] = useState([])
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('added_date')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const dispatch = useDispatch()

  const rowsPerPage = useRef(10)

  const updateCountInDatabase = async (item) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: item.count})
    }

    await fetch(`${API_URL}/api/foods/${item.id}/count`, options)
  }

  const handleCountUp = useCallback((item) => {
    item.count += 1
    setItems([...items])
    updateCountInDatabase(item)
    .catch((err) => {
      console.log(err)
    })
  }, [items])

  const handleCountDown = useCallback((item) => {
    if(item.count <= 0) return
    item.count -= 1
    setItems([...items])
    updateCountInDatabase(item)
    .catch((err) => {
      console.log(err)
    })
  }, [items])

  const handleAddToShoppingListClick = (item) => {
    setSelectedItem(item)
    dispatch(setShoppingListItemFormEditMode(EditMode.ADD_WITH_DATA))
    dispatch(setOpenShoppingListFoodItemForm())
  }

  const updateItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/foods/fridge/${fridge_id}?sort=${orderBy}&order=${order}&page=${page}&limit=${rowsPerPage.current}`)
      const data = await response.json()
      setItems(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleEditClick = (item) => {
    setSelectedItem(item)
    dispatch(setFridgeFoodItemFormEditMode(EditMode.EDIT))
    dispatch(setOpenFridgeFoodItemForm())
  }

  const handleDeleteClick = async (item) => {
    const options = {
      method: 'DELETE'
    }

    setItems(items.filter((i) => i.id !== item.id))
    try {
      await fetch(`${API_URL}/api/foods/${item.id}`, options)
    } catch (err) {
      console.log(err)
    }
  }

  const isAboutToExpire = (date) => {
    const today = dayjs()
    const expirationDate = dayjs(date)
    const diff = expirationDate.diff(today, 'day')
    return diff <= 3
  }

  const sortHandler = (property) => {
    console.log(property)
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
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

  useEffect(() => {
    updateItems()
  }, [orderBy, order, page])

  useEffect(() => {
    const getItemsCount = async () => {
      try {
        const response = await fetch(`${API_URL}/api/foods/fridge/${fridge_id}`)
        const data = await response.json()
        setPageCount(Math.ceil(data.length / rowsPerPage.current))
      } catch (err) {
        console.log(err)
      }
    }
    getItemsCount()
  }, [])

  return (
    <>
      {/* Fridge List */}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
                <StyledTableCell>Food Item</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell
                  sortDirection={orderBy === 'added_date' ? order : false} 
                  align="center"
                >
                  <TableSortLabel
                    active={orderBy === 'added_date'}
                    direction={orderBy === 'added_date' ? order : 'asc'}
                    onClick={() => sortHandler('added_date')}
                    sx={{
                      '& .MuiTableSortLabel-icon': {
                        color: (theme) => theme.palette.common.white + " !important",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.common.black,
                        color: (theme) => theme.palette.common.white,
                        fontWeight: "bold",
                      }}
                    >
                      Added Date
                      {orderBy === 'added_date' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </Box>
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell
                  sortDirection={orderBy === 'expiration_date' ? order : false}
                  align="center"
                >
                  <TableSortLabel
                    active={orderBy === 'expiration_date'}
                    direction={orderBy === 'expiration_date' ? order : 'asc'}
                    onClick={() => sortHandler('expiration_date')}
                    sx={{
                      '& .MuiTableSortLabel-icon': {
                        color: (theme) => theme.palette.common.white + " !important",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: (theme) => theme.palette.common.black,
                        color: (theme) => theme.palette.common.white,
                        fontWeight: "bold",
                      }}
                    >
                      Expiration Date
                      {orderBy === 'expiration_date' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </Box>
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">Count</StyledTableCell>
                <StyledTableCell align="right" />
              </TableRow>
          </TableHead>
          <TableBody>
            {(items && items.length > 0) ? items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{isAboutToExpire(item.expiration_date) && <PriorityHighIcon color="error" fontSize="small" sx={{ mr: 1, my: "auto" }} />}{item.name}</TableCell>
                <TableCell align="center">{(item.category_id !== null && categories.length > 0 ) ? categories.filter((category) => category.id == item.category_id)[0].name : ""}</TableCell>
                <TableCell align="center">{formatDate(item.added_date)}</TableCell>
                <TableCell align="center">{formatDate(item.expiration_date)}</TableCell>
                <TableCell align="center">
                  <Stack direction="row">
                    <IconButton
                      fontSize="small"
                      onClick={() => handleCountUp(item)}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: "center", m: "auto" }}>
                      {item.count}
                    </Box>
                    <IconButton
                      fontSize="small"
                      onClick={() => handleCountDown(item)}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Stack> 
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" display="flex" justifyContent="end">
                    <Tooltip title="Add to Shopping List">
                      <IconButton onClick={() => handleAddToShoppingListClick(item)}>
                        <AddShoppingCartIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEditClick(item)}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDeleteClick(item)}>
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
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Stack>
      </TableContainer>

      {/* Add Fridge Food Item Form */}
      <FridgeFoodItemForm selectedItem={selectedItem} callback={updateItems} />

      {/* Add Shopping List Food Item Form */}
      <ShoppingListFoodItemForm selectedItem={selectedItem} callback={() => {}} />
    </>
  )
}

export default FridgeList