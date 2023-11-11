import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../main'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { setUser } from '../slices/user'

const AccountSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const [emailEdit, setEmailEdit] = useState("")

  const handleEmailChange = (event) => {
    const { value } = event.target
    setEmailEdit(value)
  }

  const handleEmailSubmit = () => {
    const editEmail = async () => {
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...user, "email": emailEdit})
      }

      const response = await fetch(`${API_URL}/api/users/${user.id}`, options)
      const data = await response.json()
      dispatch(setUser(data))
    }

    editEmail()
  }

  const handleDeleteUser = () => {
    const logout = async () => {
      const url = `${API_URL}/auth/logout`
      try {
        const response = await fetch(url, { credentials: 'include' })
        const json = await response.json()
        dispatch(setUser(json.user))
      } catch (err) {
        console.log(err)
      }
    }

    const deleteFridge = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      await fetch(`${API_URL}/api/users/${user.id}`, options)
    }

    logout()
    deleteFridge()
    .then(() => {
      window.location.href = "/"
    })
  }

  useEffect(() => {
    if(user.email && user.email.length > 0) {
      setEmailEdit(user.email)
    }
  }, [user])

  return (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <IconButton component="a" href={`/`}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4" component="div" fontWeight={"bold"} ml={1}>Account Settings</Typography>
      </Stack>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Username</Typography>
        <Typography variant="body1" component="div" mb={1}>{user.username}</Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Email</Typography>
        <Stack direction="row">
          <TextField variant="outlined" value={emailEdit} size="small" placeholder={"Register your email address"} onChange={handleEmailChange} sx={{ width: "100%" }} />
          <Button variant="contained" onClick={handleEmailSubmit} sx={{ ml: 2 }}>Update</Button>
        </Stack>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="div" fontWeight={"bold"} mb={1}>Delete Account</Typography>
        <Button variant="contained" onClick={handleDeleteUser} color="error" size="large">Delete</Button>
      </Box>
    </>
  )
}

export default AccountSettings