var fs = require('fs');
var path = require('path');
var Persona = require('../model/persona');
var User = require('../model/usuario');
var dbat = require('../database/db');

function savePerson(req, res) {
    const today = new Date();
    const personData = {
        nombres_PERSONA: req.body.nombres_PERSONA,
        p_Apellido_PERSONA: req.body.p_Apellido_PERSONA,
        s_Apellido_PERSONA: req.body.s_Apellido_PERSONA,
        tipo_Documento_PERSONA: req.body.tipo_Documento_PERSONA,
        num_Documento_PERSONA: req.body.num_Documento_PERSONA,
        fecha_Nacimiento_PERSONA: req.body.fecha_Nacimiento_PERSONA,
        direccion_PERSONA: req.body.direccion_PERSONA,
        telefono_PERSONA: req.body.telefono_PERSONA,
        celular_PERSONA: req.body.celular_PERSONA,
        entidad_Laboral_PERSONA: req.body.entidad_Laboral_PERSONA,
        tiempo_Laboral_PERSONA: req.body.tiempo_Laboral_PERSONA,
        direccion_Empresa_PERSONA: req.body.direccion_Empresa_PERSONA,
        tel_Empresa_PERSONA: req.body.tel_Empresa_PERSONA,
        pensionado_PERSONA: req.body.pensionado_PERSONA,
        entidad_Pension_PERSONA: req.body.entidad_Pension_PERSONA,
        estado_Usuario_PERSONA: req.body.estado_Usuario_PERSONA,
        tipo_PERSONA: req.body.tipo_PERSONA,
        fecha_Creado_PERSONA: today,
        imagen_PERSONA: req.body.imagen_PERSONA
    }
    Persona.findOne({
        where: {
            num_Documento_PERSONA: req.body.num_Documento_PERSONA
        }
    }).then(persona => {
        if (!persona) {
            Persona.create(personData)
                .then(persona => {
                    res.json({ success: 'Cliente o Abogado Regitrado Satisfactoriamente...!' });
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

function updatePerson(req, res) {
    var personaId = req.params.id;

    Persona.findOne({ where: { idPersonas: personaId } })
        .then(persona => {
            const today = new Date();
            Persona.update({
                nombres_PERSONA: req.body.nombres,
                p_Apellido_PERSONA: req.body.p_Apellido,
                s_Apellido_PERSONA: req.body.s_Apellido,
                tipo_Documento_PERSONA: req.body.tipo_Documento,
                num_Documento_PERSONA: req.body.num_documento,
                fecha_Nacimiento_PERSONA: req.body.fecha_nac,
                direccion_PERSONA: req.body.direccion,
                telefono_PERSONA: req.body.telefono,
                celular_PERSONA: req.body.celular,
                entidad_Laboral_PERSONA: req.body.entidad_Laboral,
                tiempo_Laboral_PERSONA: req.body.tiempo_Laboral,
                direccion_Empresa_PERSONA: req.body.direccion_Empresa,
                tel_Empresa_PERSONA: req.body.tel_Empresa,
                pensionado_PERSONA: req.body.pensionado,
                entidad_Pension_PERSONA: req.body.entidad_Pension,
                estado_Usuario_PERSONA: req.body.estado_Usuario,
                tipo_PERSONA: req.body.tipo_PERSONA,
                fecha_Modificado_PERSONA: today,
                imagen_PERSONA: req.body.imagen_PERSONA
            }, { where: { idPersonas: personaId } })
                .then(nuevoPersona => {
                    res.json(nuevoPersona)
                })
        })
};

function deletePerson(req, res) {
    var personaId = req.params.id;
    var useridd = req.body.iduser;
    var codigo = req.body.codigo;
    const today = new Date();
    User.findOne({ where: { idUsuario: useridd, codigo_Seguridad_USUARIO: codigo } })
        .then(user => {
            if (user) {
                Persona.findOne({ where: { idPersonas: personaId } })
                    .then(persona => {
                        if (persona) {
                            Persona.update({
                                estado_Usuario_PERSONA: 'ELIMINADO',
                                fecha_Eliminado_PERSONA: today
                            }, {
                                where: { idPersonas: personaId }

                            }).then(nuevoUsuario => {
                                res.status(200).json({ message: 'Persona Eliminada...!' });
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


function listPerson(req, res) {
    Persona.findAll()
        .then(persona => {
            res.send(persona)
        })
};

function listarPersonId(req, res) {
    var personaId = req.params.id;
    Persona.findOne({ where: { idPersonas: personaId } })
        .then(persona => {
            res.send(persona)
        })
};

function listAbogado(req, res) {
    Persona.find({ where: { tipo_PERSONA: "ABOGADO" } })
        .then(persona => {
            res.send(persona)
        })
};

function listClientes(req, res) {
    Persona.find({ where: { tipo_PERSONA: "CLIENTE" } })
        .then(persona => {
            res.send(persona)
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
            Persona.update({
                imagen_PERSONA: file_name
            }, { where: { idPersonas: personaId } })
                .then(nuevoPersona => {
                    res.json(nuevoPersona)
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
    var path_file = './uploads/person/' + imageFile;
    
    fs.stat(path_file, function (stat) {
        console.log(stat);
        console.log(path_file);
        if (stat) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No Existe La Imagen...!' });
        }
    })
};

function getAbogado(req, res) {
    dbat.sequelize.query('SELECT * FROM personas WHERE genero = :genero ',
        {
            replacements: { tipo_PERSONA: 'ABOGADO' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(abogaditos => {
        res.send(abogaditos)
    })
};

function getCliente(req, res) {
    dbat.sequelize.query('SELECT * FROM personas WHERE genero = :genero ',
        {
            replacements: { tipo_PERSONA: 'CLIENTE' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(clientecitos => {
        res.send(clientecitos)
    })
};


/*function deletePerson(req, res) {
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
    savePerson,
    updatePerson,
    listPerson,
    uploadImage,
    getImageFile,
    deletePerson,
    getAbogado,
    getCliente,
    listAbogado,
    listClientes,
    listarPersonId
};