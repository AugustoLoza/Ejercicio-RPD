// app.js

const express = require('express');
const app = express();
const usuariosRouter = require('./routes/index');

app.use(express.json());

app.use('/api', usuariosRouter);

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
  console.log(`Servidor en ejecución en el puerto ${puerto}`);
});