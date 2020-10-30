import { Tarea } from './tarea';	
import { Rol } from './rol';

export class Proyecto{
  
	constructor(
		public id?:number,
		public nombre?: string,
		public roles?: Array<Rol>,
		public tareas?: Array<Tarea>
	){}
	static fromJson(proyectoJson): Proyecto {
		return Object.assign(new Proyecto(), proyectoJson, {roles: this.mapRoles(proyectoJson.rols), tareas: this.mapTareas(proyectoJson.tareas)})
	}
	static mapTareas(tareas: Array<any>): Tarea[] {
		return tareas.map(tarea => Tarea.fromJSON(tarea)).sort((t1,t2) => t1.prioridad - t2.prioridad)
	}
	static mapRoles(roles: Array<any>): Rol[] {
		return roles.map(rol => Rol.fromJson(rol))
	}
	eliminarTareaById(id) {
		this.tareas = this.tareas.filter(tarea => tarea.id != id)
	  }
		
}
