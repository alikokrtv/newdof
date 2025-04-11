import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

const FormComponent = () => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/example', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Item added:', data);
                setName('');
            })
            .catch((error) => console.error('Error adding item:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add New Item
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Item
                </Button>
            </form>
        </Container>
    );
};

export default FormComponent;