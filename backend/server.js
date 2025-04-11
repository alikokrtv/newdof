const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example route
app.get('/api/example', (req, res) => {
    db.all('SELECT * FROM example', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) {
            console.error('Error during login:', err.message);
            res.status(500).json({ success: false, error: 'Internal server error' });
        } else if (row) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// Add a new DOF
app.post('/api/dof', (req, res) => {
    const { subject, message, department, assigned_to } = req.body;
    const query = `
        INSERT INTO dofs (subject, message, department, assigned_to)
        VALUES (?, ?, ?, ?)
    `;
    db.run(query, [subject, message, department, assigned_to], function (err) {
        if (err) {
            console.error('Error adding DOF:', err.message);
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true, id: this.lastID });
        }
    });
});

// Get DOFs assigned to a user
app.get('/api/dofs/:username', (req, res) => {
    const { username } = req.params;
    const query = 'SELECT * FROM dofs WHERE assigned_to = ?';
    db.all(query, [username], (err, rows) => {
        if (err) {
            console.error('Error fetching DOFs:', err.message);
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Get all DOFs
app.get('/api/dofs', (req, res) => {
    const query = 'SELECT * FROM dofs';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching DOFs:', err.message);
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Remove this line as `routes` is not defined
// app.use('/api', routes());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});