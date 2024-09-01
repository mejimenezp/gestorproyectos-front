import React from 'react';
import { List, ListItem, ListItemButton, ListItemDecorator, Typography, Sheet } from '@mui/joy';
import { Home, AccountTree, CodeOffIcon, Business } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Sheet
      sx={{
        width: 250,
        height: '100vh',
        boxShadow: 'lg',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f6f9',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        level="h5"
        sx={{
          p: 2,
          textAlign: 'center',
          color: '#3f51b5', 
          fontWeight: 'bold',
        }}
      >
        Gestión de Proyectos
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        <ListItem>
          <ListItemButton
            onClick={() => navigate('/dashboard')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd', 
              },
            }}
          >
            <ListItemDecorator>
              <Home sx={{ color: '#3f51b5' }} /> 
            </ListItemDecorator>
            Dashboard
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => navigate('')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd', 
              },
            }}
          >
            <ListItemDecorator>
              <AccountTree sx={{ color: '#3f51b5' }} /> 
            </ListItemDecorator>
            Proyectos
          </ListItemButton>
        </ListItem>
      </List>

      <List sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 'auto' }}>
        <ListItem>
          <ListItemButton
            onClick={() => navigate('/companies')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          >
            <ListItemDecorator>
              <Business sx={{ color: '#3f51b5' }} />
            </ListItemDecorator>
            Compañías
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => navigate('/Codigos')}
            sx={{
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e3f2fd',
              },
            }}
          >
            <ListItemDecorator>
              <CodeIcon   sx={{ color: '#3f51b5' }} /> 
            </ListItemDecorator>
            Codigo fuente
          </ListItemButton>
        </ListItem>
      </List>
    </Sheet>
  );
}

export default Sidebar;
