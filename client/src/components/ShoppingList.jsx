import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/* dummy data */
function createData(name, category, count) {
  return { name, category, count };
}

const rows = [
  createData('Frozen yoghurt', "Dairy", 6),
  createData('Ice cream sandwich', "Dairy", 9),
  createData('Eclair', "Sweets", 16),
  createData('Cupcake', "Sweets", 3),
  createData('Gingerbread', "Sweets", 1),
];
/* dummy data end */

const ShoppingList = () => {

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
              <StyledTableCell>Food Item</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
              <StyledTableCell align="right" />
            </TableRow>
        </TableHead>
        <TableBody>
          {(rows && rows.length > 0) ? rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" size="small">Add to Fridge</Button>
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
  )
}

export default ShoppingList