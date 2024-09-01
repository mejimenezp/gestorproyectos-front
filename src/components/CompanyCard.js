import React from 'react';
import { Card, CardContent, Typography, Button, Tooltip } from '@mui/material';


const CompanyCard = ({ company }) => {
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
          {company.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          NIT: {company.nit}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Phone: {company.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Address: {company.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Email: {company.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Projects: {company.projects.map(project => project.name).join(', ')}
        </Typography>
        <Tooltip title="Ver detalles de la compañía" arrow>
          
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
