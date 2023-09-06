// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../models/user');

const {getAllAuthors, createAuthor} = require("../controllers/authorsController");
const {getAllUsers} = require("../controllers/usersController");

// Ruta para obtener todos los usuarios
router.get('/users', getAllUsers);

router.get("/authors/", getAllAuthors);

router.post("/input/:my_target_field", createAuthor);

module.exports = router;