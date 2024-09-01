import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import ProjectForm from '../components/ProjectForm';
import { toast } from 'react-toastify';
import { createProject } from '../services/projectService';

const CreateProjectModal = ({ open, handleClose, fetchProjects }) => {
    const handleSubmit = async (data) => {
        try {
            await createProject(data);
            toast.success('Project created successfully');
            fetchProjects();
            handleClose();
        } catch (error) {
            toast.error('Failed to create project');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-project-modal"
            aria-describedby="create-project-description"
        >
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Create Project
                </Typography>
                <ProjectForm onSubmit={handleSubmit} />
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

export default CreateProjectModal;
