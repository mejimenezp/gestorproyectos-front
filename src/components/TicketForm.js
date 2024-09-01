import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import ticketService from '../services/ticketService';
import userStoryService from '../services/userStoryService';

const TicketForm = ({ ticket, onSuccess }) => {
  const [title, setTitle] = useState(ticket ? ticket.title : '');
  const [description, setDescription] = useState(ticket ? ticket.description : ''); 
  const [status, setStatus] = useState(ticket ? ticket.status : 'ACTIVE'); 
  const [userStories, setUserStories] = useState([]);
  const [userStoryId, setUserStoryId] = useState(ticket ? ticket.user_story : ''); 

  
  const [errors, setErrors] = useState({
    description: [],
    status: [],
    user_story: []
  });

  useEffect(() => {
    userStoryService.getUserStories().then((data) => {
      setUserStories(data);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ description: [], status: [], user_story_id: [] }); 
    try {
      if (ticket) {
        await ticketService.updateTicket(ticket.id, { title, description, status, user_story: userStoryId });
        toast.success('Ticket updated successfully!');
      } else {
        await ticketService.createTicket({ title, description, status, user_story: userStoryId });
        toast.success('Ticket created successfully!');
      }
      onSuccess();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({
          description: error.response.data.description || [],
          status: error.response.data.status || [],
          user_story: error.response.data.user_story || []
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
        error={errors.title && errors.title.length > 0}
        helperText={errors.title && errors.title.join(' ')}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        error={errors.description && errors.description.length > 0}
        helperText={errors.description && errors.description.join(' ')}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
          error={errors.status && errors.status.length > 0}
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
        </Select>
        {errors.status && errors.status.length > 0 && (
          <Typography color="error" variant="caption">
            {errors.status.join(' ')}
          </Typography>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>User Story</InputLabel>
        <Select
          value={userStoryId}
          onChange={(e) => setUserStoryId(e.target.value)}
          label="User Story"
          error={errors.user_story && errors.user_story.length > 0}
        >
          {userStories.map((userStory) => (
            <MenuItem key={userStory.id} value={userStory.id}>
              {userStory.title}
            </MenuItem>
          ))}
        </Select>
        {errors.user_story && errors.user_story.length > 0 && (
          <Typography color="error" variant="caption">
            {errors.user_story.join(' ')}
          </Typography>
        )}
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {ticket ? 'Update Ticket' : 'Create Ticket'}
      </Button>
    </form>
  );
};

export default TicketForm;
