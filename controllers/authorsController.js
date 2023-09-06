
const db = require('../config/db');

// Define la función asincrónica para obtener todos los autores
async function getAllAuthors(req, res, next) {
    try {
        // Consulta la base de datos para obtener todos los registros de la tabla "authors"
        const query = 'SELECT * FROM authors';
        db.all(query, [], (err, authors) => {
            if (err) {
                // Maneja los errores si ocurren al realizar la consulta
                next(err);
            } else {
                // Responde con la lista de autores en formato JSON
                res.status(200).json(authors);
            }
        });
    } catch (error) {
        // Maneja los errores si ocurren
        next(error);
    }
}

async function createAuthor(req, res, next) {
    try {

        const myTargetFieldValue = req.params.my_target_field;
        // Verifica si myTargetFieldValue coincide con alguna propiedad en req.body
        if (req.body.hasOwnProperty(myTargetFieldValue)) {
            // Verifica si la propiedad es de tipo string
            if (typeof req.body[myTargetFieldValue] === 'string') {
                // Convierte la propiedad a mayúsculas en req.body
                req.body[myTargetFieldValue] = req.body[myTargetFieldValue].toUpperCase();
                console.log(req.body[myTargetFieldValue]); // Muestra el valor en mayúsculas
            } else {
                // Si la propiedad no es de tipo string, muestra un error
                return res.status(400).json({ error: `${myTargetFieldValue} no es un campo válido para convertir a mayúsculas.` });
            }
        } else {
            // Si no coincide, rechaza la solicitud con un mensaje de error
            return res.status(400).json({ error: `${myTargetFieldValue} no es un campo válido.` });
        }
        // Obtén los datos del nuevo autor desde el cuerpo de la solicitud
        const { field_1, author, description, my_numeric_field } = req.body;


        // Valida los datos del nuevo autor
        if (!field_1 || !author || !description || !my_numeric_field) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Consulta la base de datos para insertar un nuevo autor
        const query = 'INSERT INTO authors (field_1, author, description, my_numeric_field) VALUES (?, ?, ?, ?)';

        // Captura el ID del nuevo autor creado antes de la inserción
        const newAuthorId = await new Promise((resolve, reject) => {
            db.run(query, [field_1, author, description, my_numeric_field], function (err) {
                if (err) {
                    // Maneja los errores si ocurren al realizar la inserción
                    reject(err);
                } else {
                    // Resuelve con el ID del nuevo autor creado
                    resolve(this.lastID);
                }
            });
        });

        // Imprime el ID del nuevo autor en la consola


        // Responde con un mensaje de éxito en formato JSON
        res.status(201).json({ message: `Registro creado con éxito con Id: ${newAuthorId}.`});
    } catch (error) {
        // Maneja los errores si ocurren
        next(error);
    }
}


module.exports = {
    getAllAuthors,
    createAuthor
};