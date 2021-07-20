const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Demand extends Model { }
Demand.init({

    idDemandas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_DEMANDA: {
        type: DataTypes.STRING
    },
    fecha_DEMANDA: {
        type: DataTypes.STRING
    },
    especialida_DEMANDA: {
        type: DataTypes.STRING
    },
    radicado_DEMANDA: {
        type: DataTypes.STRING
    },
    juzgado_Origen_DEMANDA: {
        type: DataTypes.STRING
    },
    juzgado_Ejecucion_DEMANDA: {
        type: DataTypes.STRING
    },
    id_Abogado_DEMANDA: {
        type: DataTypes.STRING
    },
    id_Cliente_DEMANDA: {
        type: DataTypes.STRING
    },
    fecha_Creado_DEMANDA: {
        type: DataTypes.STRING
    },
    fecha_Modificado_DEMANDA: {
        type: DataTypes.STRING
    },
    fecha_Eliminado_DEMANDA: {
        type: DataTypes.STRING
    },
    estado_DEMANDA: {
        type: DataTypes.STRING
    }

}, {
    sequelize,
    modelName: "demanda",
    timestamps: false
});

module.exports = Demand;