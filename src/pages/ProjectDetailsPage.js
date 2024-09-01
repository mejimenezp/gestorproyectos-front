import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Grid, CircularProgress, Alert, Paper, Divider, IconButton  } from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UserStoryCard from '../components/UserStoryCard';
import projectService from '../services/projectService';
import userStoryService from '../services/userStoryService';
import CreateUserStoryModal from '../modals/CreateUserStoryModal';
import { InfoOutlined, AddCircleOutline } from '@mui/icons-material';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [userStories, setUserStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createUserStoryModalOpen, setCreateUserStoryModalOpen] = useState(false);

  const fetchProjectDetails = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedProject = await projectService.getProject(id);
      setProject(fetchedProject);

      const fetchedUserStories = await userStoryService.getUserStoriesByProject(id);
      setUserStories(fetchedUserStories);
    } catch (error) {
      setError(error.message || 'Error fetching project details');
      toast.error('Error fetching project details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleSidebarToggle = () => setSidebarOpen(prev => !prev);
  const handleCreateUserStory = () => setCreateUserStoryModalOpen(true);
  const handleCloseCreateUserStoryModal = () => setCreateUserStoryModalOpen(false);

  const fetchUserStories = async () => {
    try {
      const fetchedUserStories = await userStoryService.getUserStoriesByProject(id);
      setUserStories(fetchedUserStories);
    } catch (error) {
      toast.error('Error fetching user stories');
    }
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

  if (!project) {
    return <Typography variant="h6">Project not found</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8, overflow: 'auto' }}
        >
           <Typography variant="h4" gutterBottom>
              Proyecto
            </Typography>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2, boxShadow: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                {project.name}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                {project.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2, width: 'fit-content', fontSize: '1.1rem', padding: '10px 20px' }}
                onClick={handleCreateUserStory}
              >
                <AddCircleOutline sx={{ mr: 1 }} />
                Crear Historia de Usuario
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {userStories.length === 0 ? (
              <Typography>No user stories available for this project.</Typography>
            ) : (
              <Grid container spacing={2}>
                {userStories.map((story) => (
                  <Grid item xs={12} sm={6} md={4} key={story.id}>
                    <UserStoryCard userStory={story} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
          <CreateUserStoryModal
            open={createUserStoryModalOpen}
            handleClose={handleCloseCreateUserStoryModal}
            fetchUserStories={fetchUserStories}
            projectId={project.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetailsPage;