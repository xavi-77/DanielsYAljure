'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var multipart = require('connect-multiparty');
var DemandaController = require('../controllers/demandaControllers');
var md_upload = multipart({uploadDir: './uploads/abogado'});
//SHA-256

api.post('/28204f59cf9d0b1d546f047deefc28c2bf5f9a79e4e9f6b59f2cadae1e38da20', md_auth.ensureAuth, DemandaController.saveDemanda);
api.put('/6ef26298cb7a4a464fa200f96a40f69ee851fd3bea714c8e7927d35d037fb905/:id', md_auth.ensureAuth, DemandaController.updateDemanda);
api.post('/e4cb3f547e5bc0f1d4c6c3d8c1da96258536b3aa382bce0edd5f731846434a26/:id', md_auth.ensureAuth, DemandaController.deleteDemanda);
api.get('/cc7e41621533022913ef2f1964dda49f820a27f70bfdf97ce4d023dfd2b204f6',  md_auth.ensureAuth, DemandaController.listDemandaActivo);
api.get('/d53c24f9ad8f279760198cb72d32f49250fca40b958ba9f22b04644e39163416/:id',  md_auth.ensureAuth, DemandaController.listDemandaActivoID);
api.get('/e24eda161216efb3543a38375231d143fa27462ddb370db58f19db8db86110bd/:id',  md_auth.ensureAuth, DemandaController.listDemandaActivoIDA);

module.exports = api;