'use strict'
var fs = require('fs');
var path = require('path');
var Anexo = require('../models/anexo');
var User = require('../models/usuario');
var Demanda = require('../models/demanda');
var Abogado = require('../models/abogado');
var Persona = require('../models/persona');
var dbat = require('../database/db');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;
require('../config/asociations');

function saveAnexo(req, res) {
    var file_name = 'No Subido...!';
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    if (req.files) {
        var file_path = req.files.fichero.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'pdf' || file_ext == 'PDF' || file_ext == 'Docx' || file_ext == 'docx' || file_ext == 'docm' || file_ext == 'dotx' || file_ext == 'dotm' || file_ext == 'doc' || file_ext == 'dot' || file_ext == 'xlsx'
            || file_ext == 'xlsm' || file_ext == 'xltx' || file_ext == 'xltm' || file_ext == 'xlsb' || file_ext == 'xlam' || file_ext == 'pptx' || file_ext == 'pptm' || file_ext == 'TXT' || file_ext == 'txt' || file_ext == 'png'
            || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF') {

            const AnexoData = {
                concepto_ANEXO: req.body.concepto_ANEXO,
                tipo_Documento_ANEXO: req.body.tipo_Documento_ANEXO,
                fecha_Creado_ANEXO: today,
                nombre_Documento_ANEXO: file_name,
                estado_ANEXO: req.body.estado_ANEXO,
                id_Demanda_ANEXO: req.body.id_Demanda_ANEXO
            }

            Anexo.findOne({
                where: {
                    idAnexo: 0
                }
            }).then(anexo => {
                if (!anexo) {
                    Anexo.create(AnexoData)
                        .then(anexo => {
                            res.json({ success: 'Anexo Regitrado Satisfactoriamente...!' });
                        })
                        .catch(err => {
                            res.send('error: ' + err);
                        })

                } else {
                    res.json({ error: 'El anexo que intenta registrar  ya Existe...!' });
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
};

function updateAnexo(req, res) {
    var anexoId = req.params.id;
    Anexo.findOne({

        where: { idAnexo: anexoId }

    }).then(anexo => {
        const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        Anexo.update({
            concepto_ANEXO: req.body.concepto_ANEXO,
            tipo_Documento_ANEXO: req.body.tipo_Documento_ANEXO,
            fecha_Modificado_ANEXO: today,
            nombre_Documento_ANEXO: req.body.nombre_Documento_ANEXO,
            estado_ANEXO: 'ACTIVO',
            id_Demanda_ANEXO: req.body.id_Demanda_ANEXO
        }, { where: { idActuaciones: actuacionId } })
            .then(anexo => {
                res.json(anexo)
            })
    })
};

function deleteAnexo(req, res) {
    var anexoId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Anexo.findOne({ where: { idAnexo: anexoId } })
                    .then(anexo => {
                        if (anexo) {
                            Anexo.update({
                                estado_ANEXO: 'ELIMINADO',
                                fecha_Eliminado_ANEXO: today
                            }, {
                                where: { idAnexo: anexoId }

                            }).then(nuevaAnexo => {
                                res.status(200).json({ message: 'Anexo  Eliminado...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error no se encontro  el anexo...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};


function listAnexoEstadoActivo(req, res) {
    Anexo.findAll()
        .then(nuevoAnexo => {
            Anexo.findAll({
                include: {
                    model: Demanda,
                    as: 'demanda',
                    include: [{
                        model:Persona,
                        as: 'persona'
                    },{ 
                        model:Abogado,
                        as: 'abogado'
                    }]
                }
            }).then(lolking => {
                res.send(lolking);
            })
        })
};


function uploadFichero(req, res) {
    var anexoId = req.params.id;
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
                nombre_Documento_ANEXO: file_name
            }, { where: { idAnexo: anexoId } })
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
    var path_file = './uploads/anexo/' + fichero;
    var ruta_enc = fs.existsSync(path_file);

    if (ruta_enc) {
        res.sendFile(path.resolve(path_file));
    } else {
        res.status(200).send({ message: 'No Existe El Archivo...!' });
    }

};


module.exports = {
    saveAnexo,
    updateAnexo,
    deleteAnexo,
    listAnexoEstadoActivo,
    uploadFichero,
    getFicheroFile
};