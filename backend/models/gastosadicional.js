const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Gastoadicional extends Model { }
Gastoadicional.init({

    idGastosAdicionales: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    concepto_GASTOADICIONAL: {
        type: DataTypes.STRING
    },

    id_Demanda_GASTOADICIONAL: {
        type: DataTypes.STRING
       
    },
    
    valor_GASTOADICIONAL:{
        type: DataTypes.STRING
    },

    estado_GASTOADICIONAL: {
        type: DataTypes.STRING
    },

    fecha_Creado_GASTOADICIONAL: {
        type: DataTypes.STRING
    },
    
    fecha_Modificado_GASTOADICIONAL:{
        type: DataTypes.STRING
    },
    
    fecha_Eliminado_GASTOADICIONAL:{
        type: DataTypes.STRING
    }

}, {
    sequelize,
    modelName: "gastosadicionale",
    timestamps: false
});

module.exports = Gastoadicional;