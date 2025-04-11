import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const Dashboard = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/example')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;