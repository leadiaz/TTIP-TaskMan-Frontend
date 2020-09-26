import { Usuario } from './usuario';

export class Rol{
    constructor(public id?:number,public tipoRol?:string, public usuarioAsignado?:Usuario){}

    static fromJson(rolJson){
        return Object.assign(new Rol(), rolJson, {
            usuarioAsignado: rolJson.usuarioAsignado ? Usuario.fromJSON(rolJson.usuarioAsignado) : undefined
        });
    }
}