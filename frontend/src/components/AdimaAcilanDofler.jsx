import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const AdimaAcilanDofler = () => {
    const [dofs, setDofs] = useState([]);
    const currentUser = "user2"; // Aktif kullanıcı (backend'den alınabilir)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu

    useEffect(() => {
        fetch('http://localhost:5000/api/dofs')
            .then((response) => response.json())
            .then((data) => {
                const filteredDofs = data.filter((dof) => dof.assigned_to === currentUser);
                setDofs(filteredDofs);
                setIsLoading(false); // Yüklenme tamamlandı
            })
            .catch((error) => {
                console.error('Error fetching DOFs:', error);
                setIsLoading(false); // Hata durumunda da yüklenme tamamlandı
            });
    }, []);

    const handleDofClick = (id) => {
        navigate(`/dof-detay/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gelen Kutusu
            </Typography>
            {isLoading ? (
                <Typography variant="body1" color="textSecondary">
                    Yükleniyor...
                </Typography>
            ) : dofs.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                    Şu anda gelen kutunuzda bir DÖF bulunmamaktadır.
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
                                    onClick={() => handleDofClick(dof.id)}
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
        </Container>
    );
};

export default AdimaAcilanDofler;