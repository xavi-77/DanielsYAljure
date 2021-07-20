const Usuario  = require('../models/usuario');
const Abogado  = require('../models/abogado');
const Demanda = require('../models/demanda');
const Persona = require('../models/persona');
const Anexo = require('../models/anexo');
const Actuacion = require('../models/actuacion');
const Honorario = require('../models/honorario');
const GastoAdicional = require('../models/gastosadicional');

Abogado.hasOne(Usuario, {
    foreignKey: 'id_Persona_USUARIO'
  });

Usuario.belongsTo(Abogado,{
  foreignKey: 'id_Persona_USUARIO'
});

Persona.hasOne(Demanda, {
  foreignKey: 'id_Cliente_DEMANDA'
});

Demanda.belongsTo(Persona,{
  foreignKey: 'id_Cliente_DEMANDA'
});

Abogado.hasOne(Demanda, {
  foreignKey: 'id_Abogado_DEMANDA'
});

Demanda.belongsTo(Abogado,{
  foreignKey: 'id_Abogado_DEMANDA'
});

Demanda.hasOne(Anexo,{
  foreignKey: 'id_Demanda_ANEXO'
});

Anexo.belongsTo(Demanda,{
  foreignKey: 'id_Demanda_ANEXO'
});

Demanda.hasOne(Actuacion,{
  foreignKey: 'id_Demanda_ACTUACION'
});

Actuacion.belongsTo(Demanda,{
  foreignKey: 'id_Demanda_ACTUACION'
});

Demanda.hasOne(GastoAdicional,{
  foreignKey: 'id_Demanda_GASTOADICIONAL'
});

GastoAdicional.belongsTo(Demanda,{
  foreignKey: 'id_Demanda_GASTOADICIONAL'
});

Demanda.hasOne(Honorario,{
  foreignKey: 'id_Demanda_HONORARIO'
});

Honorario.belongsTo(Demanda,{
  foreignKey: 'id_Demanda_HONORARIO'
});