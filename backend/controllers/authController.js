const db = require('../db');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, hashedPassword, role],
    function (err) {
      if (err) return res.status(400).json({ error: "User already exists" });
      res.status(201).json({ id: this.lastID, username, role });
    }
  );
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: "Invalid username" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    res.status(200).json({ id: user.id, username: user.username, role: user.role });
  });
};

module.exports = { registerUser, loginUser };
