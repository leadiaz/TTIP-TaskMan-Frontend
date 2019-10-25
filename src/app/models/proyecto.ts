import { Usuario  } from  './usuario';
import { Tarea } from './tarea';	

export class Proyecto{
	
	constructor(
		public id:number,
		public creador: Usuario,
		public nombre: string,
		public miembros: Array<Usuario>,
		public tareas: Array<Tarea>
	){}
}