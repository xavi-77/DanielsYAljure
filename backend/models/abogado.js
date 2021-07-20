const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Lawyer extends Model { }
Lawyer.init({

    idAbogados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    nombres_ABOGADO: {
        type: DataTypes.STRING
    },

    s_Nombre_ABOGADO: {
        type: DataTypes.STRING
       
    },

    p_Apellido_ABOGADO: {
        type: DataTypes.STRING
    },

    s_Apellido_ABOGADO: {
        type: DataTypes.STRING
    },

    fehca_Nacimiento_ABOGADO : {
        type: DataTypes.STRING
    },

    tipo_Documento_ABOGADO : {
        type: DataTypes.INTEGER,
    },

    numero_Documento_ABOGADO:{
        type: DataTypes.STRING
    },

    numero_Documento_Profesional_ABOGADO:{
        type: DataTypes.STRING
    },

    celular_ABOGADO:{
        type: DataTypes.STRING
    },

    direccion_ABOGADO:{
        type: DataTypes.STRING
    },

    tipo_ABOGADO:{
        type: DataTypes.STRING
    },

    estado_ABOGADO:{
        type: DataTypes.STRING
    },

    imagen_ABOGADO:{
        type: DataTypes.STRING
    },

    fecha_Creado_ABOGADO:{
        type: DataTypes.STRING
    },

    fecha_Modificado_ABOGADO:{
        type: DataTypes.STRING
    },

    fecha_Eliminado_ABOGADO:{
        type: DataTypes.STRING
    }
    
}, {
    sequelize,
    modelName: "abogado",
    timestamps: false
});

module.exports = Lawyer;