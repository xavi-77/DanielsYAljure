'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var PersonaController = require('../controllers/personaControllers');
var md_upload = multipart({uploadDir: './uploads/person'});
//SHA-256

api.post('/1c666231894daf6f8fe18f1b1b5f2d82fa67b8f194ec73139ce51e09e786b126', md_auth.ensureAuth, PersonaController.savePerson);
api.put('/0cbbcf507cfc6b6c2db5a6babd0347dc723df6807bc56b8cf35df35ccd179faf/:id', md_auth.ensureAuth, PersonaController.updatePerson);
api.post('/670d1a11689c25d1e58eff7211d9ce1c943d2f0c28fbbb2175264c9f49ce3f3b/:id', md_auth.ensureAuth, PersonaController.deletePerson);
api.get('/ff4f4ce4cf5bcc3c9613176748b9880e28524745808a88729cf93c732e6d7cd8',  md_auth.ensureAuth, PersonaController.listActivo);


module.exports = api;