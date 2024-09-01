import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper, Divider, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import UserStoryCard from '../components/UserStoryCard';
import TicketCard from '../components/TicketCard';
import projectService from '../services/projectService';
import userStoryService from '../services/userStoryService';
import ticketService from '../services/ticketService';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [userStories, setUserStories] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingUserStories, setLoadingUserStories] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const projectsData = await projectService.getProjects();
        const userStoriesData = await userStoryService.getUserStories();
        const ticketsData = await ticketService.getTickets();

        setProjects(projectsData);
        setUserStories(userStoriesData);
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingProjects(false);
        setLoadingUserStories(false);
        setLoadingTickets(false);
      }
    };

    loadData();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: 3,
            mt: 8,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {loadingProjects || loadingUserStories || loadingTickets ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                Loading data...
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Proyectos
                  </Typography>
                  {projects.length === 0 ? (
                    <Typography>No projects available</Typography>
                  ) : (
                    projects.map(project => <ProjectCard key={project.id} project={project} />)
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Historias de Usuario
                  </Typography>
                  {userStories.length === 0 ? (
                    <Typography>No user stories available</Typography>
                  ) : (
                    userStories.map(userStory => <UserStoryCard key={userStory.id} userStory={userStory} />)
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Tickets
                  </Typography>
                  {tickets.length === 0 ? (
                    <Typography>No tickets available</Typography>
                  ) : (
                    tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
