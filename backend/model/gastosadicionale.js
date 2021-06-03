const Sequelize = require('sequelize');
const db = require('../db/database');

module.exports = db.Sequelize.define(
    'honorarios',{
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
                Sequelize.INTEGER
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
    }
);