'use strict'
const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'gastosadicionales',{
        idGastosAdicionales: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        concepto_GASTOADICIONAL: {
            type:
                Sequelize.INTEGER
        },
        valor_GASTOADICIONAL: {
            type:
                Sequelize.INTEGER
        },
        id_Demanda_GASTOADICIONAL: {
            type:
                Sequelize.INTEGER,
                primaryKey: true
        },
        estado_GASTOADICIONAL: {
            type:
                Sequelize.STRING
        },
        fecha_Creado_GASTOADICIONAL: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_GASTOADICIONAL: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_GASTOADICIONAL: {
            type:
                Sequelize.DATE
        }
    },
    {
        timestamps: false
    }
);