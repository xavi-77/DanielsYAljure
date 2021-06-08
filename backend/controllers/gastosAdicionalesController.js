+'use strict'
var fs = require('fs');
var path = require('path');
var GastosAdicionales = require('../model/gastosadicionale');
var User = require('../model/usuario');
var dbat = require('../database/db');

function saveGastosAdicionales(req, res) {
    const today = new Date();
    const GastosAdicionalesData = {
        concepto_GASTOADICIONAL: req.body.concepto_GASTOADICIONAL,
        valor_GASTOADICIONAL: req.body.valor_GASTOADICIONAL,
        id_Demanda_GASTOADICIONAL: req.body.id_Demanda_GASTOADICIONAL,
        estado_GASTOADICIONAL: req.body.estado_GASTOADICIONAL,
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
        const today = new Date();
        GastosAdicionales.update({
            concepto_GASTOADICIONAL: req.body.concepto_GASTOADICIONAL,
            valor_GASTOADICIONAL: req.body.valor_GASTOADICIONAL,
            id_Demanda_GASTOADICIONAL: req.body.id_Demanda_GASTOADICIONAL,
            estado_GASTOADICIONAL: req.body.estado_GASTOADICIONAL,
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
    const today = new Date();
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


function listGastosAdicionales(req, res) {
    GastosAdicionales.findAll()
        .then(gastosAdicionales => {
            res.send(gastosAdicionales)
        })
};

function listGastosAdicionalesEstadoActivo(req, res) {
    GastosAdicionales.findAll({
        where: {
            estado_GASTOADICIONAL: 'ACTIVO'
        }
    })
        .then(gastosAdicionales => {
            res.send(gastosAdicionales)
        })
};

function listarGastosAdicionalesId(req, res) {
    var gastosAdicionalesId = req.params.id;
    Honorario.findOne({ where: { idGastosAdicionales: gastosAdicionalesId } })
        .then(gastosAdicionales => {
            res.send(gastosAdicionales)
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
    saveGastosAdicionales,
    updateGastosAdicionales,
    deleteGastosAdicionales,
    listGastosAdicionales,
    listGastosAdicionalesEstadoActivo,
    listarGastosAdicionalesId
};