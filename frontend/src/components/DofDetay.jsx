import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Card, CardContent, CardActions, MenuItem } from '@mui/material';

const DofDetay = () => {
    const { id } = useParams();
    const [dof, setDof] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/dofs/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('DÖF Detayları:', data);
                setDof(data);
            })
            .catch((error) => console.error('Error fetching DOF details:', error));
    }, [id]);

    const handleUpdate = () => {
        const updatedDof = {
            ...dof,
            type: dof.type || null,
            channel: dof.channel || null,
            status: dof.status || 'Açık',
        };

        fetch(`http://localhost:5000/api/dofs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDof),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('DÖF başarıyla güncellendi!');
                    fetch(`http://localhost:5000/api/dofs/${id}`)
                        .then((response) => response.json())
                        .then((updatedDof) => setDof(updatedDof));
                } else {
                    alert(`Güncelleme başarısız: ${data.error}`);
                }
            })
            .catch((error) => console.error('Error updating DOF:', error));
    };

    const handleDelete = () => {
        fetch(`http://localhost:5000/api/dofs/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('DÖF başarıyla silindi!');
                    navigate('/actigim-dofler');
                }
            })
            .catch((error) => console.error('Error deleting DOF:', error));
    };

    if (!dof) {
        return <Typography>Yükleniyor...</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        DÖF Detayları
                    </Typography>
                    <TextField
                        label="Konu"
                        value={dof.subject || ''}
                        onChange={(e) => setDof({ ...dof, subject: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Mesaj"
                        value={dof.message || ''}
                        onChange={(e) => setDof({ ...dof, message: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Departman"
                        value={dof.department || ''}
                        onChange={(e) => setDof({ ...dof, department: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Atanan Kişi"
                        value={dof.assigned_to || ''}
                        onChange={(e) => setDof({ ...dof, assigned_to: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="DÖF Tipi"
                        value={dof.type || ''}
                        onChange={(e) => setDof({ ...dof, type: e.target.value })}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="Düzeltici Faaliyet">Düzeltici Faaliyet</MenuItem>
                        <MenuItem value="Önleyici Faaliyet">Önleyici Faaliyet</MenuItem>
                        <MenuItem value="İyileştirici Faaliyet">İyileştirici Faaliyet</MenuItem>
                    </TextField>
                    <TextField
                        select
                        label="DÖF Kanalı"
                        value={dof.channel || ''}
                        onChange={(e) => setDof({ ...dof, channel: e.target.value })}
                        fullWidth
                        margin="normal"
                    >
                        <MenuItem value="İç Tetkik Sonuçları">İç Tetkik Sonuçları</MenuItem>
                        <MenuItem value="Dış Tetkik Sonuçları">Dış Tetkik Sonuçları</MenuItem>
                        <MenuItem value="Müşteri Geri Bildirim">Müşteri Geri Bildirim</MenuItem>
                    </TextField>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Güncelle
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Sil
                    </Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default DofDetay;