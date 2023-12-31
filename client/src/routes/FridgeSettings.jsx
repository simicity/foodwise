import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_URL } from '../main'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const FridgeSettings = () => {
  const fridge_id = useParams().id
  const [fridge, setFridge] = useState([])
  const [fridgeName, setFridgeName] = useState("")
  const user = useSelector(state => state.user.user)
  const [members, setMembers] = useState([])
  const [manager, setManager] = useState({ username: "", avatarurl: "" })
  const [emailToInvite, setEmailToInvite] = useState("")
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")

  const handleFridgeNameChange = (event) => {
    const { value } = event.target
    setFridgeName(value)
  }

  const handleFridgeNameSubmit = () => {
    const editFridgeName = async () => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: fridgeName})
      }

      const response = await fetch(`${API_URL}/api/fridges/${fridge_id}`, options)
      const data = await response.json()
      setFridge(data)
    }

    editFridgeName()
  }

  const handleDeleteFridge = () => {
    const deleteFridge = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }

      try {
        const res = await fetch(`${API_URL}/api/fridges/${fridge_id}`, options)
        if (res.status === 200) {
          window.location.href = "/"
        } else {
          setAlertMessage("Not allowed to delete fridge")
          setOpen(true);
          const data = await res.json()
          console.error(data.error)
        }
      } catch (err) {
        console.log(err)
      }
    }

    deleteFridge()
  }

  const handleRemoveMember = (member) => {
    const removeMember = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: member.id}),
        credentials: 'include'
      }

      if(member.id === manager.id) {
        console.error("Cannot remove manager")
        return
      }

      try {
        const res = await fetch(`${API_URL}/api/fridges-users/${fridge_id}`, options)
        if (res.status === 200) {
          setMembers((prev) => prev.filter((prevMember) => prevMember.id !== member.id))
        } else {
          setAlertMessage("Not allowed to remove member")
          setOpen(true);
          const data = await res.json()
          console.error(data.error)
        }
      } catch (err) {
        console.log(err)
      }
    }

    removeMember()
  }

  const handleInviteEmailChange = (event) => {
    const { value } = event.target
    setEmailToInvite(value)
  }

  const handleInviteSubmit = async () => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/email/${emailToInvite}`)
        const data = await response.json()
        return data
      }
      catch (err) {
        console.log(err)
      }
    }

    const addMember = async () => {
      const usersByEmail = await fetchUsers()
      if(usersByEmail.length !== 1) {
        setAlertMessage("User does not exist")
        setOpen(true);
        setEmailToInvite("")
        console.log("User does not exist or multiple users with the same email")
        return
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailToInvite}),
        credentials: 'include'
      }

      if(members.filter((member) => member.email === emailToInvite).length > 0) {
        console.error("User already exists")
        setEmailToInvite("")
        return
      }
      try {
        const res = await fetch(`${API_URL}/api/fridges-users/fridge/${fridge_id}`, options)
        if (res.status === 201) {
          setMembers((prev) => [...prev, usersByEmail[0]])
        }
        else {
          setAlertMessage("Not allowed to invite member")
          setOpen(true);
          const data = await res.json()
          console.error(data.error)
        }
        setEmailToInvite("")
      } catch (err) {
        console.log(err)
      }
    }

    addMember()
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchFridge = async () => {
      if(user === null || user.id === undefined) return

      try {
        const response = await fetch(`${API_URL}/api/fridges/${fridge_id}}`)
        const data = await response.json()
        setFridge(data)
        setFridgeName(data.name)
      } catch (err) {
        console.log(err)
      }
    }

    fetchFridge()
  }, [user, fridge_id])

  useEffect(() => {
    const getMembers = async () => {
      const response = await fetch(`${API_URL}/api/fridges-users/users/${fridge_id}`)
      const data = await response.json()
      setMembers(data)
    }

    getMembers()
  }, [fridge_id])

  useEffect(() => {
    const getManager = async () => {
      const managerData = members.filter((member) => member.id === fridge.user_id)[0]
      if(managerData) setManager({...managerData})
    }

    getManager()
  }, [fridge, members])

  return (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <IconButton component="a" href={`/fridge/${fridge.id}`}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" component="div" fontWeight={"bold"} ml={1}>{fridge.name} Settings</Typography>
      </Stack>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Fridge Name</Typography>
        <Stack direction="row">
          <TextField variant="outlined" value={fridgeName} size="small" onChange={handleFridgeNameChange} />
          <Button variant="contained" onClick={handleFridgeNameSubmit} sx={{ ml: 2 }}>Update</Button>
        </Stack>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Fridge Manager</Typography>
        <Stack direction="row" key={manager.id}>
          <Avatar alt={manager.username} src={manager.avatarurl} sx={{ width: 30, height: 30 }} />
          <Typography variant="body1" component="span" sx={{ my: "auto", ml: 1 }}>{manager.username}</Typography>
        </Stack>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Fridge Members</Typography>
        {members && members.length > 0 ? (
          members.map((member) => (
          <Stack direction="row" key={member.id} mb={1}>
            <Stack direction="row" sx={{ flexGrow: 1 }}>
              <Avatar alt={member.username} src={member.avatarurl} sx={{ width: 30, height: 30, mr: 1 }} />
              <Typography variant="body1" component="span" key={member.id} sx={{ my: "auto", ml: 1 }}>{member.username}</Typography>
            </Stack>
            {(member.id !== manager.id) && (
              <Button variant="outlined" onClick={() => handleRemoveMember(member)} color="warning" sx={{ ml: 2 }}>Remove</Button>
            )}
          </Stack>
        ))) : (
          <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>No member</Typography>
        )}
        <Stack direction="row" mt={2}>
          <TextField variant="outlined" value={emailToInvite} placeholder="Input email address of the user to invite" size="small" onChange={handleInviteEmailChange} sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={handleInviteSubmit} sx={{ ml: 2 }}>Invite</Button>
        </Stack>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Delete Fridge</Typography>
        <Button variant="contained" onClick={handleDeleteFridge} color="error" size="large">Delete</Button>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default FridgeSettings