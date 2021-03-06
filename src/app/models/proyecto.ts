import { Tarea } from './tarea';
import { Rol } from './rol';

export class Proyecto{

	constructor(
		public id?:number,
		public nombre?: string,
		public rols?: Array<Rol>,
		public tareas?: Array<Tarea>
	){}
	static fromJson(proyectoJson): Proyecto {
		return Object.assign(new Proyecto(), proyectoJson, {rols: this.mapRoles(proyectoJson.rols), tareas: this.mapTareas(proyectoJson.tareas)})
	}
	static mapTareas(tareas: Array<any>): Tarea[] {
		return tareas.map(tarea => Tarea.fromJSON(tarea))
	}
	static mapRoles(roles: Array<any>): Rol[] {
		return roles.map(rol => Rol.fromJson(rol))
	}
	eliminarTareaById(id) {
		this.tareas = this.tareas.filter(tarea => tarea.id != id)
	  }
	getTareasCriticas(){
	  return this.tareas.filter( tarea => tarea.estado == 'CRITICA' || tarea.estado == 'Critica')
  }
  getTareasEnProceso(){
	  return this.tareas.filter( tarea => tarea.estado == 'EN_PROCESO' || tarea.estado == 'En proceso')
  }
  getTareasFinalizadas(){
    return this.tareas.filter( tarea => tarea.estado == 'TERMINADA' || tarea.estado == 'Terminada')
  }
  getTareasCredas(){
    return this.tareas.filter( tarea => tarea.estado == 'CREADA' || tarea.estado == 'Creada')
  }

}
