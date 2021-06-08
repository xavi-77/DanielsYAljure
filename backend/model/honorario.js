'use strict'
const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'honorarios',{
        idHonorarios: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        id_Demanda_HONORARIO: {
            type:
                Sequelize.INTEGER,
                primaryKey: true
        },
        id_Abogado_HONORARIO: {
            type:
                Sequelize.INTEGER,
                primaryKey: true
        },
        id_Cliente_HONORARIO: {
            type:
                Sequelize.INTEGER,
                primaryKey: true
        },
        concepto_HONORARIO: {
            type:
                Sequelize.STRING
        },
        total_HONORARIO: {
            type:
                Sequelize.INTEGER
        },
        estado_HONORARIO: {
            type:
                Sequelize.STRING
        },
        fecha_Creado_HONORARIO: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_HONORARIO: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_HONORARIO: {
            type:
                Sequelize.DATE
        }
    },{
        timestamps: false
    }
);