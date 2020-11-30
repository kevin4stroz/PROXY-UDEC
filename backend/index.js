// dependencias
const express = require('express');
const logger = require('morgan');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

// variables de entorno
const dotenv = require('dotenv');
dotenv.config();

// rutas
const login = require("./rutas/rutaLogin");
const mapaCalor = require("./rutas/rutaMapaCalor");
const tabla = require("./rutas/rutaTabla");
const graficos = require("./rutas/rutaGraficos");
const check = require("./rutas/rutaCheck");

// inicializacion del express
const app = express();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// clave princpial del jwt
app.set('secretKey', 'X8Na3W2vdEZnk0RHL1rH4bZJ10b1IOgqSqsfujZ9IfLHpQ18VT');

// cargar datos necesarios para express
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// Rutas publicas
app.use('/login', login);

// Rutas privadas
app.use('/mapaCalor', validateUser ,mapaCalor);
app.use('/tablaLogs', validateUser ,tabla);
app.use('/Graficos', validateUser ,graficos);
app.use('/user', validateUser ,check);

// validar usuario 
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:false, msg: err.message});
      }else{
        // add user id to request
        req.body.id = decoded.id;
        next();
      }
    });
}

// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function(err, req, res, next) {
    console.log(err);
    
    if(err.status === 404)
        res.status(404).json({message: "Not found"});
    else 
        res.status(500).json({message: "Error interno en el servidor"});
});


// inicio de la aplicacion
app.listen(process.env.PUERTO, function(){
    console.log('El servidor ha sido inicializado: http://localhost:', process.env.PUERTO);
});
