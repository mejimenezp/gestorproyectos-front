import React from 'react';
import { Card, CardContent, Typography, Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const UserStoryCard = ({ userStory }) => {
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
          {userStory.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {userStory.description}
        </Typography>
        <Typography variant="body2" color="text.primary">
          Proyecto: {userStory.projectName}
        </Typography>
        <Tooltip title="View user story details" arrow>
          <Button
            component={Link}
            to={`/user-stories/${userStory.id}`}
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

export default UserStoryCard;
