'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var GastoAdicionalController = require('../controllers/gastoadicionalControllers');
var md_upload = multipart({uploadDir: './uploads/anexo'});
//SHA-256

api.post('/67756de361cdb602f5f9f633b26707d20026a553ee42e61aa51df9a048518425', md_auth.ensureAuth, GastoAdicionalController.saveGastosAdicionales);
api.put('/a42fd57795c91bf492656a92d2e58926254241902e420bb7a2690e24a683b02c/:id', md_auth.ensureAuth, GastoAdicionalController.updateGastosAdicionales);
api.post('/383f3b9415e7b73dac141f2cb6042c2a5b502bfdfe8d711258d6f081fc084e37/:id', md_auth.ensureAuth, GastoAdicionalController.deleteGastosAdicionales);
api.get('/ebda0d937a9608b4c58edefc9fb63590722870df98a0c6a720db996582b38b1b',  md_auth.ensureAuth, GastoAdicionalController.listGastosAdicionalesEstadoDeuda);
api.get('/04f302a8db44cdbbc66f7d112a00809d773dc43960585518dd0ad0357ef8f408',  md_auth.ensureAuth, GastoAdicionalController.listarGastosAdicionaleEstadoPago);


module.exports = api;