'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var PersonaController = require('../controllers/personaController');
var md_upload = multipart({uploadDir: './uploads/person'});
//SHA-256

api.post('/1c666231894daf6f8fe18f1b1b5f2d82fa67b8f194ec73139ce51e09e786b126',  PersonaController.savePerson);
api.put('/0cbbcf507cfc6b6c2db5a6babd0347dc723df6807bc56b8cf35df35ccd179faf/:id', md_auth.ensureAuth, PersonaController.updatePerson);
api.post('/51279f4c07d9d8dae3dce293361c329dd63e2cc7bebc002c8b3a16cedeec7e0e/:id', [md_auth.ensureAuth, md_upload], PersonaController.uploadImage);
api.get('/4127c5991d0e8a0e719c4156eb0b49be7f480082d8f4a1b384dc828176231e56/:imageFile', PersonaController.getImageFile);
api.get('/42114640684951d7e2a1779aa2bad44772fb9ffc559c2e547d49cc7ad1d9b653', md_auth.ensureAuth, PersonaController.listPerson);
api.get('/6349b485fc8d94fe48f20190106cb8ef6d2e2db5f9631bfcd47f374cf0196c30/:id', md_auth.ensureAuth, PersonaController.listarPersonId)
api.delete('/670d1a11689c25d1e58eff7211d9ce1c943d2f0c28fbbb2175264c9f49ce3f3b/:id', md_auth.ensureAuth, PersonaController.deletePerson);
api.get('/0df17a40bef7efc59a65773a7219db38fe2e3f0346a11fadb6641fafc2cdeefd', md_auth.ensureAuth, PersonaController.getAbogado);
api.get('/a8fea2a8eae2acb92d9b32f9f8f43a8e6bff78a52de0aef38f9f5798982259b8', md_auth.ensureAuth, PersonaController.getCliente);

module.exports = api;