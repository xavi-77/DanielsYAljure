+'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var AnexoController = require('../controllers/anexoController');
var md_upload = multipart({uploadDir: './uploads/anexo'});
//SHA-256

api.post('/f606636a3517a304ea5e45136bde14e69d2a5e607f943bad0f877aa1d60f358b', md_auth.ensureAuth, AnexoController.saveAnexo);
api.put('/9c0e42848a5329f46b1878e1882750745d54b0ea504f9e255109306f29fd6e52/:id', md_auth.ensureAuth, AnexoController.updateAnexo);
api.post('/5dabb33ffa456a83cf879d563660a4facf07edc2a44bb14002149858bb11edad/:id', [md_auth.ensureAuth, md_upload], AnexoController.uploadFichero);
api.get('/801c59842b79b8078c99f4bfe9b97add175e43701e63a11f0f88f4d330092858/:imageFile', md_auth.ensureAuth, AnexoController.getFicheroFile);
api.get('/4ac14d03df7d725c5ae033c05e563264c0d36a7ae394dc759af6a6126cc38d04', md_auth.ensureAuth, AnexoController.listAnexo);
api.get('/f8daada0103f3fb29bb649acde716382951b8942a1ec815e5744af3c5acb33cf/:id', md_auth.ensureAuth, AnexoController.listarAnexoId)
api.post('/49f4177d5ff0d27c5367ab5018e8f841552d7567741cbd0691b118d85d2cc6a6/:id', md_auth.ensureAuth, AnexoController.deleteAnexo);
api.get('/a68c9ec8c895811992e7ecd6f8e1bad12cf5424f1949f7e982a7a43a6361d670', md_auth.ensureAuth, AnexoController.listAnexoEstadoActivo);

module.exports = api;