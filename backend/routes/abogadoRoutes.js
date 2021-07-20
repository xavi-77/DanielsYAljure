'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var AbogadoController = require('../controllers/abogadoControllers');
var md_upload = multipart({uploadDir: './uploads/abogado'});
//SHA-256

api.post('/2dae17ad02d19386271241936d7e84aaec813ffe2efe843248912cb520f5d4c9', md_auth.ensureAuth, AbogadoController.saveAbogado);
api.put('/85f9b4ae4ab1f3fb5efa2a2ac0d78b8753abca35c75a0dafafcd4957ca32e3cc/:id', md_auth.ensureAuth, AbogadoController.updateAbogado);
api.post('/9484af3ae9163c88365aac3d19dbf410d49770abf88a466c0d72f5c72435d2f3/:id', md_auth.ensureAuth, AbogadoController.deleteAbogado);
api.get('/a6dc05b6e22ca47cd707fe84b4a49250fec4f66255620e914e051c4c9752d752',  md_auth.ensureAuth, AbogadoController.listActivo);
api.get('/1c3f34b752b47016f4071f145501442cbf11c15221ef5df02b7e0b74c864e642/:imageFile', AbogadoController.getImageFile);
api.post('/b26d8b6ef68ade79fe920330ce7f39c8a2f6ba729f27c65383c27b9302e43e6d/:id',[md_auth.ensureAuth, md_upload], AbogadoController.uploadImage);


module.exports = api;