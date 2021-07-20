const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Actuacion extends Model { }
Actuacion.init({

    idActuaciones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    concepto_ACTUACION: {
        type: DataTypes.STRING
    },
    fecha_ACTUACION: {
        type: DataTypes.STRING
    },
    archivo_ACTUACION: {
        type: DataTypes.STRING
    },
    fecha_Creado_ACTUACION: {
        type: DataTypes.STRING
    },
    fecha_Modificado_ACTUACION: {
        type: DataTypes.STRING
    },
    fecha_Eliminado_ACTUACION: {
        type: DataTypes.STRING
    },
    estado_ACTUACION: {
        type: DataTypes.STRING
    },
    id_Demanda_ACTUACION: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize,
    modelName: "actuacione",
    timestamps: false
});

module.exports = Actuacion;