'use strict'
var express = require('express');
var UsuarioController = require('../controllers/usuarioController');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/user'});
//SHA-256

api.post('/ba4ccdb3f54ad92c2a8287f0c29baceeb2cf1e53985af132b287b181e7f3c1bb', UsuarioController.saveUsuario);
api.put('/c11d77e34d3ec190b5fd727e462b50e280e251006e69c3363aa123121f36c320/:id', md_auth.ensureAuth, UsuarioController.updateUsuario);
api.post('/51279f4c07d9d8dae3dce293361c329dd63e2cc7bebc002c8b3a16cedeec7e0e/:id',[md_auth.ensureAuth, md_upload], UsuarioController.uploadImage);
api.post('/428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324', UsuarioController.login);
api.post('/2eb3dea466e65fa28f985a89314c5bb120581fedc363abc6b0a28cb313e6e7f7/:id', md_auth.ensureAuth, UsuarioController.deleteUsuario);
api.get('/0e6234fdd77076b933b3317b959949c2993e21da42968cf852eaf522db975e8a', md_auth.ensureAuth, UsuarioController.listUsuario);
api.get('/4bcd640d3629a4ca1e0d76bc5f893e71ebe8944fbfec155ddf47a495e5ce308c', md_auth.ensureAuth, UsuarioController.getUserAbogados);
api.get('/0d106aad430fdbf045df11a0e51114ba929eebfaafe5c0c1cf1e1e3d214a0fe8', md_auth.ensureAuth, UsuarioController.getUserClientes);
api.get('/eae2a704deed452eab059a2c15947336a2a67408949431f524e895ec796d84ef', md_auth.ensureAuth, UsuarioController.getUserADMIN);
api.get('/036368441d3a87c00980486b33b06d200219207c4f5fa28634eb3812d214e2ce/:imageFile', UsuarioController.getImageFile);

module.exports = api;