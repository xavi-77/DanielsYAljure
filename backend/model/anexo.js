const Sequelize = require('sequelize');
const db = require('../db/database');

module.exports = db.Sequelize.define(
    'anexos',{
        idAnexo: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        tipo_Documento_ANEXO: {
            type:
                Sequelize.STRING
        },
        nombre_Documento_ANEXO: {
            type:
                Sequelize.DATE
        },
        fecha_Creado_ANEXO: {
            type:
                Sequelize.DATE,
                defaultValue: Sequelize.NOW
        },
        fecha_Modificado_ANEXO: {
            type:
                Sequelize.DATE
        },
        fecha_Eliminado_ANEXO: {
            type:
                Sequelize.DATE
        },
        estado_ANEXO: {
            type:
                Sequelize.STRING
        },
        id_Demanda_ANEXO: {
            type:
                Sequelize.INTEGER
        }
    }
);