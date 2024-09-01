import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const GitHubLinksPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Navbar onMenuClick={handleSidebarToggle} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" gutterBottom>
              GitHub Repositories
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/mejimenezp/gestorproyectos-front"
                  target="_blank"
                >
                  Frontend
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/mejimenezp/gestorproyectos-back"
                  target="_blank"
                >
                  Backend
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default GitHubLinksPage;
