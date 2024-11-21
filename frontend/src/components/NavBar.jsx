import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext'

const NavBar = () => {
  const { mode, setMode } = useThemeContext();
  return (
    <Box>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          component={Link} to="/"
        >
          <img src="favicon.png" alt="Logo" style={{ width: 40, height: 40 }} />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} component={Link} to="/">
          ITU Biblioteca
        </Typography>
        <IconButton component={Link} to="/create-book">
          <AddBoxIcon />
        </IconButton>
        <IconButton onClick={() => setMode((prevMode) => (prevMode == "dark" ? "light" : "dark"))}>
          {mode == "dark" ? <Brightness7Icon /> : <Brightness4Icon  />}
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default NavBar
