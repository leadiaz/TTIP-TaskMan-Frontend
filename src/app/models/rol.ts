import { Usuario } from './usuario';

export class Rol{
    constructor(id?:number,tipoRol?:string, usuarioAsignado?:Usuario){}

    static fromJson(rolJson){
        return Object.assign(new Rol(), rolJson, {usuarioAsignado: Usuario.fromJSON(rolJson.usuarioAsignado)});
    }
}