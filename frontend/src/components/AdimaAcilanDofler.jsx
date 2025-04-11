import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const AdimaAcilanDofler = () => {
    const [dofs, setDofs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/dofs') // Fetch all DOFs
            .then((response) => response.json())
            .then((data) => setDofs(data))
            .catch((error) => console.error('Error fetching DOFs:', error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Adıma Açılan Dofler
            </Typography>
            <List>
                {dofs.map((dof) => (
                    <ListItem key={dof.id}>
                        <ListItemText
                            primary={dof.subject}
                            secondary={`${dof.message} - ${dof.department}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default AdimaAcilanDofler;