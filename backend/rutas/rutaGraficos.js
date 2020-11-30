// dependencias del router
const express = require("express");
const router = express.Router();

// carga del controlador
const controladorGraficos = require("../controladores/controlGraficos");

// ruta y accion a capturar
router.get('/Grafico1', controladorGraficos.Grafico1);
router.get('/Grafico2', controladorGraficos.Grafico2);
router.get('/Grafico3', controladorGraficos.Grafico3);
router.get('/Grafico4', controladorGraficos.Grafico4);

// exportar ruta
module.exports = router;