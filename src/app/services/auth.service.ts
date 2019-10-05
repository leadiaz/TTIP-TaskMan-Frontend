import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea';
import { ProyectoInterface } from '../models/proyectoInterface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username:string;

  constructor(private _http: HttpClient, private _usuarioService:UsuarioService) { }
  headers: HttpHeaders = new HttpHeaders({
  	"Content-Type": "application/json"
  	});
  readonly url_api ='http://localhost:8080';

  getToken(){
  	return 
  }
  setToken(){}
  registrar(usuario: string, nombre: string,apellido: string, email: string, password:string ){
  	console.log("entro al service");
  	const url = this.url_api+'/usuario/';
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
  	//const url = 'http://)localhost:8080/usuario/login';
    //let u = this._http.post<Usuario>(url, {user}, {headers: this.headers});
    console.log("*** AuthService *** "+user);
    this.username=user;
    this._usuarioService.getUserByUsername(user).subscribe(data => {
      localStorage.setItem("usuario actual",JSON.stringify(data));
      //console.log(data.nombre);
      })
  	return user;
  }
  crearProyecto(proyecto: Proyecto){
    const url= this.url_api+'/proyecto/'+ JSON.parse(localStorage.getItem("usuario actual"))['id'];
    return this._http.post<Proyecto>(url, proyecto, {headers: this.headers}).
    pipe(map(data =>data));
  }
  modificarProyecto(proyecto: Proyecto){
    const url= this.url_api+'/proyecto/'+ JSON.parse(localStorage.getItem("usuario actual"))['id'];
    return this._http.put<Proyecto>(url, proyecto, {headers: this.headers}).
    pipe(map(data =>data));
  }
  


  setUsuarioActual(username: string){
    
  }
  actualizar(usuario: Usuario){
    console.log("actualizar");
    let id_user = JSON.parse(localStorage.getItem("usuario actual"))['id']
    const url = this.url_api+'/usuario/';
    let r =this._http.put<Usuario>(url, usuario, {headers: this.headers})
      .pipe(map(data => data));

    console.log(r);
    return r;
  }
/**** servicio tareas*** luego parsalo a tarea.service ***/
  eliminarTarea(id: number, idProyecto: number):Observable<{}>{
    const url = this.url_api+'/tarea/'+id+'/'+idProyecto;
    console.log(url);
    return this._http.delete(url, {headers: this.headers}).pipe(map(data=>data));
  }
  crearTarea(titulo: string, descripcion:string, id: number){
    const url=this.url_api+'/tarea/'+id;
    return this._http.post<Tarea>(url, {
      titulo: titulo,
      descripcion: descripcion
      }, {headers: this.headers}).pipe(map(data =>data));
  }
}
