// routes/users.js

const express = require('express');
const router = express.Router();
const db = require('../models/Users');

// Ruta para obtener todos los usuarios
router.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;