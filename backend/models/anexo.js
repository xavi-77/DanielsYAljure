const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Anexo extends Model { }
Anexo.init({

    idAnexo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    concepto_ANEXO: {
        type: DataTypes.STRING
    },
    tipo_Documento_ANEXO: {
        type: DataTypes.STRING
    },
    nombre_Documento_ANEXO: {
        type: DataTypes.STRING
    },
    fecha_Creado_ANEXO: {
        type: DataTypes.STRING
    },
    fecha_Modificado_ANEXO: {
        type: DataTypes.STRING
    },
    fecha_Eliminado_ANEXO: {
        type: DataTypes.STRING
    },
    estado_ANEXO: {
        type: DataTypes.STRING
    },
    id_Demanda_ANEXO: {
        type: DataTypes.INTEGER
    }

}, {
    sequelize,
    modelName: "anexo",
    timestamps: false
});

module.exports = Anexo;