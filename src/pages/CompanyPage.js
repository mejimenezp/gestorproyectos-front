import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Paper, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import companyService from '../services/companyService'; 
import CompanyCard from '../components/CompanyCard';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyService.getCompanies();
        setCompanies(response.data); 
      } catch (error) {
        setError('Error fetching companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Navbar onMenuClick={handleSidebarToggle} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h4" gutterBottom>
             Empresas
            </Typography>
            <Grid container spacing={2}>
              {companies.length === 0 ? (
                <Typography>No companies available.</Typography>
              ) : (
                companies.map((company) => (
                  <Grid item xs={12} sm={6} md={4} key={company.id}>
                    <CompanyCard company={company} />
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyPage;
