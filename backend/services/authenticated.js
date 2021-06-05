'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'xapmSJPDnDcDa7.@';


exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La Petición No Tiene La Cabecera De Autenticación...!' })
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token  Expirado' });
        }
    } catch (ex) {
        return res.status(404).send({ message: 'El Token No Es Válido...!' })
    }
    req.user = payload;

    next();
};