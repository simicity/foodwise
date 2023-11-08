import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Toolbar from '@mui/material/Toolbar'
import Header from '../components/Header.jsx'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Outlet } from 'react-router-dom'
import { API_URL } from '../main'

const drawerWidth = 240

const Root = (props) => {
  const { window } = props
  const [fridges, setFridges] = useState([])
  const [open, setOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = useSelector(state => state.user.user)

  const handleNestedListToggle = () => {
    setOpen(!open)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    const fetchFridges = async () => {
      if(user === null || user.id === undefined) return
      const response = await fetch(`${API_URL}/api/fridges-users/fridges/${user.id}}`)
      const data = await response.json()
      setFridges(data)
    }

    fetchFridges()
    .catch((err) => {
      console.log(err)
    })
  }, [user])

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItemButton component="a" href="/">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={handleNestedListToggle}>
          <ListItemText primary="Fridge" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {open && (
            <List component="div" disablePadding>
            {fridges.map((fridge) => (
              <ListItemButton key={fridge.id} component="a" href={`/fridge/${fridge.id}`} sx={{ pl: 4 }}>
                <ListItemText primary={fridge.name} />
              </ListItemButton>
            ))}  
            </List>
          )}
        </Collapse>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: (theme) => theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
        <Divider />
      </AppBar>

      {/* Sidebar */}
      {user && user.id && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      {/* Main */}
      {user && user.id ? (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      ) : (
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar />
          <Box sx={{ m: "auto", mt: 10, maxWidth: "600px", textAlign: "center" }}>
            <Typography variant="h4" component="h1">Welcome to <b>Foodwise</b><br /> – Your ultimate food inventory manager!</Typography>
            <Typography variant="subtitle1" component="p" mt={2}>Say goodbye to pantry chaos and hello to easy organization. Keep track of your groceries, reduce food waste, and whip up delicious meals with confidence.</Typography>
            <Button variant='contained' component="a" href={`${API_URL}/auth/google`} size='large' color='primary' sx={{ mt: 6 }}>Get Started!</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

Root.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default Root