const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

class User extends Model { }
User.init({

    idUsuario : {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    correo_USUARIO : {
        type: DataTypes.STRING
    },

    contra_USUARIO: {
        type: DataTypes.STRING
    },

    tipo_USUARIO:{
        type: DataTypes.STRING
    },

    id_Persona_USUARIO:{
        type: DataTypes.STRING
    },

    estado_USUARIO:{
        type: DataTypes.STRING
    },

    codigo_Seguridad_USUARIO:{
        type: DataTypes.STRING
    },

    fecha_Creado_USUARIO:{
        type: DataTypes.STRING
    },
    
    fecha_Modificado_USUARIO:{
        type: DataTypes.STRING
    },
    
    fecha_Eliminado_USUARIO:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "usuario",
    timestamps: false
});

module.exports = User;