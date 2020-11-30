// dependencias del router
const express = require("express");
const router = express.Router();

// carga del controlador
const controladorTabla = require("../controladores/controlTabla");

// ruta y accion a capturar
router.get('/GetData', controladorTabla.GetDataTable);

// exportar ruta
module.exports = router;