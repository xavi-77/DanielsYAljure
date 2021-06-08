+'use strict'
var fs = require('fs');
var path = require('path');
var Honorario = require('../model/honorario');
var User = require('../model/usuario');
var dbat = require('../database/db');

function saveHonorario(req, res) {
    const today = new Date();
    const HonorarioData = {
        id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
        id_Abogado_HONORARIO: req.body.id_Abogado_HONORARIO,
        id_Cliente_HONORARIO: req.body.id_Cliente_HONORARIO,
        concepto_HONORARIO: req.body.concepto_HONORARIO,
        total_HONORARIO: req.body.total_HONORARIO,
        estado_HONORARIO: req.body.estado_HONORARIO,
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
        const today = new Date();
        Honorario.update({
            id_Demanda_HONORARIO: req.body.id_Demanda_HONORARIO,
            id_Abogado_HONORARIO: req.body.id_Abogado_HONORARIO,
            id_Cliente_HONORARIO: req.body.id_Cliente_HONORARIO,
            concepto_HONORARIO: req.body.concepto_HONORARIO,
            total_HONORARIO: req.body.total_HONORARIO,
            estado_HONORARIO: req.body.estado_HONORARIO,
            fecha_Modificado_HONORARIO: today
        }, { where: { idActuaciones: actuacionId } })
            .then(honorario => {
                res.json(honorario)
            })
    })
};

function deleteHonorario(req, res) {
    var honorarioId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date();
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

function listHonorarioEstadoActivo(req, res) {
    Honorario.findAll({
        where: {
            estado_HONORARIO: 'ACTIVO'
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
    saveHonorario,
    updateHonorario,
    deleteHonorario,
    listHonorario,
    listHonorarioEstadoActivo,
    listarHonorarioId
};