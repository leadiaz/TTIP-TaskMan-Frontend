import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	public url:string;
	users: Observable<any>;
	user:Observable<any>;


  constructor(public _http:HttpClient) { 
  	this.url = "http://localhost:8080";
  }
  	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
		//Autorization: this._authService.getToken()
		})

  getUsers()
  {
  	return (this.users = this._http.get<Usuario[]>(this.url+'/usuarios'));
  }
  getUserById(id: string){
  	return (this.user = this._http.get<Usuario>(this.url+'/usuario/${id}'));
  }
  getUserByUsername(username: string){
    return (this.user = this._http.get<Usuario>(this.url+'/usuario/buscar/'+username).pipe(map(data=>data)));
  }

  save(user:Usuario):Observable<any>{
  	//let token;
  	//const url_api = 'http://localhost:8080/usuario?access_token=${token}'
  	const url_api = 'http://localhost:8080/usuario';
  	return this._http.post<Usuario>(url_api, user,{headers: this.headers})
  	.pipe(map(data => data ));
  
	}
}
