var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var User = require('../models/usuario');
var Abogado = require('../models/abogado');
const jwt = require('../services/jwt');
var dbat = require('../database/db');
const Sequelize = require('Sequelize');
const op = Sequelize.Op;
require('../config/asociations');
const saltRounds = 12;


function saveUsuario(req, res) {

    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const userData = {
        correo_USUARIO: req.body.correo_USUARIO,
        contra_USUARIO: req.body.contra_USUARIO,
        tipo_USUARIO: req.body.tipo_USUARIO,
        id_Persona_USUARIO: req.body.id_Persona_USUARIO,
        codigo_Seguridad_USUARIO: req.body.codigo_Seguridad_USUARIO,
        fecha_Creado_USUARIO: today
    }
    User.findOne({
        where: {
            correo_USUARIO: req.body.correo_USUARIO
        }
    }).then(user => {
        if (!user) {
            bcrypt.hash(userData.contra_USUARIO, saltRounds, function (err, hash) {
                // Store hash in your password DB.
                userData.contra_USUARIO = hash;
                User.create(userData)
                    .then(user => {
                        res.json({ success: 'Usuario Regitrado...!' });
                    })
                    .catch(err => {
                        res.send('error: ' + err);
                    })
            });
        } else {
            res.json({ error: 'El Usuario Existe' });
        }
    })
        .catch(err => {
            res.send('error: ' + err);
        })
};


function updateUsuario(req, res) {
    var userId = req.params.id;
    const today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    User.findOne({ where: { idUsuario: userId } })
        .then(user => {
            User.update({
                correo_USUARIO: req.body.correo_USUARIO,
                contra_USUARIO: req.body.contra_USUARIO,
                tipo_USUARIO: req.body.tipo_USUARIO,
                id_Persona_USUARIO: req.body.id_Persona_USUARIO,
                codigo_Seguridad_USUARIO: req.body.codigo_Seguridad_USUARIO,
                fecha_Modificado_USUARIO: today
            }, { where: { idUsuario: userId } })
                .then(nuevoUsuario => {
                    res.json(nuevoUsuario)
                })
        })
};

function listUsuario(req, res) {
    User.findAll({
        include: {
            model: Abogado,
            as: 'abogado'
        },
        where: {
            '$abogado.estado_ABOGADO$': { [op.eq]: 'ACTIVO' }
        }
    })
        .then(user => {
            res.send(user);
        })
};

function login(req, res) {
    User.findOne({
        where: {
            correo_USUARIO: req.body.correo_USUARIO,
            estado_USUARIO: 'ACTIVO'
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.contra_USUARIO, user.contra_USUARIO, function (err, result) {
                    if (result) {
                        if (req.body.gethash) {
                            User.findAll({
                                include: {
                                    model: Abogado,
                                    as: 'abogado'
                                },
                                where: {
                                    '$abogado.idAbogados$': user.id_Persona_USUARIO
                                }
                            })
                                .then(userato => {
                                    res.status(200).send({
                                        token: jwt.createToken(userato)
                                    });
                                })

                        } else {
                            res.status(200).send({ user })
                        }
                    } else {
                        res.status(404).send({ message: 'La cuenta o la contraseña es incorrecta. Si no recuerdas la cuenta o la contraseña pida ayuda al administrador!' });
                    }
                });
            } else {
                res.status(404).send({ message: 'La cuenta esta desactivada...!' });
            }

        })
        .catch(err => {
            res.send('error: ' + err);
        })
};

function listUsuarioaa(req, res) {
    User.findAll({
        include: {
            model: 'Persona',
            as: 'persona'
        },
        where: {
            [op.and]: [
                { correo_USUARIO: req.body.correo_USUARIO },
                { '$persona.estado_Usuario_PERSONA$': { [op.eq]: 'ACTIVO' } }]
        }
    })
        .then(user => {
            res.send(user)
        })
};
/*

function deleteUsuario(req, res) {
    var userId = req.params.id;
    var codigo = req.body.codigo;
    const today = new Date();
    User.findOne({ where: { idUsuario: userId } })
        .then(user => {
            if (codigo == user.codigo_Seguridad_USUARIO) {
                User.update({
                    estado_USUARIO: req.body.estado_USUARIO,
                    fecha_Eliminado_PERSONA: today
                }, {
                    where: { idUsuario: userId }

                }).then(nuevoUsuario => {
                    res.status(200).json({ message: 'Usuario Eliminado...!' });
                })
            } else {
                res.status(404).json({ message: 'Su código de verificación no es válido...!' });
            }

        })
};



function login(req, res) {
    User.findOne({
        where: {
            correo_USUARIO: req.body.correo_USUARIO,
            estado_USUARIO: 'ACTIVO'
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.contra_USUARIO, user.contra_USUARIO, function (err, result) {
                    if (result) {
                        if (req.body.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user })
                        }
                    } else {
                        res.status(404).send({ message: 'La cuenta o la contraseña es incorrecta. Si no recuerdas la cuenta o la contraseña pida ayuda al administrador!' });
                    }
                });
            } else {
                res.status(404).send({ message: 'La cuenta esta desactivada...!' });
            }

        })
        .catch(err => {
            res.send('error: ' + err)
        })
};


function listUsuario(req, res) {
    User.findAll()
        .then(user => {
            res.send(user)
        })
};



function getUserClientes(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'CLIENTE' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
       
    })
};

function getPersona(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios u JOIN personas p ON u.id_Persona_USUARIO = p.idPersonas WHERE p.idPersonas= :idPersonas',
        {
            replacements: { idPersonas: '2' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
    })
};

function getUserAbogados(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'ABOGADO' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
    })
};

function getUserADMIN(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'ADMINISTRADOR' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
    })
};

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No Subido...!';
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'GIF') {
            User.update({
                imagen_USUARIO: file_name
            }, { where: { idUsuario : userId } })
                .then(nuevoUsuario => {
                    res.json(nuevoUsuario)
                })
        } else {
            res.status(200).send({ message: 'La Extension Del Archivo No Es Valida...!' });
        }
    } else {
        res.status(200).send({ message: 'No Has Subido Ninguna Imagen...!' });
    }
};


function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/usuar/' + imageFile;
    var ruta_enc = fs.existsSync(path_file);
    if (ruta_enc) {
        res.sendFile(path.resolve(path_file));
    } else {
        res.status(200).send({ message: 'No Existe La Imagen...!' });
    }

};

/*function deleteUsuario(req, res) {
    var userId = req.params.id;
    User.findOne({ where: { idUsuario: userId } })
        .then(user => {
            User.findByPk(userId)
                .then(user => {
                    user.destroy();
                    res.status(200).json({ message: 'Usuario Eliminado...!' });
                })
                .catch(err => {
                    res.status(404).json({ message: 'Usuario No Existe...!' });
                });
        })
};
*/
module.exports = {
    saveUsuario,
    updateUsuario,
    listUsuario,
    login,
    listUsuarioaa
    /* 
     deleteUsuario,
     
     
     getUserClientes,
     getUserAbogados,
     getUserADMIN,
     getPersona,
     uploadImage,
     getImageFile*/

};