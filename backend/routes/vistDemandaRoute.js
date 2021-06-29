'use strict'
var express = require('express');

var api = express.Router();
var md_auth = require('../services/authenticated');
var vistDemandaController = require('../controllers/vistDemandaController');

api.get('/f2982ab308781e9585da1c2e792c162b1d754bb5ecbcc04a3a1fc56170637a05', md_auth.ensureAuth, vistDemandaController.mostrarDemandaPersona);

module.exports = api;