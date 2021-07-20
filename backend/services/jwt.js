'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'xapmSJPDnDcDa7.@';

exports.createToken = function(user){
    var payload = {
        sub: user.idUsuario,
        name: user.nombre_USUARIO,
        apellido: user.p_Apellido_USUARIO,
        sapellido: user.s_Apellido_USUARIO,
        correo: user.correo_USUARIO,
        tipo_usuario: user.tipo_USUARIO,
        estado: user.estado_USUARIO,
        imagen: user.imagen_USUARIO,
        iat: moment().unix(),
        exp: moment().add(1,'days').unix
    };
    return jwt.encode(payload, secret);
}