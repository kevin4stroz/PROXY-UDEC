// dependencias del router
const express = require("express");
const router = express.Router();

// carga del controlador
const controladorMapa = require("../controladores/controlMapaCalor");

// ruta y accion a capturar
router.get('/GetData', controladorMapa.GetCountrys);

// exportar ruta
module.exports = router;