import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import UserStoryForm from '../components/UserStoryForm';
import { toast } from 'react-toastify';
import userStoryService from '../services/userStoryService';

const CreateUserStoryModal = ({ open, handleClose, fetchUserStories, projectId }) => {
    const handleSubmit = async (formData) => {
        try {
            await userStoryService.createUserStory({ ...formData, project: projectId });
            fetchUserStories(); 
            handleClose(); 
        } catch (error) {
            console.error('Error creating user story:', error);
            toast.error('Error creating user story');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-user-story-modal"
            aria-describedby="create-user-story-description"
        >
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Create User Story
                </Typography>
                <UserStoryForm onSubmit={handleSubmit} />
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

export default CreateUserStoryModal;
