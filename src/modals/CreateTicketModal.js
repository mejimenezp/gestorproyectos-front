import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import TicketForm from '../components/TicketForm';
import { toast } from 'react-toastify';
import ticketService from '../services/ticketService';

const CreateTicketModal = ({ open, handleClose, fetchTickets, userStoryId }) => {
    const handleSubmit = async (formData) => {
        try {
            await ticketService.createTicket({ ...formData, userStory: userStoryId });
            fetchTickets(); 
            handleClose(); 
        } catch (error) {
            console.error('Error creating ticket:', error);
            toast.error('Error creating ticket');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-ticket-modal"
            aria-describedby="create-ticket-description"
        >
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Crear Ticket
                </Typography>
                <TicketForm onSubmit={handleSubmit} />
                <Button onClick={handleClose} variant="outlined" color="error">Close</Button>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default CreateTicketModal;
