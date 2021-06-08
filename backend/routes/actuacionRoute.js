+'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var ActuacionController = require('../controllers/actuacionController');
var md_upload = multipart({uploadDir: './uploads/actuacion'});
//SHA-256

api.post('/d91358caa43d2686c22701f3a39644c398a54ed55304fb58e7b79c0571c5d347', md_auth.ensureAuth, ActuacionController.saveActuacion);
api.put('/ee7e7ee6853307301cb1e241e031d694a8685b0f4e308fdd21994cac10e80d0a/:id', md_auth.ensureAuth, ActuacionController.updateActuacion);
api.post('/c30f2d0e98c004a88361e4f0534db6ed5f9eb502d63e6437d9e9670448ab379e/:id', [md_auth.ensureAuth, md_upload], ActuacionController.uploadFichero);
api.get('/872ad8cdc82286afdc2307381d98c195d19ee6c02c0c1e5ae0747a20124cdf76/:imageFile', md_auth.ensureAuth, ActuacionController.getFicheroFile);
api.get('/111f9ef842da197eefda0f9c6b9e2a650873575d5666f19847de11bdbb492786', md_auth.ensureAuth, ActuacionController.listActuacion);
api.get('/70f27b73906e5ab67976114283da8a87aaa17efab2fbb553ad454f2bd1cbb0f2/:id', md_auth.ensureAuth, ActuacionController.listarActuacionId)
api.post('/d4aa2c52d8fa4b2fdf623315187833cfb08a0a32bdc620192971738124aa51cf/:id', md_auth.ensureAuth, ActuacionController.deleteActuacion);
api.get('/acd20984dc89c1e65e626d7008cf3cdcfa82f094ef2fc87ca61f4c8505fdcd07', md_auth.ensureAuth, ActuacionController.listActuacionEstadoActivo);

module.exports = api;