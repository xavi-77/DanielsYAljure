const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Honorario extends Model { }
Honorario.init({

    idHonorarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    concepto_HONORARIO:{
        type: DataTypes.STRING
    },

    id_Demanda_HONORARIO: {
        type: DataTypes.STRING
    },

    total_HONORARIO: {
        type: DataTypes.STRING
       
    },
    
    estado_HONORARIO:{
        type: DataTypes.STRING
    },

    fecha_Creado_HONORARIO: {
        type: DataTypes.STRING
    },

    fecha_Modificado_HONORARIO: {
        type: DataTypes.STRING
    },
    
    fecha_Eliminado_HONORARIO:{
        type: DataTypes.STRING
    }

}, {
    sequelize,
    modelName: "honorario",
    timestamps: false
});

module.exports = Honorario;