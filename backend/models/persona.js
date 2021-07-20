const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class Person extends Model { }
Person.init({

    idPersonas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    nombres_PERSONA: {
        type: DataTypes.STRING
    },

    s_Nombres_PERSONA: {
        type: DataTypes.STRING
       
    },

    p_Apellido_PERSONA: {
        type: DataTypes.STRING
    },

    s_Apellido_PERSONA: {
        type: DataTypes.STRING
    },

    tipo_Documento_PERSONA : {
        type: DataTypes.STRING
    },

    num_Documento_PERSONA : {
        type: DataTypes.INTEGER,
    },

    fecha_Nacimiento_PERSONA:{
        type: DataTypes.STRING
    },

    direccion_PERSONA:{
        type: DataTypes.STRING
    },

    telefono_PERSONA:{
        type: DataTypes.STRING
    },

    celular_PERSONA:{
        type: DataTypes.STRING
    },

    entidad_Laboral_PERSONA:{
        type: DataTypes.STRING
    },

    tiempo_Laboral_PERSONA:{
        type: DataTypes.STRING
    },

    direccion_Empresa_PERSONA:{
        type: DataTypes.STRING
    },

    tel_Empresa_PERSONA:{
        type: DataTypes.STRING
    },

    pensionado_PERSONA:{
        type: DataTypes.STRING
    },

    entidad_Pension_PERSONA:{
        type: DataTypes.STRING
    },

    estado_Usuario_PERSONA:{
        type: DataTypes.STRING
    },

    tipo_PERSONA:{
        type: DataTypes.STRING
    },

    imagen_PERSONA:{
        type: DataTypes.STRING
    },

    fecha_Creado_PERSONA:{
        type: DataTypes.STRING
    },
    
    fecha_Modificado_PERSONA:{
        type: DataTypes.STRING
    },
    
    fecha_Eliminado_PERSONA:{
        type: DataTypes.STRING
    }

}, {
    sequelize,
    modelName: "persona",
    timestamps: false
});

module.exports = Person;