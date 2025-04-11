const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../../database/app.db');

// Initialize the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create or update the database schema
db.serialize(() => {
    // Create the `dofs` table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS dofs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            department TEXT NOT NULL,
            assigned_to TEXT NOT NULL,
            type TEXT,
            channel TEXT,
            status TEXT DEFAULT 'Açık',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Drop the `users` table if it exists
    db.run(`DROP TABLE IF EXISTS users`, (err) => {
        if (err) {
            console.error('Error dropping users table:', err.message);
        } else {
            console.log('Old users table dropped.');
        }
    });

    // Create the `users` table with the correct schema
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            department TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created or already exists.');
        }
    });

    // Check if `created_at` and `updated_at` columns exist
    db.all("PRAGMA table_info(dofs)", (err, columns) => {
        if (err) {
            console.error('Error fetching table info:', err.message);
            return;
        }

        const columnNames = columns.map((col) => col.name);
        if (!columnNames.includes('created_at') || !columnNames.includes('updated_at')) {
            console.log('Adding missing columns using table recreation...');

            // Rename the existing table
            db.run(`ALTER TABLE dofs RENAME TO dofs_old`, (err) => {
                if (err) {
                    console.error('Error renaming table:', err.message);
                    return;
                }

                // Create the new table with the desired schema
                db.run(`
                    CREATE TABLE dofs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        subject TEXT NOT NULL,
                        message TEXT NOT NULL,
                        department TEXT NOT NULL,
                        assigned_to TEXT NOT NULL,
                        type TEXT,
                        channel TEXT,
                        status TEXT DEFAULT 'Açık',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) {
                        console.error('Error creating new table:', err.message);
                        return;
                    }

                    // Copy data from the old table to the new table
                    db.run(`
                        INSERT INTO dofs (id, subject, message, department, assigned_to, type, channel, status)
                        SELECT id, subject, message, department, assigned_to, type, channel, status
                        FROM dofs_old
                    `, (err) => {
                        if (err) {
                            console.error('Error copying data to new table:', err.message);
                            return;
                        }

                        // Drop the old table
                        db.run(`DROP TABLE dofs_old`, (err) => {
                            if (err) {
                                console.error('Error dropping old table:', err.message);
                            } else {
                                console.log('Table updated successfully.');
                            }
                        });
                    });
                });
            });
        }
    });
});

module.exports = db;