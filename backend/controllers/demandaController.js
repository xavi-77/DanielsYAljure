'use strict'
var fs = require('fs');
var path = require('path');
var Demanda = require('../model/demanda');
var Persona = require('../model/persona')
var User = require('../model/usuario');
var dbat = require('../database/db');

function saveDemanda(req, res) {
    const today = new Date();
    const DemandaData = {
        tipo_DEMANDA: req.body.tipo_DEMANDA,
        fecha_DEMANDA: req.body.fecha_DEMANDA,
        especialida_DEMANDA: req.body.especialida_DEMANDA,
        radicado_DEMANDA: req.body.radicado_DEMANDA,
        juzgado_Origen_DEMANDA: req.body.juzgado_Origen_DEMANDA,
        juzgado_Ejecucion_DEMANDA: req.body.juzgado_Ejecucion_DEMANDA,
        id_Abogado_DEMANDA: req.body.id_Abogado_DEMANDA,
        id_Cliente_DEMANDA: req.body.id_Cliente_DEMANDA,
        fecha_Creado_DEMANDA: today,
        estado_DEMANDA: req.body.estado_DEMANDA
    }
    Demanda.findOne({
        where: {
            radicado_DEMANDA: req.body.radicado_DEMANDA
        }
    }).then(demand => {
        if (!demand) {
            Demanda.create(DemandaData)
                .then(demandita => {
                    res.json({ success: 'Demanda Regitrada Satisfactoriamente...!' });
                })
                .catch(err => {
                    res.send('error: ' + err);
                })

        } else {
            res.json({ error: 'La Demanda que intenta registrar con ese numero de Radicado ya Existe...!' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    })
}

function updateDemanda(req, res) {
    var demandaId = req.params.id;
    Demanda.findOne({

        where: { idDemandas: demandaId }

    }).then(demandita => {
        const today = new Date();
        Demanda.update({
            tipo_DEMANDA: req.body.tipo_DEMANDA,
            fecha_DEMANDA: req.body.fecha_DEMANDA,
            especialida_DEMANDA: req.body.especialida_DEMANDA,
            radicado_DEMANDA: req.body.radicado_DEMANDA,
            juzgado_Origen_DEMANDA: req.body.juzgado_Origen_DEMANDA,
            juzgado_Ejecucion_DEMANDA: req.body.juzgado_Ejecucion_DEMANDA,
            id_Abogado_DEMANDA: req.body.id_Abogado_DEMANDA,
            id_Cliente_DEMANDA: req.body.id_Cliente_DEMANDA,
            fecha_Modificado_DEMANDA: today,
            estado_DEMANDA: req.body.estado_DEMANDA
        }, { where: { idDemandas: demandaId } })
            .then(nuevaDemanda => {
                res.json(nuevaDemanda)
            })
    })
};

function deleteDemanda(req, res) {
    var demandaId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date();
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Demanda.findOne({ where: { idDemandas: demandaId } })
                    .then(demandita => {
                        if (demandita) {
                            Demanda.update({
                                estado_DEMANDA: 'ELIMINADO',
                                fecha_Eliminado_DEMANDA: today
                            }, {
                                where: { idDemandas: demandaId }

                            }).then(nuevoUsuario => {
                                res.status(200).json({ message: 'Demanda Eliminada...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error no se encontro a la persona...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};


function listDemanda(req, res) {
    Demanda.findAll()
        .then(demandita => {
            res.send(demandita)
        })
};

function listDemandaEstadoActivo(req, res) {
    Demanda.findAll({
        where: {
            estado_DEMANDA: 'ACTIVO'
        }
    })
        .then(demandita => {
            res.send(demandita)
        })
};

function listarDemandaId(req, res) {
    var demandaId = req.params.id;
    Demanda.findOne({ where: { idDemandas: demandaId } })
        .then(demandita => {
            res.send(demandita)
        })
};

function listarDemandaRadicado(req, res) {
    var radicado_DEMANDA = req.body.radicado_DEMANDA;
    Demanda.findOne({ where: { radicado_DEMANDA: radicado_DEMANDA } })
        .then(demandita => {
            res.send(demandita)
        })
};

/*function getCliente(req, res) {
    dbat.sequelize.query('SELECT * FROM personas WHERE genero = :genero ',
        {
            replacements: { tipo_PERSONA: 'CLIENTE' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(clientecitos => {
        res.send(clientecitos)
    })
};


function deletePerson(req, res) {
    var personaId = req.params.id;
    Persona.findByPk(personaId)
        .then(persona => {
            Persona.destroy();
            res.status(200).json({ message: 'Persona Eliminada...!' });
        })
        .catch(err => {
            res.status(404).json({ message: 'Persona  No Existe...!' });
        });
};
*/

/*function listarDemandasCompletas(req, res){
    db.seq.query('SELECT * FROM ((`demandas` as dem INNER JOIN `personas` as pert ON dem.id_Abogado_DEMANDA = pert.idPersonas) INNER JOIN `personas`as pertu ON dem.id_Cliente_DEMANDA = pertu.idPersonas)').success(function(rows){
        res.json(rows);
    });

}*/
/*function listarDemandasCompletas(req, res){
    Demanda.findAll({
        include: [{
          model: Persona,
      //  required: false
         }]
      }).then(demandita => {
        console.log('Hola');
      });
    
}*/



module.exports = {
    saveDemanda,
    updateDemanda,
    deleteDemanda,
    listDemanda,
    listarDemandaId,
    listarDemandaRadicado,
    listDemandaEstadoActivo
};