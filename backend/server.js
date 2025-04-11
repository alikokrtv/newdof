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

// Yeni DÖF ekleme
app.post('/api/dof', (req, res) => {
    const { subject, message, department, assigned_to, type, channel } = req.body;
    const query = 'INSERT INTO dofs (subject, message, department, assigned_to, type, channel, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.run(query, [subject, message, department, assigned_to, type, channel, 'Açık'], (err) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

// DÖF ekleme
app.post('/api/dofs', (req, res) => {
    const { subject, message, department, assigned_to } = req.body;

    if (!subject || !message || !department || !assigned_to) {
        return res.status(400).json({ success: false, error: 'Tüm alanlar doldurulmalıdır.' });
    }

    const query = 'INSERT INTO dofs (subject, message, department, assigned_to) VALUES (?, ?, ?, ?)';
    db.run(query, [subject, message, department, assigned_to], function (err) {
        if (err) {
            console.error('Error inserting DÖF:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: this.lastID });
    });
});

// DÖF'leri listeleme
app.get('/api/dofs', (req, res) => {
    const query = 'SELECT id, subject, message, department, status, created_at FROM dofs';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// DÖF detaylarını getirme
app.get('/api/dofs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM dofs WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(row); // Tüm alanları döndürüyor
        }
    });
});

// DÖF güncelleme
app.put('/api/dofs/:id', (req, res) => {
    const { id } = req.params;
    const { subject, message, department, type, channel, status } = req.body;

    const query = `
        UPDATE dofs
        SET subject = ?, message = ?, department = ?, type = ?, channel = ?, status = ?
        WHERE id = ?
    `;
    db.run(query, [subject, message, department, type || null, channel || null, status || 'Açık', id], (err) => {
        if (err) {
            console.error('Error updating DOF:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
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

app.get('/api/dofs/user/:username', (req, res) => {
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

app.get('/api/dof-types', (req, res) => {
    const types = [
        'Düzeltici Faaliyet',
        'Önleyici Faaliyet',
        'İyileştirici Faaliyet',
        'Ramak Kala Bildirimleri',
        'Kaza Bildirimleri',
        'Uygunsuz Durum - Davranış Bildirimleri',
    ];
    res.json(types);
});

app.get('/api/dof-channels', (req, res) => {
    const channels = [
        'İç Tetkik Sonuçları',
        'Dış Tetkik Sonuçları',
        'Müşteri Geri Bildirim',
        'Hedef ve Programlar',
        'Yönetimin Gözden Geçirilmesi Toplantısı\'nın Çıktıları',
        'Diğer',
    ];
    res.json(channels);
});

app.post('/api/dofs/:id/approve', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE dofs SET status = ? WHERE id = ?';
    db.run(query, ['Onaylandı', id], (err) => {
        if (err) {
            console.error('Error approving DOF:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, message: 'DÖF başarıyla onaylandı.' });
    });
});

app.post('/api/dofs/:id/reject', (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
        return res.status(400).json({ success: false, error: 'Reddetme nedeni belirtilmelidir.' });
    }

    const query = 'UPDATE dofs SET status = ?, message = ? WHERE id = ?';
    db.run(query, ['Reddedildi', reason, id], (err) => {
        if (err) {
            console.error('Error rejecting DOF:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, message: 'DÖF başarıyla reddedildi.' });
    });
});

app.delete('/api/dofs/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM dofs WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

// Kullanıcıları listeleme
app.get('/api/users', (req, res) => {
    const query = 'SELECT id, username, department, role FROM users';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Yeni kullanıcı ekleme
app.post('/api/users', (req, res) => {
    const { username, password, department, role } = req.body;

    if (!username || !password || !department || !role) {
        return res.status(400).json({ success: false, error: 'Tüm alanlar doldurulmalıdır.' });
    }

    const query = 'INSERT INTO users (username, password, department, role) VALUES (?, ?, ?, ?)';
    db.run(query, [username, password, department, role], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: this.lastID });
    });
});

// Kullanıcı silme
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.run(query, [id], (err) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

// Şifre güncelleme
app.put('/api/users/:id/password', (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, error: 'Şifre belirtilmelidir.' });
    }

    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.run(query, [password, id], (err) => {
        if (err) {
            res.status(500).json({ success: false, error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

// Remove this line as `routes` is not defined
// app.use('/api', routes());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});