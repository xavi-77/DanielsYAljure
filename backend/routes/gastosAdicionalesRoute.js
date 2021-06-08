+'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var GastosAdicionalesController = require('../controllers/gastosAdicionalesController');
//SHA-256

api.post('/cee0e00ed449dc67030fd04bbf5d3f9c3bb3bf04cefdfd693b0517aebb3ec3f3', md_auth.ensureAuth, GastosAdicionalesController.saveGastosAdicionales);
api.put('/af956c00ac779f5f32c50a2508943aeab5d8bd325862a2b6531468f2417d65ea/:id', md_auth.ensureAuth, GastosAdicionalesController.updateGastosAdicionales);
api.get('/5f65a441d1b4c4cba3f925681cc42cc049dd4b1f95349af988eef31aa6459368', md_auth.ensureAuth, GastosAdicionalesController.listGastosAdicionales);
api.get('/889f0488cab1fe35d0b9778af7d700577852c9f2c02c64e7d19dc93574ee9fee/:id', md_auth.ensureAuth, GastosAdicionalesController.listarGastosAdicionalesId)
api.post('/9b5844ab4676d8485acd2ee520da84e106df08090df660099d673c48fd19b0c4/:id', md_auth.ensureAuth, GastosAdicionalesController.deleteGastosAdicionales);
api.get('/dda69b2623e6ff707b16b5d5329e85e41b86b55d13151227b8dc1d8cb06fe0ab', md_auth.ensureAuth, GastosAdicionalesController.listGastosAdicionalesEstadoActivo);

module.exports = api;