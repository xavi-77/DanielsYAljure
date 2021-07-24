var fs = require('fs');
var path = require('path');
var Demanda = require('../models/demanda');
var Abogado = require('../models/abogado');
var Persona = require('../models/persona');
var dbat = require('../database/db');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;
require('../config/asociations');


function saveDemanda(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
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
};

function updateDemanda(req, res) {
    var demandaId = req.params.id;
    Demanda.findOne({

        where: { idDemandas: demandaId }

    }).then(demandita => {
        const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
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
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
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

function listDemandaActivo(req, res) {
    Demanda.findAll({
        include:[ {
            model: Abogado,
            as: 'abogado'
        },{
            model: Persona,
            as: 'persona'            
        }],
    })
        .then(demanda => {
            res.send(demanda);
        })
};

function listDemandaActivoID(req, res) {
    var demandaId = req.params.id
    Demanda.findAll({
        include:[ {
            model: Abogado,
            as: 'abogado'
        },{
            model: Persona,
            as: 'persona',
        }],
        where: {
            idDemandas: demandaId
        }
    })
        .then(demanda => {
            res.send(demanda);
        })
};

function listDemandaActivoIDA(req, res) {
    var demandaId = req.params.id
    Demanda.findOne({
        where: {
            idDemandas: demandaId
        }
    })
        .then(demanda => {
            res.send(demanda);
        })
};


module.exports = {
    saveDemanda,
    updateDemanda,
    deleteDemanda,
    listDemandaActivo,
    listDemandaActivoID,
    listDemandaActivoIDA
};