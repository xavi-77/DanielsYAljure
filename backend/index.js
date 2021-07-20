'use strict'
var express = require('express');
var cors = require('cors');
const db = require('./database/db');
require('./config/asociations');
var port = process.env.PORT || 3000;


var app = express();

app.use(cors());
app.set(app.set(port));

//Cargar Rutas
var persona_routes = require('./routes/personaRoutes');
var usuaro_routes = require('./routes/usuarioRoutes');
var abogado_routes = require('./routes/abogadoRoutes');
var demanda_routes = require('./routes/demandaRoutes');
var anexo_routes = require('./routes/anexoRoutes');
var actuacion_routes = require('./routes/actuacionRoutes');
var gastosAdicionales_routes = require('./routes/gastoadicionalRoutes');
var honorario_routes = require('./routes/honorarioRoutes');
/*var visdemandas_otras_routes = require('./routes/vistDemandaRoute');*/

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
app.use('/Daniels&Aljure', abogado_routes);
app.use('/Daniels&Aljure', demanda_routes);
app.use('/Daniels&Aljure', anexo_routes);
app.use('/Daniels&Aljure', actuacion_routes);
app.use('/Daniels&Aljure', gastosAdicionales_routes);
app.use('/Daniels&Aljure', honorario_routes);
/*app.use('/Daniels&Aljure', visdemandas_otras_routes);*/

app.listen(port, function () {
    console.log('Servidor Corriendo en el Puerto #' + port);

      // Conectase a la base de datos
    // Force true: DROP TABLES
    db.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })
});



module.exports = app;