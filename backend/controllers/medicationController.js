

const db = require('../db');


const addMedication = (req, res) => {
  const { user_id, name, dosage, frequency } = req.body;
  db.run(
    `INSERT INTO medications (user_id, name, dosage, frequency) VALUES (?, ?, ?, ?)`,
    [user_id, name, dosage, frequency],
    function (err) {
      if (err) return res.status(500).json({ error: "DB insert error" });
      res.status(201).json({ id: this.lastID, name, dosage, frequency });
    }
  );
};


const getMedications = (req, res) => {
  const { userId } = req.params;
  db.all(
    `SELECT * FROM medications WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "DB fetch error" });
      res.status(200).json(rows);
    }
  );
};


const markAsTaken = (req, res) => {
  const { medication_id, date } = req.body;
  db.run(
    `INSERT INTO medication_logs (medication_id, date, taken) VALUES (?, ?, 1)`,
    [medication_id, date],
    function (err) {
      if (err) return res.status(500).json({ error: "Log insert error" });
      res.status(201).json({ log_id: this.lastID });
    }
  );
};

module.exports = { addMedication, getMedications, markAsTaken };
