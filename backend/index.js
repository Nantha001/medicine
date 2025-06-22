
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const medicationRoutes = require('./routes/medications');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
