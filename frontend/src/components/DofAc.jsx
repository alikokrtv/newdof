import React, { useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem } from '@mui/material';

const DofAc = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/dof', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subject, message, department, assigned_to: assignedTo }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Dof başarıyla açıldı!');
                    setSubject('');
                    setMessage('');
                    setDepartment('');
                    setAssignedTo('');
                }
            })
            .catch((error) => console.error('Error adding DOF:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dof Aç
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Dof Konusu"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Dof Mesajı"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="İlgili Departman"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Atanacak Kullanıcı"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Dof Aç
                </Button>
            </form>
        </Container>
    );
};

export default DofAc;