const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
  }
});

// Sign-up API
app.post("/signup", async (req, res) => {
  const { name, password, device_type } = req.body;

  if (!name || !password || !device_type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const sql = "INSERT INTO users (name, password, device_type) VALUES (?, ?, ?)";
    db.query(sql, [name, hashedPassword, device_type], (err, result) => {
      if (err) {
        console.error("Database Insert Error:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.status(201).json({ message: "User created successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
