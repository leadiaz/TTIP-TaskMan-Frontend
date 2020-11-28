import { Usuario } from './usuario';

export class Tarea{
	constructor(
		public id?:number,
		public titulo?:string,
		public descripcion?: string,
		public asignado?: Usuario,
		public estado?: string,
    public prioridad?:number,
    public fecha_creacion?:Date,
    public fecha_estimada?:Date,
    public isTest?:number

	){}
	static fromJSON(tareaJSON):Tarea{
		return Object.assign(new Tarea(), tareaJSON, {asignado: Usuario.fromJSON(tareaJSON.asignado), estado: this.mejorarNombreEstado(tareaJSON.estado)})
	}



  private static mejorarNombreEstado(estado) {
	  switch (estado) {
      case 'CANCELADA':
        return 'Cancelada';
      case 'TERMINADA':
        return 'Terminada';
      case 'CREADA':
        return 'Creada';
      case 'EN_PROCESO':
        return 'En proceso';
      case 'CRITICA':
        return 'Critica';
    }
  }
  mejorarNombreEstadoParaBackEnd(){
    switch (this.estado) {
      case 'Cancelada':
        this.estado = 'CANCELADA';
        break;
      case 'Terminada':
        this.estado = 'TERMINADA';
        break
      case 'Creada':
        this.estado = 'CREADA';
        break
      case 'En proceso':
        this.estado = 'EN_PROCESO';
        break
      case 'Critica':
        this.estado = 'CRITICA';
        break
    }
  }
}
