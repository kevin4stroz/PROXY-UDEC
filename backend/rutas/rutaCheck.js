// dependencias del router
const express = require("express");
const router = express.Router();

// carga del controlador
const controladorCheck = require("../controladores/controlCheck");

// ruta y accion a capturar
router.get('/Check', controladorCheck.Check);

// exportar ruta
module.exports = router;