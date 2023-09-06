
const db = require('../config/db');

// Define la función asincrónica para obtener todos los autores
async function getAllUsers(req, res, next) {
  try {
   // Consulta la base de datos para obtener todos los registros de la tabla "authors"
   const query = 'SELECT * FROM users';
    
   db.all(query, [], (err, users) => {
     if (err) {
       // Maneja los errores si ocurren al realizar la consulta
       next(err);
     } else {
       // Responde con la lista de autores en formato JSON
       res.status(200).json(users);
     }
   });
 } catch (error) {
   // Maneja los errores si ocurren
   next(error);
 }
}

module.exports = {
    getAllUsers
};