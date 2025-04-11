import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Card, CardContent } from '@mui/material';

const DofAc = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [type, setType] = useState('');
    const [channel, setChannel] = useState('');
    const [types, setTypes] = useState([]);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/dof-types')
            .then((res) => res.json())
            .then(setTypes);
        fetch('http://localhost:5000/api/dof-channels')
            .then((res) => res.json())
            .then(setChannels);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/dofs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: subject,
                message: message,
                department: department,
                assigned_to: assignedTo,
                type: type,
                channel: channel,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('DÖF başarıyla açıldı!');
                } else {
                    alert('DÖF açılırken bir hata oluştu.');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <Container>
            <Card sx={{ padding: '20px', backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        DÖF Aç
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="DÖF Konusu"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="DÖF Mesajı"
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
                        <TextField
                            select
                            label="DÖF Tipi"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            {types.map((t) => (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="DÖF Kanalı"
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            {channels.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: '20px', padding: '10px 20px', fontWeight: 'bold' }}
                        >
                            DÖF Aç
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default DofAc;