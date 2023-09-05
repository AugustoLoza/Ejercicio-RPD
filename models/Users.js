// models/User.js

const db = require('../config/db');

// Crear la tabla de usuarios
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, email TEXT)'
  );
});

module.exports = db;