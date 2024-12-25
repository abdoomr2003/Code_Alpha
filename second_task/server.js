const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// SQLite database setup
const db = new sqlite3.Database('./database.db', (err) => {
if (err) {
    console.error('Error opening database:', err.message);
} else {
    db.run(
    `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        completed INTEGER DEFAULT 0
    )`
    );
    console.log('Connected to SQLite database.');
}
});

// API: Get all tasks
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
    res.status(500).send(err.message);
    } else {
    res.json(rows);
    }
});
});

// API: Add a new task
app.post('/api/tasks', (req, res) => {
const { task } = req.body;
db.run('INSERT INTO tasks (task) VALUES (?)', [task], function (err) {
    if (err) {
    res.status(500).send(err.message);
    } else {
    res.json({ id: this.lastID, task, completed: 0 });
    }
});
});

// API: Delete a task
app.delete('/api/tasks/:id', (req, res) => {
const { id } = req.params;
db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
    res.status(500).send(err.message);
    } else {
    res.sendStatus(204);
    }
});
});

// API: Toggle task completion
app.put('/api/tasks/:id', (req, res) => {
const { id } = req.params;
const { completed } = req.body;
db.run(
    'UPDATE tasks SET completed = ? WHERE id = ?',
    [completed, id],
    function (err) {
    if (err) {
        res.status(500).send(err.message);
    } else {
        res.sendStatus(204);
    }
    }
);
});

// Start server
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});
