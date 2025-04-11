import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Modal, Box, Button } from '@mui/material';

const ActigimDofler = () => {
    const [dofs, setDofs] = useState([]);
    const [selectedDof, setSelectedDof] = useState(null); // Seçilen DÖF
    const navigate = useNavigate();
    const currentUser = "user2"; // Aktif kullanıcı (backend'den alınabilir)

    useEffect(() => {
        fetch(`http://localhost:5000/api/dofs?createdBy=${currentUser}`)
            .then((response) => response.json())
            .then((data) => setDofs(data))
            .catch((error) => console.error('Error fetching DOFs:', error));
    }, []);

    const handleRowClick = (dof) => {
        setSelectedDof(dof); // Seçilen DÖF'ü ayarla
    };

    const handleEdit = () => {
        if (selectedDof) {
            navigate(`/dof-detay/${selectedDof.id}`);
        }
    };

    const handleCloseModal = () => {
        setSelectedDof(null); // Modalı kapat
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Açtığım DÖF'ler
            </Typography>
            {dofs.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                    Şu anda açtığınız bir DÖF bulunmamaktadır.
                </Typography>
            ) : (
                <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>DÖF Adı</strong></TableCell>
                                <TableCell><strong>Tarih</strong></TableCell>
                                <TableCell><strong>Durum</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dofs.map((dof) => (
                                <TableRow
                                    key={dof.id}
                                    onClick={() => handleRowClick(dof)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#f0f8ff',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <TableCell>{dof.subject}</TableCell>
                                    <TableCell>{new Date(dof.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{dof.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}

            {/* Önizleme Modalı */}
            <Modal open={!!selectedDof} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '8px',
                    }}
                >
                    {selectedDof && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                DÖF Detayları
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Başlık:</strong> {selectedDof.subject}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Mesaj:</strong> {selectedDof.message}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Departman:</strong> {selectedDof.department}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Durum:</strong> {selectedDof.status}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginRight: '10px' }}>
                                    Düzenle
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                                    Kapat
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default ActigimDofler;