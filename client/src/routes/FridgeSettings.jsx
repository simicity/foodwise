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

const FridgeSettings = () => {
  const fridge_id = useParams().id
  const [fridge, setFridge] = useState([])
  const [fridgeName, setFridgeName] = useState("")
  const user = useSelector(state => state.user.user)
  const [members, setMembers] = useState([])
  const [manager, setManager] = useState({ username: "", avatarurl: "" })
  const [emailToInvite, setEmailToInvite] = useState("")

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
        }
      }

      await fetch(`${API_URL}/api/fridges/${fridge_id}`, options)
    }

    deleteFridge()
    .then(() => {
      window.location.href = "/"
    })
  }

  const handleRemoveMember = (member) => {
    const removeMember = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: member.user_id})
      }

      if(member.user_id === manager.user_id) {
        console.error("Cannot remove manager")
      } 
      await fetch(`${API_URL}/api/fridges-users/${fridge_id}`, options)
      setMembers((prev) => prev.filter((prevMember) => prevMember.user_id !== member.user_id))
    }

    removeMember()
  }

  const handleInviteEmailChange = (event) => {
    const { value } = event.target
    setEmailToInvite(value)
  }

  const handleInviteSubmit = async () => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/api/users/email/${emailToInvite}`)
      const data = await response.json()
      return data
    }

    const addMember = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: emailToInvite})
      }

      if(members.filter((member) => member.email === emailToInvite).length > 0) {
        console.error("User already exists")
        return
      }
      await fetch(`${API_URL}/api/fridges-users/fridge/${fridge_id}`, options)
    }

    const usersByEmail = await fetchUsers()
    console.log(usersByEmail)
    if(usersByEmail.length !== 1) {
      console.log("User does not exist or multiple users with the same email")
      return
    }

    addMember()
    .then(() => {
      setMembers((prev) => [...prev, usersByEmail[0]])
    })
  }

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
      const managerData = members.filter((member) => member.user_id === fridge.user_id)[0]
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
            {(member.user_id !== manager.user_id) && (
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
    </>
  )
}

export default FridgeSettings