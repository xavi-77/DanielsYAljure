'use strict'
var fs = require('fs');
var path = require('path');
var GastosAdicionales = require('../models/gastosadicional');
var Persona = require('../models/persona');
var Demanda = require('../models/demanda');
var Abogado = require('../models/abogado');
var User = require('../models/usuario');
var dbat = require('../database/db');

function saveGastosAdicionales(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const GastosAdicionalesData = {
        concepto_GASTOADICIONAL: req.body.concepto_GASTOADICIONAL,
        valor_GASTOADICIONAL: req.body.valor_GASTOADICIONAL,
        id_Demanda_GASTOADICIONAL: req.body.id_Demanda_GASTOADICIONAL,
        estado_GASTOADICIONAL: 'DEUDA',
        fecha_Creado_GASTOADICIONAL: today
    }
    GastosAdicionales.findOne({
        where: {
            idGastosAdicionales: 0
        }
    }).then(gastosAdicionales => {
        if (!gastosAdicionales) {
            GastosAdicionales.create(GastosAdicionalesData)
                .then(gastosAdicionales => {
                    res.json({ success: 'Gastos Adicionales Se Han Regitrado Satisfactoriamente...!' });
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

function updateGastosAdicionales(req, res) {
    var gastosAdicionalesId = req.params.id;
    GastosAdicionales.findOne({

        where: { idGastosAdicionales: gastosAdicionalesId }

    }).then(gastosAdicionales => {
        const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        GastosAdicionales.update({
            concepto_GASTOADICIONAL: req.body.concepto_GASTOADICIONAL,
            valor_GASTOADICIONAL: req.body.valor_GASTOADICIONAL,
            id_Demanda_GASTOADICIONAL: req.body.id_Demanda_GASTOADICIONAL,
            fecha_Modificado_GASTOADICIONAL: today
        }, { where: { idGastosAdicionales: gastosAdicionalesId } })
            .then(gastosAdicionales => {
                res.json(gastosAdicionales)
            })
    })
};

function deleteGastosAdicionales(req, res) {
    var gastosAdicionalesId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                GastosAdicionales.findOne({ where: { idGastosAdicionales: gastosAdicionalesId } })
                    .then(gastosAdicionales => {
                        if (gastosAdicionales) {
                            GastosAdicionales.update({
                                estado_GASTOADICIONAL: 'ELIMINADO',
                                fecha_Eliminado_GASTOADICIONAL: today
                            }, {
                                where: { idGastosAdicionales: gastosAdicionalesId }

                            }).then(gastosAdicionales => {
                                res.status(200).json({ message: 'Gastos Adicionales  Eliminado...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error, no se encontro  el gasto Adicional...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};

function listGastosAdicionalesEstadoDeuda(req, res) {
    GastosAdicionales.findAll({
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
            estado_GASTOADICIONAL: 'DEUDA'
        }
    })
        .then(gastosAdicionales => {
            res.send(gastosAdicionales)
        })
};

function listarGastosAdicionaleEstadoPago(req, res) {
    GastosAdicionales.findAll({
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
            estado_GASTOADICIONAL: 'PAGO'
        }
    })
        .then(gastosAdicionales => {
            res.send(gastosAdicionales)
        })
};


module.exports = {
    saveGastosAdicionales,
    updateGastosAdicionales,
    deleteGastosAdicionales,
    listGastosAdicionalesEstadoDeuda,
    listarGastosAdicionaleEstadoPago
};