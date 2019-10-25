import { Proyecto } from './proyecto';

export class Usuario{
	

	constructor(
		public id:number,
		public usuario:string,
		public nombre:string,
		public apellido:string,
		public email:string,
		public password:string,
		public proyecto: Array<Proyecto>
	){}
}
