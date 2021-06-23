export class Demanda{
    constructor(
       public idDemandas: string,
       public tipo_DEMANDA: string,
       public fecha_DEMANDA: string,
       public especialida_DEMANDA: string,
       public radicado_DEMANDA: string,
       public juzgado_Origen_DEMANDA: string,
       public juzgado_Ejecucion_DEMANDA: string,
       public id_Abogado_DEMANDA: string,
       public id_Cliente_DEMANDA: string,
       public fecha_Creado_DEMANDA: string,
       public fecha_Modificado_DEMANDA: string,
       public fecha_Eliminado_DEMANDA: string,
       public estado_DEMANDA: string,
    ){}
}