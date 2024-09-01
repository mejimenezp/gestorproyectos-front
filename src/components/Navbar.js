import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Logout, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import '../styles/Navbar.css';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <img 
          img src={logo}
          alt="Logo" 
          className="navbar-logo" 
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }} className="navbar-title">
          Gestor de Proyectos
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          sx={{ ml: 2 }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <AccountCircle />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} />
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
