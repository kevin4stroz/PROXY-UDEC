// dependencias del router
const express = require("express");
const router = express.Router();

// carga del controlador
const controladorLogin = require("../controladores/controlLogin");

// ruta y accion a capturar
router.post('/user', controladorLogin.login);

// exportar ruta
module.exports = router;