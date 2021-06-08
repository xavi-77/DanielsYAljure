'use strict'
var express = require('express');
var cors = require('cors');
const db = require('./database/db');
var port = process.env.PORT || 3000;
const multer = require('multer');


var app = express();

app.use(cors());
app.set(app.set(port));

//Cargar Rutas
var persona_routes = require('./routes/personaRoute');
var usuaro_routes = require('./routes/usuarioRoute');
var demanda_routes = require('./routes/demandaRoute');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configurar Cabeceras HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
    next();
 });

// Rutas Bases
app.use('/Daniels&Aljure', persona_routes);
app.use('/Daniels&Aljure', usuaro_routes);
app.use('/Daniels&Aljure', demanda_routes);

app.listen(port, function () {
    console.log('Servidor Corriendo en el Puerto #' + port);
});

module.exports = app;