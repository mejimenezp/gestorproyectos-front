import React from 'react';
import { Card, CardContent, Typography, Chip, Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const TicketCard = ({ ticket }) => {
  return (
    <Card sx={{ 
      marginBottom: 2, 
      borderRadius: 2, 
      boxShadow: 3, 
      bgcolor: 'background.paper',
      ':hover': {
        boxShadow: 6,
        transform: 'scale(1.02)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }
    }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Ticket: {ticket.title}
        </Typography>
        <Chip
          label={ticket.status}
          color={ticket.status === 'COMPLETED' ? 'success' : 'warning'}
          sx={{ marginBottom: 1 }}
        />
        <Typography variant="body2" color="text.primary" paragraph>
          User Story: {ticket.user_story?.title || 'No User Story'}
        </Typography>
        <Tooltip title="View ticket details" arrow>
          <Button
            component={Link}
            to={`/tickets/${ticket.id}`}
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            Ver detalles 
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
