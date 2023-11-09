import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../slices/user'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { API_URL } from '../main'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const Header = () => {
  const user = useSelector(state => state.user.user)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const dispatch = useDispatch()

  const logout = async () => {
    const url = `${API_URL}/auth/logout`
    try {
      const response = await fetch(url, { credentials: 'include' })
      const json = await response.json()
      dispatch(setUser(json.user))
      window.location.href = '/'
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const settings = [
    {
      name: "Account Settings",
      onClick: handleCloseUserMenu
    },
    {
      name: "Logout",
      onClick: logout
    }
  ]

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' } )
        const json = await response.json()
        dispatch(setUser(json.user))
      } catch (err) {
        console.log(err)
      }
    }

    getUser()
  }, [dispatch])

  return (
    <>
      <Box component="img" src="/fridge.png" mr={2} sx={{ width: 25 }} />
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: (theme) => theme.palette.text.primary }}>
        Foodwise
      </Typography>
      {user && user.id ? (
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.username} src={user.avatarurl} />
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting.name} onClick={setting.onClick}>
                <Typography textAlign="center">{setting.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <Button component="a" href={`${API_URL}/auth/google`} sx={{ color: (theme) => theme.palette.text.primary }}>Login</Button>
      )}
    </>
  )
}

export default Header