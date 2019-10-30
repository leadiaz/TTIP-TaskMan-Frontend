import { Usuario } from './usuario';

export class Tarea{
	constructor(
		public id:number,
		public titulo:string,
		public descripcion: string,
		public asignado: Usuario,
		public estado: string
	){}
}