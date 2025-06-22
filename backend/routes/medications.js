const express = require('express');
const router = express.Router();
const {
  addMedication,
  getMedications,
  markAsTaken
} = require('../controllers/medicationController');

router.post('/add', addMedication);
router.get('/user/:userId', getMedications);
router.post('/taken', markAsTaken);

module.exports = router;
