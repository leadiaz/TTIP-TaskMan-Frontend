import { Proyecto } from './proyecto';

export class Usuario{
	

	constructor(
		public usuario:string,
		public nombre:string,
		public apellido:string,
		public email:string,
		public password:string,
		public proyectos: Array<any>
	){}
}
