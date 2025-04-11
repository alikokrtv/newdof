import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                marginTop: 'auto',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                © 2025 DÖF Yönetim Sistemi. Tüm hakları saklıdır.
            </Typography>
        </Box>
    );
};

export default Footer;