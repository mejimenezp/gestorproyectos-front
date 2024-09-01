import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import TicketForm from '../components/TicketForm';
import { toast } from 'react-toastify';
import ticketService from '../services/ticketService';
import userStoryService from '../services/userStoryService';

const EditTicketModal = ({ open, handleClose, ticket, fetchTickets }) => {
    const [userStories, setUserStories] = useState([]);

    useEffect(() => {
        const fetchUserStories = async () => {
            try {
                const fetchedUserStories = await userStoryService.getUserStories();
                setUserStories(fetchedUserStories);
            } catch (error) {
                toast.error('Error fetching user stories');
            }
        };

        fetchUserStories();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            await ticketService.updateTicket(ticket.id, formData);
            toast.success('Ticket updated successfully');
            fetchTickets();
            handleClose();
        } catch (error) {
            toast.error('Failed to update ticket');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-ticket-modal"
            aria-describedby="edit-ticket-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Edit Ticket
                </Typography>
                <TicketForm
                    ticket={ticket}
                    onSuccess={handleClose}
                    userStories={userStories}
                    onSubmit={handleSubmit}
                />
                <Button onClick={handleClose} variant="outlined" color="error" sx={{ mt: 2 }}>
                    Close
                </Button>
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

export default EditTicketModal;
