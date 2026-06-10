const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "YOUR_HOST",
  user: "YOUR_USER",
  password: "YOUR_PASSWORD",
  database: "portfolio"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  db.query(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});