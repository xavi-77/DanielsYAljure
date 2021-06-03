const Sequelize = require('sequelize');
const db = require('../db/database');

module.exports = db.Sequelize.define(
    'honorarios',{
        idHonorarios: {
            type:
                Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
        },
        id_Demanda_HONORARIO: {
            type:
                Sequelize.INTEGER
        },
        id_Abogado_HONORARIO: {
            type:
                Sequelize.INTEGER
        },
        id_Cliente_HONORARIO: {
            type:
                Sequelize.INTEGER
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
    }
);