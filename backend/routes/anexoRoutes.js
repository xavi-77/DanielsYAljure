'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var AnexoController = require('../controllers/anexoControllers');
var md_upload = multipart({uploadDir: './uploads/anexo'});
//SHA-256

api.post('/4b3aeb1f73764dfc5e4d91de4ed8433d73a785debd00b3d166bf5976077cb588', [md_auth.ensureAuth, md_upload], AnexoController.saveAnexo);
api.put('/da32fa05272a7da1fab18d2bacac84735e0e586501313e28e41f6a757c66f134/:id', md_auth.ensureAuth, AnexoController.updateAnexo);
api.post('/7e8de9400b26cf8014d34bbf3bf19a8f65d008e1e180b566246550d37a832dbc/:id', md_auth.ensureAuth, AnexoController.deleteAnexo);
api.get('/1f8d915e65e2235ff2e89ce19cd563a86f4614cb1db47b463b60e1b94ca5d2df',  md_auth.ensureAuth, AnexoController.listAnexoEstadoActivo);


module.exports = api;