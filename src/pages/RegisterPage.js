import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Typography, Button, Sheet, CircularProgress, Select, Option, Input } from '@mui/joy';
import '../styles/Register.css';
import authService from '../services/authService';  
import api from '../services/apiService';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get('/companies/');
        setCompanies(response.data);
      } catch (error) {
        setError('Error al cargar las compañías.');
        console.error('Error al cargar las compañías', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password || !email || !firstName || !lastName || !companyId) {
      setError('Por favor completa todos los campos.');
      return;
    }
    setIsLoading(true);
    try {
      await authService.register(username, password, email, firstName, lastName, parseInt(companyId, 10));
      navigate('/');
    } catch (error) {
      setError('Error en el registro. Verifica los datos e intenta de nuevo.');
      console.error('Error en el registro', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <CssBaseline />
      <Sheet sx={sheetStyles} variant="outlined">
        <Typography level="h4" component="h1" className="register-title" sx={{ textAlign: 'center' }}>
          Crear cuenta
        </Typography>
        {error && <Typography color="danger" aria-live="assertive" sx={{ mt: 1 }}>{error}</Typography>}
        <form onSubmit={handleSubmit} className="register-form">
          <Input
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Input
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Select
            placeholder="Selecciona tu compañía"
            value={companyId}
            onChange={(event, newValue) => setCompanyId(newValue)}
            sx={{ mt: 2, mb: 2 }}
          >
            {companies.map((company) => (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
          <Button type="submit" sx={{ mt: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size="sm" /> : 'Registrarse'}
          </Button>
        </form>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          ¿Ya tienes cuenta?{' '}
          <Button variant="text" onClick={() => navigate('/')}>
            Inicia Sesión
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

export default Register;
