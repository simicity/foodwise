import { useState } from "react"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

const AddFridgeCard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
  }

  return (
    <>
      <Card variant="outlined">
        <CardActionArea onClick={handleClickOpen} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "150px", p: 2 }} >
          <AddCircleIcon fontSize="large" sx={{ color: '#F4D03F' }} />
        </CardActionArea>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Fridge</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Fridge Name" variant="outlined" sx={{ width: "300px" }} />
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddFridgeCard