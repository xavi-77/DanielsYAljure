'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var HonorarioController = require('../controllers/honorarioControllers');
var md_upload = multipart({uploadDir: './uploads/honorario'});
//SHA-256

api.post('/a8d42cbbc9c8b7365856f1b1ae15492ab5d0f2ab7d0e602fe89d91abf461d617', md_auth.ensureAuth, HonorarioController.saveHonorario);
api.put('/a22025f17ceb1fe623ed212c7f63919d08c0f5b4abb582572ffda44d58c39aab/:id', md_auth.ensureAuth, HonorarioController.updateHonorario);
api.post('/5c0e557b88ed284f870a735ec93468afa4940ca05f63f65c7c30dae4e94e4419/:id', md_auth.ensureAuth, HonorarioController.deleteHonorario);
api.get('/d1fd5ee6367bfeb10eed96c00d289fd00eb45bfa0f16c3eea71bdd931470807c',  md_auth.ensureAuth, HonorarioController.listHonorarioEstadoDeuda);
api.get('/3603b64d526420b11d40895a1242b4a3099b91b12b1d7c5a565b331b2e76327d',  md_auth.ensureAuth, HonorarioController.listHonorarioEstadoPago);


module.exports = api;