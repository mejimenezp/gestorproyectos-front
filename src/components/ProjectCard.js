import React from 'react';
import { Card, CardContent, Typography, Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
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
        <Typography variant="h5" component="div" gutterBottom>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {project.description}
        </Typography>
        <Tooltip title="Ver detalles del proyecto" arrow>
          <Button
            component={Link}
            to={`/projects/${project.id}`}
            variant="contained"
            color="primary"
            sx={{ marginTop: 1 }}
          >
            Ver Detalles
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
