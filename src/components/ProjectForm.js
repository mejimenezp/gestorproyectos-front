import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const ProjectForm = ({ initialValues = {}, onSubmit }) => {
    const [formData, setFormData] = React.useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Box>
    );
};

export default ProjectForm;
