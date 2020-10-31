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
    public fecha_estimada?:Date
	){}
	static fromJSON(tareaJSON):Tarea{
		return Object.assign(new Tarea(), tareaJSON, {asignado: Usuario.fromJSON(tareaJSON.asignado), estado: this.mejorarNombreEstado(tareaJSON.estado)})
	}

  private static mejorarNombreEstado(estado) {
	  console.log(estado);
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
}
