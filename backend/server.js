const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
//const bcrypt = require("bcryptjs"); // Import bcryptjs

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "NiharaPadil@02022003",  
  database: "Demo",
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
  console.log("Received Signup Request:", req.body); // Debugging

  const { name, password, device_type } = req.body;

  if (!name || !password || !device_type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO users (name, password, device_type) VALUES (?, ?, ?)";
  db.query(sql, [name, password, device_type], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err); // Log database error
      return res.status(500).json({ message: "Database error." });
    }
    res.status(201).json({ message: "User created successfully." });
  });
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});