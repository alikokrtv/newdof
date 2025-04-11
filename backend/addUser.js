const db = require('./models/database'); // Veritabanı bağlantısını içe aktar

// Yeni kullanıcı ekleme
db.run(
    `
    INSERT INTO users (username, password, department, role)
    VALUES (?, ?, ?, ?)
    `,
    ['admin', 'password123', 'IT', 'admin'], // Kullanıcı bilgileri
    (err) => {
        if (err) {
            console.error('Error inserting user:', err.message);
        } else {
            console.log('User added successfully.');
        }
    }
);

// Veritabanı bağlantısını kapatma
db.close((err) => {
    if (err) {
        console.error('Error closing the database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});