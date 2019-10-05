import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
	public url_api:string;
	proyecto:Observable<any>
  constructor(private usuarioService: UsuarioService,public _http:HttpClient) {  	
  	this.url_api= "http://localhost:8080";
  }
  	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
		//Autorization: this._authService.getToken()
		});

  getProyecto(id:number):Observable<Proyecto>{
  	this.proyecto = this._http.get<Proyecto>(`${this.url_api}/proyecto/${id}`);
  	return (this.proyecto).pipe(map(data => data));
  }

}
