import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Grid, Button, Box, CircularProgress, Alert, Paper } from '@mui/material';
import TicketCard from '../components/TicketCard';
import ticketService from '../services/ticketService';
import userStoryService from '../services/userStoryService';
import { useParams } from 'react-router-dom';
import CreateTicketModal from '../modals/CreateTicketModal';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/UserStoryDetailsPage.css';

const UserStoryDetailsPage = () => {
  const { id } = useParams();
  const [userStory, setUserStory] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchUserStoryDetails = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUserStory = await userStoryService.getUserStory(id);
      setUserStory(fetchedUserStory);

      const fetchedTickets = await ticketService.getTicketsByUserStory(id);
      setTickets(fetchedTickets);
    } catch (error) {
      setError(error.message || 'Error fetching user story details');
      toast.error('Error fetching user story details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserStoryDetails();
  }, [fetchUserStoryDetails]);

  const handleCreateTicket = () => {
    setSelectedTicket(null);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    setSelectedTicket(null);
    fetchTickets();
  };

  const fetchTickets = async () => {
    try {
      const fetchedTickets = await ticketService.getTicketsByUserStory(id);
      setTickets(fetchedTickets);
    } catch (error) {
      toast.error('Error fetching tickets');
    }
  };

  const handleSidebarToggle = () => setSidebarOpen(prev => !prev);

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
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
        >
          <Typography variant="h4" gutterBottom>
              Detalle Historias de Usuario
            </Typography>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
          
            {userStory && (
              <>
                <Typography variant="h4" gutterBottom>
                  {userStory.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {userStory.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mb: 2, width: 'fit-content', fontSize: '1.1rem', padding: '10px 20px' }}
                  onClick={handleCreateTicket}
                >
                  Create Ticket
                </Button>
                <Grid container spacing={2} marginTop={2}>
                  {tickets.length === 0 ? (
                    <Typography>No tickets available for this user story.</Typography>
                  ) : (
                    tickets.map((ticket) => (
                      <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <TicketCard ticket={ticket} />
                        {/* Removed Edit Button */}
                      </Grid>
                    ))
                  )}
                </Grid>
                {isEditing && (
                  <CreateTicketModal
                    open={isEditing}
                    handleClose={handleCloseEdit}
                    fetchTickets={fetchTickets}
                    userStoryId={userStory.id}
                  />
                )}
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UserStoryDetailsPage;
