const express = require('express');
const router = express.Router();
const db = require('../models/InputTable');


const { getInputById, createInput } = require('../controllers/InputController');
/**
 * @swagger
 * /api/get_data/{id}:
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

router.get('/get_data/:id', getInputById);

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
 *       200:
 *        description: Get Input.
 *       201:
 *         description: Input creado con éxito.
 *       400:
 *         description: Datos de entrada no válidos.
 *       500:
 *         description: Error al crear el input.
 */

router.post('/input/:my_target_field', createInput);

module.exports = router;
