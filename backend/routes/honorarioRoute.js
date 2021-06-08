+'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var HonorarioController = require('../controllers/honorarioController');
//SHA-256

api.post('/6db730deb5e2f16706e1c609f2d0bc4e91ff253904a71bc0f14a4af8d53964e1', md_auth.ensureAuth, HonorarioController.saveHonorario);
api.put('/aa8272421a83d305a85ac849b1f3f1628d4dbb0c92f9ffb560b147829dba6088/:id', md_auth.ensureAuth, HonorarioController.updateHonorario);
api.get('/154d45cb9815d7b4dff9f4c54b1559b5fc0b4ef5afa369f5ee0e709500370901', md_auth.ensureAuth, HonorarioController.listHonorario);
api.get('/a389e2d9bd65383dd5bb8357f767d8200d29154d711e8d2c9345435c7df074d1/:id', md_auth.ensureAuth, HonorarioController.listarHonorarioId)
api.post('/e980fd3745e6184442a5def1062062ee7bb5ce35d79111614e335b5c3b50347e/:id', md_auth.ensureAuth, HonorarioController.deleteHonorario);
api.get('/dda69b2623e6ff707b16b5d5329e85e41b86b55d13151227b8dc1d8cb06fe0ab', md_auth.ensureAuth, HonorarioController.listHonorarioEstadoActivo);

module.exports = api;