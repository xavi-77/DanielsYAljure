'use strict'
const Sequelize = require('sequelize');
const db = require('../db/database');

module.exports = db.Sequelize.define(
    'actuaciones',{
        idActuaciones: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        fecha_ACTUACION: {
            type:
                Sequelize.DATE
        },
        id_Demanda_ACTUACION: {
            type:
                Sequelize.INTEGER
        },
        concepto_ACTUACION: {
            type:
                Sequelize.STRING
        },
        archivo_ACTUACION: {
            type:
                Sequelize.STRING
        },
        fecha_Creado_ACTUACION: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_ACTUACION: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_ACTUACION: {
            type:
                Sequelize.DATE
        },
        estado_ACTUACION: {
            type:
                Sequelize.STRING
        }
    }
);