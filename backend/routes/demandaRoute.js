'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var DemandaController = require('../controllers/demandaController');
//SHA-256

api.post('/e20f8f581747bb25fa5df1667edd0dc47fb7dfbb28263556846cbea1d13a6fed', md_auth.ensureAuth, DemandaController.saveDemanda);
api.put('/eb6ba149e636dade12e394db69c412a6993749a7fd97cf2b5c15d2a4717e6183/:id', md_auth.ensureAuth, DemandaController.updateDemanda);
api.get('/4658f0073a07acb51f9f155f77916b078b8246a02d54c756f2f27adef51d150e', md_auth.ensureAuth, DemandaController.listDemanda);
api.get('/f3a62fe5b26aa0b94bb4d9ece7bf45b0047ced2a1d11d605c290493a6444663b', md_auth.ensureAuth, DemandaController.listDemandaEstadoActivo);
api.get('/6d16360687030f7b11a3d78f0c6920039bccfb23370a5bbb0388abca08a5e4af/:id', md_auth.ensureAuth, DemandaController.listarDemandaId)
api.post('/b5bc3c9a03d23fdefa31add286c1650a340daf0845f4e6c9b0089f35440fd48b/:id', md_auth.ensureAuth, DemandaController.deleteDemanda);
api.get('/f1c43b4852ecae7152c25b3bfc1d44d9af045f148415f6f79ca3f4e8f02d2231', md_auth.ensureAuth, DemandaController.listarDemandaRadicado);

module.exports = api;