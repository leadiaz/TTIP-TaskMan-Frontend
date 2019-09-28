import { Usuario  } from  './usuario';
import { Tarea } from './tarea';	

export class Proyecto{
	
	constructor(
		public nombre: string,
		public descripcion: string,
		public tareas: Array<any>
	){}
}