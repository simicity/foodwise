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
function createData(name, category, addedDate, expirationDate, count) {
  return { name, category, addedDate, expirationDate, count };
}

const rows = [
  createData('Frozen yoghurt', "Dairy", 6.0, 24, 4.0),
  createData('Ice cream sandwich', "Dairy", 9.0, 37, 4.3),
  createData('Eclair', "Sweets", 16.0, 24, 6.0),
  createData('Cupcake', "Sweets", 3.7, 67, 4.3),
  createData('Gingerbread', "Sweets", 16.0, 49, 3.9),
];
/* dummy data end */

const FridgeList = () => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
              <StyledTableCell>Food Item</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Added Date</StyledTableCell>
              <StyledTableCell align="right">Expiration Date</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
              <StyledTableCell align="right">Shopping List</StyledTableCell>
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
              <TableCell align="right">{row.addedDate}</TableCell>
              <TableCell align="right">{row.expirationDate}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" size="small">Add</Button>
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
  );
}

export default FridgeList