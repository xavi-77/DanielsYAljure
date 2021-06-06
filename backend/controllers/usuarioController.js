var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var User = require('../model/usuario');
const jwt = require('../services/jwt');
var dbat = require('../database/db');


function saveUsuario(req, res) {

    const today = new Date();
    const saltRounds = 12;
    const userData = {
        correo_USUARIO: req.body.correo_USUARIO.toUpperCase(),
        contra_USUARIO: req.body.contra_USUARIO,
        tipo_USUARIO: req.body.tipo_USUARIO,
        id_Persona_USUARIO: req.body.id_Persona_USUARIO,
        fecha_creado: today
    }
    User.findOne({
        where: {
            correo: req.body.correo_USUARIO
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

function login(req, res) {
    const correo = req.body.correo_USUARIO;
    User.findOne({
        where: {
            correo_USUARIO: correo.toUpperCase()
        }
    })
        .then(user => {
            bcrypt.compare(req.body.contra_USUARIO, hash, function(err, result) {
                if (check) {
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

        })
        .catch(err => {
            res.send('error: ' + err)
        })
};

function updateUsuario(req, res) {
    var userId = req.params.id;
    User.findOne({ where: { idUsuario: userId } })
        .then(user => {
            User.update({
                correo_USUARIO: req.body.correo_USUARIO.toUpperCase(),
                contra_USUARIO: req.body.contra_USUARIO,
                tipo_USUARIO: req.body.tipo_USUARIO.toUpperCase(),
                id_Persona_USUARIO: req.body.id_Persona_USUARIO,
                fecha_Modificado_PERSONA: today
            }, { where: { idUsuario: userId } })
                .then(nuevoUsuario => {
                    res.json(nuevoUsuario)
                })
        })
};

function listUsuario(req, res) {
    User.findAll()
        .then(user => {
            res.send(user)
        })
};

function deleteUsuario(req, res) {
    var userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            user.destroy();
            res.status(200).json({ message: 'Usuario Eliminado...!' });
        })
        .catch(err => {
            res.status(404).json({ message: 'Usuario No Existe...!' });
        });
};

function getUserClientes(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'CLIENTE' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
        console.log(usuario);
    })
};

function getUserAbogados(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'ABOGADO' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
        console.log(usuario);
    })
};

function getUserADMIN(req, res) {
    dbat.sequelize.query('SELECT * FROM usuarios WHERE tipo_USUARIO = :tipo_USUARIO ',
        {
            replacements: { tipo_USUARIO: 'ADMINISTRADOR' },
            type: dbat.sequelize.QueryTypes.SELECT
        }
    ).then(usuario => {
        console.log(usuario);
    })
};

/*function uploadImage(req, res) {
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
                imagen: file_name
            }, { where: { idUsuario: userId } })
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
    var path_file = './uploads/users/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No Existe La Imagen...!' });
        }
    })
};
*/




module.exports = {
    saveUsuario,
    login,
    updateUsuario,
    listUsuario,
    getUserFull,
    deleteUsuario,
    getUserClientes,
    getUserAbogados,
    getUserADMIN
};