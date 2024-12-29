// File: second_task/server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, "database.db");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        description TEXT,
        priority TEXT NOT NULL,
        completed INTEGER NOT NULL DEFAULT 0
      )`
    );
  }
});

// API routes
app.get("/tasks", (req, res) => {
  db.all(
    `SELECT * FROM tasks ORDER BY 
      CASE priority
        WHEN 'high' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'low' THEN 3
      END, id`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

app.post("/tasks", (req, res) => {
  const { text, description, priority } = req.body;
  if (!text || !priority) {
    return res.status(400).json({ error: "Text, description, and priority are required" });
  }

  db.run(
    "INSERT INTO tasks (text, description, priority, completed) VALUES (?, ?, ?, 0)",
    [text, description, priority],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID, text, description, priority, completed: 0 });
      }
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  db.run(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed ? 1 : 0, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ updated: this.changes });
      }
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ deleted: this.changes });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
