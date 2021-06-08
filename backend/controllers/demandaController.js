'use strict'
var fs = require('fs');
var path = require('path');
var Demanda = require('../model/demanda');
var User = require('../model/usuario');
var dbat = require('../database/db');

function saveDemanda(req, res) {
    const today = new Date();
    const DemandaData = {
        tipo_DEMANDA: req.body.tipo,
        fecha_DEMANDA: req.body.fecha,
        especialida_DEMANDA: req.body.especialida,
        radicado_DEMANDA: req.body.radicado,
        juzgado_Origen_DEMANDA: req.body.juzgado_Origen,
        juzgado_Ejecucion_DEMANDA: req.body.juzgado_Ejecucion,
        id_Abogado_DEMANDA: req.body.id_Abogado,
        id_Cliente_DEMANDA: req.body.id_Cliente,
        fecha_Creado_DEMANDA: today,
        estado_DEMANDA: req.body.estado
    }
    Demanda.findOne({
        where: {
            radicado_DEMANDA: req.body.radicado
        }
    }).then(demand => {
        if (!demand) {
            Persona.create(DemandaData)
                .then(demandita => {
                    res.json({ success: 'Demanda Regitrada Satisfactoriamente...!' });
                })
                .catch(err => {
                    res.send('error: ' + err);
                })

        } else {
            res.json({ error: 'La Persona que intenta registrar con ese numero de Cédula de Ciudadanía ya Existe...!' });
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
            tipo_DEMANDA: req.body.tipo,
            fecha_DEMANDA: req.body.fecha,
            especialida_DEMANDA: req.body.especialida,
            radicado_DEMANDA: req.body.radicado,
            juzgado_Origen_DEMANDA: req.body.juzgado_Origen,
            juzgado_Ejecucion_DEMANDA: req.body.juzgado_Ejecucion,
            id_Abogado_DEMANDA: req.body.id_Abogado,
            id_Cliente_DEMANDA: req.body.id_Cliente,
            fecha_Modificado_DEMANDA: today,
            estado_DEMANDA: req.body.estado
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
    var radicado = req.body.radicado;
    Demanda.find({ where: { radicado_DEMANDA: radicado } })
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


module.exports = {
    saveDemanda,
    updateDemanda,
    deleteDemanda,
    listDemanda,
    listarDemandaId,
    listarDemandaRadicado,
    listDemandaEstadoActivo
};