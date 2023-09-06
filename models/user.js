const db = require('../config/db');

// Crear la tabla de usuarios
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT,email TEXT)'
  );

  // Definir la sentencia SQL para crear la tabla "authors"
  const createAuthorsTableSQL = `
    CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      field_1 TEXT,
      author TEXT,
      description TEXT,
      my_numeric_field INTEGER
    )
  `;

  // Ejecutar la sentencia SQL para crear la tabla "authors"
  db.run(createAuthorsTableSQL, (error) => {
    if (!error) {
      console.log('La tabla "authors" se ha creado correctamente.');
    } else {
      console.error('Error al crear la tabla "authors":', error);
    }
  });
});

module.exports = db;