var fs = require('fs');
var path = require('path');
var Abogado = require('../models/abogado');
var User = require('../models/usuario');
var dbat = require('../database/db');

function saveAbogado(req, res) {
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const lawyerData = {
        nombres_ABOGADO: req.body.nombres_ABOGADO,
        s_Nombre_ABOGADO:req.body.s_Nombre_ABOGADO,
        p_Apellido_ABOGADO: req.body.p_Apellido_ABOGADO,
        s_Apellido_ABOGADO: req.body.s_Apellido_ABOGADO,
        fehca_Nacimiento_ABOGADO: req.body.fehca_Nacimiento_ABOGADO,
        tipo_Documento_ABOGADO: req.body.tipo_Documento_ABOGADO,
        numero_Documento_ABOGADO: req.body.numero_Documento_ABOGADO,
        numero_Documento_Profesional_ABOGADO: req.body.numero_Documento_Profesional_ABOGADO,
        celular_ABOGADO: req.body.celular_ABOGADO,
        direccion_ABOGADO: req.body.direccion_ABOGADO,
        tipo_ABOGADO: req.body.tipo_ABOGADO,
        estado_ABOGADO: 'ACTIVO',
        fecha_Creado_ABOGADO: today
    }
    Abogado.findOne({
        where: {
            numero_Documento_ABOGADO: req.body.numero_Documento_ABOGADO
        }
    }).then(aboga => {
        if (!aboga) {
            Abogado.create(lawyerData)
                .then(aboga => {
                    res.json({ success: 'Abogado Regitrado Satisfactoriamente...!' });
                })
                .catch(err => {
                    res.send('error: ' + err);
                })

        } else {
            res.json({ error: 'El Abogado que intenta registrar con ese numero de Cédula de Ciudadanía ya Existe...!' });
        }
    }).catch(err => {
        res.send('error: ' + err);
    })
}

function updateAbogado(req, res) {
    var abogadoId = req.params.id;

    Abogado.findOne({ where: { idAbogados: abogadoId } })
        .then(aboga => {
            const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            Abogado.update({
                nombres_ABOGADO: req.body.nombres_ABOGADO,
                s_Nombre_ABOGADO:req.body.s_Nombre_ABOGADO,
                p_Apellido_ABOGADO: req.body.p_Apellido_ABOGADO,
                s_Apellido_ABOGADO: req.body.s_Apellido_ABOGADO,
                fehca_Nacimiento_ABOGADO: req.body.fehca_Nacimiento_ABOGADO,
                tipo_Documento_ABOGADO: req.body.tipo_Documento_ABOGADO,
                numero_Documento_ABOGADO: req.body.numero_Documento_ABOGADO,
                numero_Documento_Profesional_ABOGADO: req.body.numero_Documento_Profesional_ABOGADO,
                celular_ABOGADO: req.body.celular_ABOGADO,
                direccion_ABOGADO: req.body.direccion_ABOGADO,
                tipo_ABOGADO: req.body.tipo_ABOGADO,
                estado_ABOGADO: 'ACTIVO',
                imagen_ABOGADO: req.body.imagen_ABOGADO,
                fecha_Modificado_ABOGADO: today
            }, { where: { idAbogados: abogadoId } })
                .then(nuevaAbogado => {
                    res.json(nuevaAbogado);
                });
        });
};

function deleteAbogado(req, res) {
    var personaId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Abogado.findOne({ where: { idAbogados: abogadoId } })
                    .then(aboga => {
                        if (aboga) {
                            Abogado.update({
                                estado_ABOGADO: 'ELIMINADO',
                                fecha_Eliminado_ABOGADO: today
                            }, {
                                where: { idAbogados: abogadoId }

                            }).then(nuevoUsuario => {
                                res.status(200).json({ message: 'Abogado Eliminado...!' });
                            })
                        } else {
                            res.status(404).json({ message: 'Hubo un error no se encontro al Abogado...!' });
                        }

                    })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};

function uploadImage(req, res) {
    var personaId = req.params.id;
    var file_name = 'No Subido...!';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF') {
            Abogado.update({
                imagen_ABOGADO: file_name
            }, { where: { idAbogados: abogadoId } })
                .then(nuevoAbogado => {
                    res.json(nuevoAbogado)
                })
        } else {
            res.status(200).send({ message: 'La Extensión Del Archivo No Es Válida...!' });
        }
    } else {
        res.status(200).send({ message: 'No Has Subido Ninguna Imagen...!' });
    }
};

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/abogado/' + imageFile;
    var ruta_enc = fs.existsSync(path_file);

    if (ruta_enc) {
        res.sendFile(path.resolve(path_file));
    } else {
        res.status(200).send({ message: 'No Existe La Imagen...!' });
    }

};

function listActivo(req, res) {
    Abogado.findAll({ where: { estado_ABOGADO: "ACTIVO" } })
        .then(aboga => {
            res.send(aboga)
        })
};

module.exports = {
    saveAbogado,
    updateAbogado,
    deleteAbogado,
    uploadImage,
    getImageFile,
    listActivo
    /*listPerson,
    getAbogado,
    getCliente,
    listAbogado,
    listClientes,
    listarPersonId,
    */
};