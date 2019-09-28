import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
  	"Content-Type": "application/json"
  	});

  getToken(){
  	return 
  }
  setToken(){}
  registrar(usuario: string, nombre: string,apellido: string, email: string, password:string ){
  	console.log("entro al service");
  	const url = 'http://localhost:8080/usuario/';
  	console.log(usuario);
  	console.log(nombre);
  	console.log(apellido);
  	console.log(email);
  	console.log(password);

  	let r =this._http.post<Usuario>(url,{
  		usuario: usuario,
  		nombre: nombre,
  		apellido: apellido,
  		email: email, 
  		password: password
  		}, {headers: this.headers})
  		.pipe(map(data => data));
  	console.log(r);
  	return r;
  }
  login(user: string, password: string){
  	const url = 'http://localhost:8080/usuario/login';
  	return this._http.post<Usuario>(url, {user}, {headers: this.headers})
  }

  crearProyecto(proyecto: Proyecto){
    const url_api = 'http://localhost:8080/proyecto/1';//HAY QUE BUSCAR LA forma de usar localstorage
    return this._http.post<Proyecto>(url_api,proyecto, {headers: this.headers }).pipe(map(data =>data));
  }
}
