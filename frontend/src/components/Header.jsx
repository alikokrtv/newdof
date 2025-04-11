import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profil'); // Profil sayfasına yönlendir
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 'bold',
                        fontFamily: 'Roboto, sans-serif',
                    }}
                >
                    DÖF Yönetim Sistemi
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Bildirim İkonu */}
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    {/* Profil İkonu */}
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;