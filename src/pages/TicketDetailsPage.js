import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import ticketService from '../services/ticketService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EditTicketModal from '../modals/EditTicketModal';

const TicketDetailsPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const fetchTicketDetails = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTicket = await ticketService.getTicket(id);
      setTicket(fetchedTicket);
    } catch (error) {
      setError('Error fetching ticket details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTicketDetails();
  }, [fetchTicketDetails]);

  const handleEditClick = () => setIsEditing(true);
  const handleCloseEdit = () => setIsEditing(false);

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
              Ticket
            </Typography>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
            {ticket && (
              <>
                <Typography variant="h4" gutterBottom>
                  {ticket.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {ticket.comments}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Status: <strong>{ticket.status}</strong>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, fontSize: '0.875rem', padding: '6px 12px', alignSelf: 'flex-start' }}
                  onClick={handleEditClick}
                >
                  Edit Ticket
                </Button>
                {isEditing && (
                  <EditTicketModal
                    open={isEditing}
                    handleClose={handleCloseEdit}
                    ticket={ticket}
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

export default TicketDetailsPage;
