import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import ReportIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Sidebar = ({ isOpen, toggleSidebar, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/'); // Ana ekrana yönlendir
    };

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                <ListItem button component={Link} to="/adima-acilan-dofler">
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gelen Kutusu" />
                </ListItem>
                <ListItem button component={Link} to="/actigim-dofler">
                    <ListItemIcon>
                        <FolderOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary="Açılan DOF'ler" />
                </ListItem>
                <ListItem button component={Link} to="/dof-ac">
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="DÖF Oluştur" />
                </ListItem>
                <ListItem button component={Link} to="/dof-kontrol">
                    <ListItemIcon>
                        <CheckIcon />
                    </ListItemIcon>
                    <ListItemText primary="DÖF Kontrol" />
                </ListItem>
              
                <ListItem button component={Link} to="/rapor-calistir">
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rapor Çalıştır" />
                </ListItem>
                <ListItem
                    button
                    onClick={handleLogout}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Çıkış Yap" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;