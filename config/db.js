require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(`./${process.env.DB_NAME}`, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos SQLite establecida');
  }
});

module.exports = db;