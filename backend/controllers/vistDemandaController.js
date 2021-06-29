var fs = require('fs');
var path = require('path');
var User = require('../model/usuario');
var Demanda = require('../model/demanda');
var dbat = require('../database/db');
const con = require('../database/conecDB');

function mostrarDemandaPersona(req, res) {
    
        con.query('SELECT * FROM demandas INNER JOIN personas as tablaA1 on tablaA1.idPersonas = demandas.id_Abogado_DEMANDA   INNER JOIN personas as tablaA2 on tablaA2.idPersonas = demandas.id_Cliente_DEMANDA;',
            (err, resultados) => {
                if (err) {
                    reject(err);
                } else {
                   
                    console.log(resultados);
                    res.send(resultados);
                }
            });
    

};

/*obtener() {
    return new Promise((resolve, reject) => {
        conexion.query(`select id, nombre, precio from productos`,
            (err, resultados) => {
                if (err) reject(err);
                else resolve(resultados);
            });
    });
}*/

module.exports = {
    mostrarDemandaPersona
};