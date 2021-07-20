'use strict'
var fs = require('fs');
var path = require('path');
var Actuacion = require('../models/actuacion');
var User = require('../models/usuario');
var Demanda = require('../models/demanda');
var Persona = require('../models/persona');
var Abogado = require('../models/abogado');
var dbat = require('../database/db');

function saveActuacion(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var file_name = 'No Subido...!';
    if (req.files) {
        var file_path = req.files.fichero.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'pdf' || file_ext == 'PDF' || file_ext == 'Docx' || file_ext == 'docx' || file_ext == 'docm' || file_ext == 'dotx' || file_ext == 'dotm' || file_ext == 'doc' || file_ext == 'dot' || file_ext == 'xlsx'
            || file_ext == 'xlsm' || file_ext == 'xltx' || file_ext == 'xltm' || file_ext == 'xlsb' || file_ext == 'xlam' || file_ext == 'pptx' || file_ext == 'pptm' || file_ext == 'TXT' || file_ext == 'txt' || file_ext == 'png'
            || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF') {

            const ActuacionData = {
                fecha_ACTUACION: req.body.fecha_ACTUACION,
                concepto_ACTUACION: req.body.concepto_ACTUACION,
                fecha_Creado_ACTUACION: today,
                archivo_ACTUACION: file_name,
                estado_ACTUACION: 'ACTIVO',
                id_Demanda_ACTUACION: req.body.id_Demanda_ACTUACION
            }
            Actuacion.findOne({
                where: {
                    id_Demanda_ACTUACION: 0
                }
            }).then(actuacion => {
                if (!actuacion) {
                    Actuacion.create(ActuacionData)
                        .then(actuacion => {
                            res.json({ success: 'Actuación Regitrada Satisfactoriamente...!' });
                        })
                        .catch(err => {
                            res.send('error: ' + err);
                        })

                } else {
                    res.json({ error: 'La Actuación que intenta registrar  ya Existe...!' });
                }
            }).catch(err => {
                res.send('error: ' + err);
            })
        } else {
            res.status(200).send({ message: 'La Extensión Del Archivo No Es Válida...!' });
        }
    } else {
        res.status(200).send({ message: 'No Has Subido Ninguna Archivo...!' });
    }
}

function updateActuacion(req, res) {
    var actuacionId = req.params.id;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    Actuacion.findOne({

        where: { idActuaciones: actuacionId }

    }).then(actuacion => {
        Actuacion.update({
            fecha_ACTUACION: req.body.fecha_ACTUACION,
            concepto_ACTUACION: req.body.concepto_ACTUACION,
            fecha_Modificado_ACTUACION: today,
            estado_ACTUACION: req.body.estado_ANEXO,
            id_Demanda_ACTUACION: req.body.id_Demanda_ACTUACION
        }, { where: { idActuaciones: actuacionId } })
            .then(nuevoActuacion => {
                res.json(nuevoActuacion)
            })

    })
};

function deleteActuacion(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var actuacionId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Demanda.findOne({ where: { idActuaciones: actuacionId } })
                    .then(nuevaActuacion => {
                        if (nuevaActuacion) {
                            Actuacion.update({
                                estado_ACTUACION: 'ELIMINADO',
                                fecha_Eliminado_ACTUACION: today
                            }, {
                                where: { idActuaciones: actuacionId }

                            }).then(nuevaActuacion => {
                                res.status(200).json({ message: 'Actuación Eliminada...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error no se encontro  la actuación...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};


function listActuacionEstadoActivo(req, res) {
    Actuacion.findAll()
        .then(nuevoAnexo => {
            Actuacion.findAll({
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
                where: { estado_ACTUACION: 'ACTIVO' }
            }).then(lolking => {
                res.send(lolking);
            })
        })
};

function uploadFichero(req, res) {
    var actuacionId = req.params.id;
    var file_name = 'No Subido...!';

    if (req.files) {
        var file_path = req.files.fichero.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'pdf' || file_ext == 'PDF' || file_ext == 'Docx' || file_ext == 'docx' || file_ext == 'docm' || file_ext == 'dotx' || file_ext == 'dotm' || file_ext == 'doc' || file_ext == 'dot' || file_ext == 'xlsx'
            || file_ext == 'xlsm' || file_ext == 'xltx' || file_ext == 'xltm' || file_ext == 'xlsb' || file_ext == 'xlam' || file_ext == 'pptx' || file_ext == 'pptm' || file_ext == 'TXT' || file_ext == 'txt' || file_ext == 'png'
            || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF') {
            Actuacion.update({
                archivo_ACTUACION: file_name
            }, { where: { idActuaciones: actuacionId } })
                .then(nuevoActuacion => {
                    res.json(nuevoActuacion)
                })
        } else {
            res.status(200).send({ message: 'La Extensión Del Archivo No Es Válida...!' });
        }
    } else {
        res.status(200).send({ message: 'No Has Subido Ninguna Archivo...!' });
    }
};

function getFicheroFile(req, res) {
    var fichero = req.params.fichero;
    var path_file = './uploads/actuacion/' + fichero;
    var ruta_enc = fs.existsSync(path_file);

    if (ruta_enc) {
        res.sendFile(path.resolve(path_file));
    } else {
        res.status(200).send({ message: 'No Existe La Imagen...!' });
    }

};


module.exports = {
    saveActuacion,
    updateActuacion,
    deleteActuacion,
    listActuacionEstadoActivo,
    uploadFichero,
    getFicheroFile
};