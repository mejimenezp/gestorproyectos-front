import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AppWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('accessToken');
      if (token && authService.isTokenExpired(token)) {
        setOpen(true);
        authService.logout();
      }
    };

    checkToken();

    const interval = setInterval(checkToken, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sesión Expirada</DialogTitle>
        <DialogContent>
          Su sesión ha expirado. Por favor, inicie sesión nuevamente.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppWrapper;
