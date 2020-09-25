import { Proyecto } from './proyecto';
import { ReturnStatement } from '@angular/compiler';

export class Usuario{
	constructor(
		public id?:number,
		public usuario?:string,
		public nombre?:string,
		public apellido?:string,
		public email?:string,
		public password?:string,

	){}
	static fromJSON(usuarioJson): Usuario {
		return Object.assign(new Usuario(), usuarioJson)
	}
	
}
