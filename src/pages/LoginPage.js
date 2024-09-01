import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Typography, Button, Sheet, Input, IconButton } from '@mui/joy';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from '../images/Logo.png';
import '../styles/Login.css';
import authService from '../services/authService';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Error en el inicio de sesión. Verifica tus credenciales.');
      console.error('Error en el inicio de sesión', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login-container">
      <CssBaseline />
      <Sheet sx={sheetStyles} variant="outlined">
        <img src={logo} alt="Logo" className="login-logo" />
        <Typography level="h4" component="h1" className="login-title">
          Iniciar Sesión
        </Typography>
        {error && <Typography color="danger" aria-live="assertive" sx={{ mt: 1 }}>{error}</Typography>}
        <form onSubmit={handleSubmit} className="login-form">
          <Input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endDecorator={
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />} 
              </IconButton>
            }
            sx={{ mb: 2 }}
          />
          <Button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          ¿No tienes cuenta?{' '}
          <Button variant="text" onClick={() => navigate('/register')}>
            Regístrate
          </Button>
        </Typography>
      </Sheet>
    </div>
  );
}

const sheetStyles = {
  width: 350,
  mx: 'auto',
  my: 4,
  py: 4,
  px: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  borderRadius: 'md',
  boxShadow: 'lg',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

export default Login;
