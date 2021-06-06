'use strict'
const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define(
    'personas', {
    idPersonas: {
        type:
            Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres_PERSONA: {
        type:
            Sequelize.INTEGER
    },
    p_Apellido_PERSONA: {
        type:
            Sequelize.STRING
    },
    s_Apellido_PERSONA: {
        type:
            Sequelize.STRING
    },
    tipo_Documento_PERSONA: {
        type:
            Sequelize.STRING
    },
    num_Documento_PERSONA: {
        type:
            Sequelize.STRING
    },
    fecha_Nacimiento_PERSONA: {
        type:
            Sequelize.DATE
    },
    direccion_PERSONA: {
        type:
            Sequelize.STRING
    },
    telefono_PERSONA: {
        type:
            Sequelize.STRING
    },
    celular_PERSONA: {
        type:
            Sequelize.STRING
    },
    entidad_Laboral_PERSONA: {
        type:
            Sequelize.STRING
    },
    tiempo_Laboral_PERSONA: {
        type:
            Sequelize.STRING
    },
    direccion_Empresa_PERSONA: {
        type:
            Sequelize.STRING
    },
    tel_Empresa_PERSONA: {
        type:
            Sequelize.STRING
    },
    pensionado_PERSONA: {
        type:
            Sequelize.STRING
    },
    entidad_Pension_PERSONA: {
        type:
            Sequelize.STRING
    },
    estado_Usuario_PERSONA: {
        type:
            Sequelize.STRING
    },
    tipo_PERSONA: {
        type:
            Sequelize.STRING
    },
    fecha_Creado_PERSONA: {
        type:
            Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    fecha_Modificado_PERSONA: {
        type:
            Sequelize.DATE
    },
    fecha_Eliminado_PERSONA: {
        type:
            Sequelize.DATE
    },
    imagen_PERSONA: {
        type:
            Sequelize.STRING
    }
}, {
    timestamps: false
}
);