import { useState } from "react"
import { useSelector } from "react-redux"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { API_URL } from "../main"

const AddFridgeCard = ({callback}) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const disableButton = name.length >= 3 ? false : true
  const user = useSelector(state => state.user.user)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const createFridge = async () => {
      if(user === null || user.id === undefined) return

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, user_id: user.id })
      }

      const response = await fetch(`${API_URL}/api/fridges`, options)
      const data = await response.json()
      return data.id
    }

    createFridge()
    .then(() => {
      setName('')
      setOpen(false)
      callback()
    })
    .catch((err) => {
      console.log(err)
    })
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
          <TextField autoFocus margin="dense" label="Fridge Name" variant="outlined" value={name} onChange={handleChange} sx={{ width: "300px" }} />
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleSubmit} disabled={disableButton}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddFridgeCard