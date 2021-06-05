'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'xapmSJPDnDcDa7.@';

exports.createToken = function(persona){
    var payload = {
        sub: persona._idUsuario,
        name: persona.nombres_PERSONA,
        apellido: persona.p_Apellido_PERSONA,
        sapellido: persona.s_Apellido_PERSONA,
        correo: persona.correo_USUARIO,
        tipo_usuario: persona.tipo_usuario,
        estado: user.estado_Usuario_PERSONA,
        imagen: user.imagen_PERSONA,
        iat: moment().unix(),
        exp: moment().add(1,'days').unix


    };
}