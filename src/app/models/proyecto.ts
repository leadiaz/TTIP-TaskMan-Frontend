import { Usuario  } from  './usuario';
import { Tarea } from './tarea';	
import { ObjectUnsubscribedError } from 'rxjs';

export class Proyecto{
	
	constructor(
		public id?:number,
		public creador?: Usuario,
		public nombre?: string,
		public miembros?: Array<Usuario>,
		public tareas?: Array<Tarea>
	){}
	static fromJson(proyectoJson): Proyecto {
		return Object.assign(new Proyecto(), proyectoJson, {creador: Usuario.fromJSON(proyectoJson.creador), miembros: this.mapUsuarios(proyectoJson.miembros), tareas: this.mapTareas(proyectoJson.tareas)})
	}
	static mapTareas(tareas: Array<any>): Tarea[] {
		return tareas.map(tarea => Tarea.fromJSON(tarea))
	}
	static mapUsuarios(miembros: Array<any>): Usuario[] {
		return miembros.map(miembro => Usuario.fromJSON(miembro))
	}
}