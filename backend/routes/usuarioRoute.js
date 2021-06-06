'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var UsuarioController = require('../controllers/usuarioController');
//SHA-256

api.post('/ba4ccdb3f54ad92c2a8287f0c29baceeb2cf1e53985af132b287b181e7f3c1bb',  UsuarioController.saveUsuario);
api.put('/c11d77e34d3ec190b5fd727e462b50e280e251006e69c3363aa123121f36c320/:id', md_auth.ensureAuth, UsuarioController.updateUsuario);
api.get('/0e6234fdd77076b933b3317b959949c2993e21da42968cf852eaf522db975e8a', md_auth.ensureAuth, UsuarioController.listPerson);
api.get('/428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324', UsuarioController.login)
api.delete('/2eb3dea466e65fa28f985a89314c5bb120581fedc363abc6b0a28cb313e6e7f7/:id', md_auth.ensureAuth, UsuarioController.deletePerson);
api.get('/4bcd640d3629a4ca1e0d76bc5f893e71ebe8944fbfec155ddf47a495e5ce308c', md_auth.ensureAuth, UsuarioController.getUserAbogados);
api.get('/0d106aad430fdbf045df11a0e51114ba929eebfaafe5c0c1cf1e1e3d214a0fe8', md_auth.ensureAuth, UsuarioController.getUserClientes);
api.get('/eae2a704deed452eab059a2c15947336a2a67408949431f524e895ec796d84ef', md_auth.ensureAuth, UsuarioController.getUserADMIN);

module.exports = api;