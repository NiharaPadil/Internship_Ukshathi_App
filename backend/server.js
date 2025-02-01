
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: 'http://192.168.1.35:5000',  // Change to specific origin {ipconfig -> IPv4 Address}
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());


// MySQL Connection (Using Pool for Better Stability)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database');
    connection.release();
  }
});


// Sign-up API
app.post("/signup", async (req, res) => {
  let { name, password, device_type } = req.body;

  if (!name || !password || !device_type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Convert to string and trim inputs
    name = name.toString().trim();
    password = password.toString().trim();
    device_type = device_type.toString().trim();

    // Hash password with 10 salt rounds
    const hashedPassword = await bcrypt.hash(password, 10);

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

// Login API
app.post('/login', (req, res) => {
  let { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Trim inputs to avoid accidental spaces
  name = name.toString().trim();
  password = password.toString().trim();

  console.log('Received Username:', name);
  console.log('Received Password:', password);

  const query = 'SELECT * FROM users WHERE name = ?';
  db.query(query, [name], async (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      console.log('User not found.');
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    console.log('Database Result:', user);

    try {
      const isMatch = await bcrypt.compare(password, user.password); // Compare the hashed password
      console.log('Password Match Result:', isMatch);

      if (isMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } catch (compareError) {
      console.error('Password comparison error:', compareError);
      return res.status(500).json({ message: 'Error comparing passwords' });
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
