'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var ActuacionController = require('../controllers/actuacionControllers');
var md_upload = multipart({uploadDir: './uploads/actuacion'});
//SHA-256

api.post('/7c757537795910261265537c33f2f93ec95a0ed9aaf5d0fc1ff7b7a0db71d5ac', [md_auth.ensureAuth, md_upload], ActuacionController.saveActuacion);
api.put('/7e4cf5701cf762a18c8e86b38ddb0628ad2df8f6c7584596e1b3216a74091dcd/:id', md_auth.ensureAuth, ActuacionController.updateActuacion);
api.post('/24df44888fb27be97eef481c8de69b5d312ae94d29b2d7db63fd16b32ff2c04a/:id', md_auth.ensureAuth, ActuacionController.deleteActuacion);
api.get('/e6ba3b2d390d7a78d64b26b4beb4389800680b39e500e7c91ce2b4431b10ff7d',  md_auth.ensureAuth, ActuacionController.listActuacionEstadoActivo);


module.exports = api;