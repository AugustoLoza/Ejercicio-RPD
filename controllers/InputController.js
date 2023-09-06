const db = require('../config/db');

/**
 * @swagger
 * /api/input/{id}:
 *   get:
 *     summary: Obtiene un input por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del input a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del input encontrado.
 *       404:
 *         description: Input no encontrado.
 */
async function getInputById(req, res, next) {
    try {
        const authorId = req.params.id; // Obtener el ID del autor desde los parámetros de la solicitud
        
        // Consulta la base de datos para obtener un autor específico por su ID
        const query = 'SELECT * FROM authors WHERE id = ?';
        
        db.get(query, [authorId], (err, author) => {
            if (err) {
                // Maneja los errores si ocurren al realizar la consulta
                next(err);
            } else {
                if (!author) {
                    // Si no se encontró ningún autor con ese ID, responde con un 404 (No encontrado)
                    res.status(404).json({ error: 'Input no encontrado' });
                } else {
                    // Responde con el autor encontrado en formato JSON
                    res.status(200).json(author);
                }
            }
        });
    } catch (error) {
        // Maneja los errores si ocurren
        next(error);
    }
}

/**
 * @swagger
 * /api/input/{my_target_field}:
 *   post:
 *     summary: Crea un nuevo input.
 *     parameters:
 *       - in: path
 *         name: my_target_field
 *         required: true
 *         description: Campo de destino para el nuevo input.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field_1:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               my_numeric_field:
 *                 type: number
 *             required:
 *               - field_1
 *               - author
 *               - description
 *               - my_numeric_field
 *     responses:
 *       201:
 *         description: Input creado con éxito.
 *       400:
 *         description: Datos de entrada no válidos.
 *       500:
 *         description: Error al crear el input.
 */
async function createInput(req, res, next) {
    try {
        const myTargetFieldValue = req.params.my_target_field;
        // Verifica si myTargetFieldValue coincide con alguna propiedad en req.body
        if (req.body.hasOwnProperty(myTargetFieldValue)) {
            // Verifica si la propiedad es de tipo string
            if (typeof req.body[myTargetFieldValue] === 'string') {
                // Convierte la propiedad a mayúsculas en req.body
                req.body[myTargetFieldValue] = req.body[myTargetFieldValue].toUpperCase();
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

        // Ahora puedes usar newAuthorId aquí
        getInputById({ params: { id: newAuthorId } }, res, (error) => {
            if (error) {
                // Maneja errores si ocurren durante la consulta de detalles del autor
                next(error);
            } else {
                // Responde con un mensaje de éxito en formato JSON
                res.status(201).json({ id: newAuthorId });
            }
        });

    } catch (error) {
        // Maneja los errores si ocurren
        next(error);
    }
}


module.exports = {
    getInputById,
    createInput
};
