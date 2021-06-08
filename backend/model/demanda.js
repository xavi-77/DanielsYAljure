'use strict'
const Sequelize = require('sequelize');
const db = require('../db/database');

module.exports = db.Sequelize.define(
    'demandas',{
        idDemandas: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        tipo_DEMANDA: {
            type:
                Sequelize.STRING
        },
        fecha_DEMANDA: {
            type:
                Sequelize.DATE
        },
        especialida_DEMANDA: {
            type:
                Sequelize.STRING
        },
        radicado_DEMANDA: {
            type:
                Sequelize.STRING
        },
        juzgado_Origen_DEMANDA: {
            type:
                Sequelize.STRING
        },
        juzgado_Ejecucion_DEMANDA: {
            type:
                Sequelize.DATE
        },
        id_Abogado_DEMANDA: {
            type:
                Sequelize.INTEGER,
                primaryKey: true  
        },
        id_Cliente_DEMANDA: {
            type:
                Sequelize.INTEGER,
                primaryKey: true  
        },
        fecha_Creado_DEMANDA: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_DEMANDA: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_DEMANDA: {
            type:
                Sequelize.DATE
        },
        estado_DEMANDA: {
            type:
                Sequelize.STRING
        }
    }
);