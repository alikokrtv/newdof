import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Profile = ({ currentUser, isAdmin }) => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', department: '', role: '' });
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAdmin) {
            fetch('http://localhost:5000/api/users')
                .then((response) => response.json())
                .then((data) => setUsers(data))
                .catch((error) => console.error('Error fetching users:', error));
        }
    }, [isAdmin]);

    const handlePasswordReset = () => {
        fetch(`http://localhost:5000/api/users/${currentUser.id}/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Şifre başarıyla güncellendi!');
                } else {
                    alert('Şifre güncellenirken bir hata oluştu.');
                }
            })
            .catch((error) => console.error('Error updating password:', error));
    };

    const handleAddUser = () => {
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Kullanıcı başarıyla eklendi!');
                    setUsers([...users, { ...newUser, id: data.id }]);
                    setNewUser({ username: '', password: '', department: '', role: '' });
                } else {
                    alert('Kullanıcı eklenirken bir hata oluştu.');
                }
            })
            .catch((error) => console.error('Error adding user:', error));
    };

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert('Kullanıcı başarıyla silindi!');
                    setUsers(users.filter((user) => user.id !== id));
                } else {
                    alert('Kullanıcı silinirken bir hata oluştu.');
                }
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Profil
            </Typography>
            {!isAdmin ? (
                <>
                    <Typography variant="h6">Şifre Sıfırlama</Typography>
                    <TextField
                        label="Yeni Şifre"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handlePasswordReset}>
                        Şifreyi Güncelle
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h6">Kullanıcı Yönetimi</Typography>
                    <Paper elevation={3} sx={{ overflow: 'hidden', marginBottom: '20px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Kullanıcı Adı</TableCell>
                                    <TableCell>Departman</TableCell>
                                    <TableCell>Rol</TableCell>
                                    <TableCell>İşlemler</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.department}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Sil
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                    <Typography variant="h6">Yeni Kullanıcı Ekle</Typography>
                    <TextField
                        label="Kullanıcı Adı"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Şifre"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Departman"
                        value={newUser.department}
                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Rol"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleAddUser}>
                        Kullanıcı Ekle
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Profile;