require('dotenv').config();
const express = require('express');
const app = express();
const usuariosRouter = require('./routes/index');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {
  PORT
} = process.env;


// Define las opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'Mi API', // Nombre de tu API
      version: '1.0.0', // Versión de tu API
      description: 'Descripción de mi API',
    },
  },
  // Especifica los archivos que contienen la documentación de tus rutas
  apis: ['./routes/*.js'], // Ajusta esta ruta según la ubicación de tus archivos de rutas
};

// Crea un objeto Swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Configura Swagger UI en una ruta específica (por ejemplo, "/api-docs")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para manejar JSON
app.use(express.json());

// Agrega tus rutas aquí
app.use('/api', usuariosRouter);

const puerto = PORT || 3000;

app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});
