import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Modal, Box } from '@mui/material';

const DofKontrol = () => {
    const [dofs, setDofs] = useState([]);
    const [selectedDof, setSelectedDof] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/dofs')
            .then((response) => response.json())
            .then((data) => setDofs(data))
            .catch((error) => console.error('Error fetching DOFs:', error));
    }, []);

    const handleApprove = (id) => {
        fetch(`http://localhost:5000/api/dofs/${id}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    fetch('http://localhost:5000/api/dofs')
                        .then((response) => response.json())
                        .then((updatedDofs) => setDofs(updatedDofs));
                }
            })
            .catch((error) => console.error('Error approving DOF:', error));
    };

    const handleReject = (id) => {
        if (!rejectReason) {
            alert('Lütfen reddetme nedenini belirtin.');
            return;
        }

        fetch(`http://localhost:5000/api/dofs/${id}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: rejectReason }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    fetch('http://localhost:5000/api/dofs')
                        .then((response) => response.json())
                        .then((updatedDofs) => setDofs(updatedDofs));
                    setRejectReason('');
                    setSelectedDof(null);
                }
            })
            .catch((error) => console.error('Error rejecting DOF:', error));
    };

    const handleOpenModal = (message) => {
        setModalMessage(message);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setModalMessage('');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                DÖF Kontrol Paneli
            </Typography>
            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>DÖF Adı</strong></TableCell>
                            <TableCell><strong>Mesaj</strong></TableCell>
                            <TableCell><strong>Tarih</strong></TableCell>
                            <TableCell><strong>Durum</strong></TableCell>
                            <TableCell><strong>İşlemler</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dofs.map((dof) => (
                            <TableRow
                                key={dof.id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f0f8ff',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <TableCell>{dof.subject}</TableCell>
                                <TableCell>{dof.message}</TableCell>
                                <TableCell>{new Date(dof.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {dof.status === 'Reddedildi' ? (
                                        <span
                                            style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handleOpenModal(dof.message || 'Reddetme nedeni belirtilmemiş.')}
                                        >
                                            {dof.status}
                                        </span>
                                    ) : (
                                        dof.status
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button size="small" color="primary" onClick={() => handleApprove(dof.id)}>
                                        Onayla
                                    </Button>
                                    <Button size="small" color="secondary" onClick={() => setSelectedDof(dof.id)}>
                                        Reddet
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {selectedDof && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Reddetme Nedeni</Typography>
                    <TextField
                        label="Reddetme Nedeni"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleReject(selectedDof)}
                    >
                        Reddet
                    </Button>
                </div>
            )}

            {/* Modal */}
            <Modal open={openModal} onClose={handleCloseModal}>
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
                    <Typography variant="h6" gutterBottom>
                        Reddetme Nedeni
                    </Typography>
                    <Typography variant="body1">{modalMessage}</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCloseModal}
                        sx={{ marginTop: '20px' }}
                    >
                        Kapat
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default DofKontrol;