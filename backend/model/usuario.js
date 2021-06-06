'use strict'
const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'usuarios', {
        idUsuario: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        correo_USUARIO: {
            type:
                Sequelize.STRING
        },
        contra_USUARIO: {
            type:
                Sequelize.STRING
        },
        tipo_USUARIO: {
            type:
                Sequelize.STRING
        },
        id_Persona_USUARIO: {
            type:
                Sequelize.INTEGER,
                primaryKey: true  
        },
        fecha_Creado_USUARIO: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_USUARIO: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_USUARIO: {
            type:
                Sequelize.DATE
        }
    },
    {
        timestamps: false
    }
);