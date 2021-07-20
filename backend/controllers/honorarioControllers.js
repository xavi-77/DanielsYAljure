'use strict'
var fs = require('fs');
var path = require('path');
var Honorario = require('../models/honorario');
var Persona = require('../models/persona');
var Demanda = require('../models/demanda');
var Abogado = require('../models/abogado');
var User = require('../models/usuario');
var dbat = require('../database/db');

function saveHonorario(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const HonorarioData = {
        id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
        concepto_HONORARIO: req.body.concepto_HONORARIO,
        id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
        total_HONORARIO: req.body.total_HONORARIO,
        estado_HONORARIO: 'DEUDA',
        fecha_Creado_HONORARIO: today
    }
    Honorario.findOne({
        where: {
            idHonorarios: 0
        }
    }).then(honorario => {
        if (!honorario) {
            Honorario.create(HonorarioData)
                .then(honorario => {
                    res.json({ success: 'Honorario Regitrado Satisfactoriamente...!' });
                })
                .catch(err => {
                    res.send('error: ' + err);
                })

        } else {
            res.json({ error: 'El honorario que intenta registrar  ya Existe...!' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    })
}

function updateHonorario(req, res) {
    var honorarioId = req.params.id;
    Honorario.findOne({

        where: { idHonorarios: honorarioId }

    }).then(honorario => {
        const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        Honorario.update({
            id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
            concepto_HONORARIO: req.body.concepto_HONORARIO,
            id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
            total_HONORARIO: req.body.total_HONORARIO,
            estado_HONORARIO: req.body.estado_HONORARIO,
            fecha_Creado_HONORARIO: today
        }, { where: { idHonorarios: honorarioId } })
            .then(honorario => {
                res.json(honorario)
            })
    })
};

function deleteHonorario(req, res) {
    var honorarioId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Honorario.findOne({ where: { idHonorarios: honorarioId } })
                    .then(honorario => {
                        if (honorario) {
                            Honorario.update({
                                estado_HONORARIO: 'ELIMINADO',
                                fecha_Eliminado_HONORARIO: today
                            }, {
                                where: { idHonorarios: honorarioId }

                            }).then(nuevaHonorario => {
                                res.status(200).json({ message: 'Honorario  Eliminado...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error, no se encontro  el honorario...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};


function listHonorario(req, res) {
    Honorario.findAll()
        .then(nuevoHonorario => {
            res.send(nuevoHonorario)
        })
};

function listHonorarioEstadoDeuda(req, res) {
    Honorario.findAll({
        include: {
            model: Demanda,
            as: 'demanda',
            include: [{
                model: Persona,
                as: 'persona'
            }, {
                model: Abogado,
                as: 'abogado'
            }]
        },
        where: {
            estado_HONORARIO: 'DEUDA'
        }
    })
        .then(nuevoHonorario => {
            res.send(nuevoHonorario)
        })
};

function listHonorarioEstadoPago(req, res) {
    Honorario.findAll({
        include: {
            model: Demanda,
            as: 'demanda',
            include: [{
                model: Persona,
                as: 'persona'
            }, {
                model: Abogado,
                as: 'abogado'
            }]
        },
        where: {
            estado_HONORARIO: 'PAGO'
        }
    })
        .then(nuevoHonorario => {
            res.send(nuevoHonorario)
        })
};

function listarHonorarioId(req, res) {
    var honorarioId = req.params.id;
    Honorario.findOne({ where: { idHonorarios: honorarioId } })
        .then(nuevoHonorario => {
            res.send(nuevoHonorario)
        })
};

module.exports = {
    saveHonorario,
    updateHonorario,
    deleteHonorario,
    listHonorarioEstadoPago,
    listHonorarioEstadoDeuda,
    listarHonorarioId
};