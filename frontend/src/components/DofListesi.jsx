import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

const DofListesi = () => {
    const [dofs, setDofs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/dofs')
            .then((response) => response.json())
            .then((data) => setDofs(data))
            .catch((error) => console.error('Error fetching DOFs:', error));
    }, []);

    const handleDofClick = (id) => {
        navigate(`/dof-detay/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                DÖF Listesi
            </Typography>
            <Grid container spacing={3}>
                {dofs.map((dof) => (
                    <Grid item xs={12} sm={6} md={4} key={dof.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{dof.subject}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {dof.message}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Departman: {dof.department}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleDofClick(dof.id)}>
                                    Detayları Gör
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DofListesi;