import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Dashboard = () => {
    const widgets = [
        {
            title: 'Açılan DOF\'ler',
            description: 'Açtığınız tüm DOF\'leri görüntüleyin.',
            link: '/actigim-dofler',
            icon: <FolderOpenIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
        },
        {
            title: 'Gelen Kutusu',
            description: 'Adınıza açılan DOF\'leri kontrol edin.',
            link: '/adima-acilan-dofler',
            icon: <InboxIcon sx={{ fontSize: 40, color: '#388e3c' }} />,
        },
        {
            title: 'DÖF Kontrol',
            description: 'DÖF onay ve kontrol işlemleri.',
            link: '/dof-kontrol',
            icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#d32f2f' }} />,
        },
    ];

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                {widgets.map((widget, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '15px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {widget.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {widget.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    gutterBottom
                                    sx={{ textAlign: 'center' }}
                                >
                                    {widget.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={widget.link}
                                        sx={{
                                            textTransform: 'none',
                                            padding: '10px 20px',
                                            fontWeight: 'bold',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        Görüntüle
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;