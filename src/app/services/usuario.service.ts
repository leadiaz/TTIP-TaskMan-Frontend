import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/config/config';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	public url:string;
  public proyectosActuales: Proyecto[];
  private proyectosSubject = new Subject<any>();
  public proyectos$ = this.proyectosSubject.asObservable();
  private userSubject = new Subject<any>();
  usuario$ = this.userSubject.asObservable();
  usuario: Usuario;


  /** mis tareas que tengo asignadas**/
  private tareasSubject = new Subject<any>();
  tareas$ = this.tareasSubject.asObservable();
  tareas = new Array<Tarea>();


  constructor(public _http:HttpClient, private route: Router) {
  	this.url = URL_SERVICIOS;
  }
  headers: HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json"
  })

  login(usernameOEmail: string, password: string){

    return this.getLogginUser(usernameOEmail, password).then(
        userData => {
          // resolve(userData)
          this.usuario = new Usuario(userData.id,
                                    userData.usuario,
                                    userData.nombre,
                                    userData.apellido,
                                    userData.email,
                                    userData.password);
          this.getProyectosByUserID(userData.id).then(data => {
            this.proyectosActuales = data.map(proyectoJSON => Proyecto.fromJson(proyectoJSON))
          });
          this.userSubject.next(this.usuario);
          this.proyectosSubject.next(this.proyectosActuales);
        })
  }
  getProyectosByUserID(id: number){
    return this._http.get<Proyecto[]>(this.url + '/proyectos/'+id).toPromise()
  }
  getLogginUser(usernameOEmail: string, password: string) {
      const url_api = this.url+'/login';
      return this._http.post<Usuario>(url_api, {
        userOrEmail: usernameOEmail,
        password: password
        },{headers: this.headers}).toPromise().then(response => response)
        .catch(() => Promise.reject('invalid'));
  }

  logout(){
    localStorage.removeItem('EstaLogueado')
    this.route.navigateByUrl('login')
    // return this.authFire.auth.signOut().then((data) =>
  }

  getUsers()
  {
  	return this._http.get<Usuario[]>(this.url+'/usuarios');
  }
  getUserById(id: string){
    return this._http.get<Usuario>(this.url+'/usuario/${id}');
  }
  getUserByUsername(username: string){
    return this._http.get<Usuario>(this.url+'/usuario/buscar/'+username).pipe(map(data=>data))
  }
  setUsuario(u: any){
    this.usuario = u;
  }

  save(usuario: string, nombre: string,apellido: string, email: string, password:string ){
    
  	const url_api = this.url+'/usuario';
  	return this._http.post<Usuario>(url_api, {
      usuario: usuario,
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password
      },{headers: this.headers})
  	.pipe(map(data => data )).toPromise().then(response => response)
    .catch(() => Promise.reject('invalid'));
  }

  agregarProyecto(p){
    this.proyectosActuales.push(p);
    this.proyectosSubject.next(this.proyectosActuales);
  }

  actualizarPerfilUsuario(userData: Usuario){
   /*Llamo a la API para poder actualizar los datos del usuario*/
   console.log(this.url+"/usuario/actualizarUsuario/"+userData.id)
   return this._http.put(this.url+"/usuario/actualizarUsuario/"+userData.id,{
     id: userData.id,
    usuario: userData.usuario,
    nombre: userData.nombre,
    apellido: userData.apellido,
    email: userData.email,
    password: userData.password
    }, {headers: this.headers}).toPromise().then(response => response)
     .catch(() => Promise.reject('invalid'));
   }

  update(usuario: Usuario){
    console.log(usuario)
    const url_api = this.url + '/usuario/' +usuario.id;
    return this._http.put(url_api, {
      usuario: usuario.usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: usuario.password
    }, {headers: this.headers}).pipe(map(data => console.log(data)));
  }

  getTareasAsignadasAUsuario(id: number){
    const tareas =  this._http.get<Tarea []>(URL_SERVICIOS+'/tareas/'+ id,{headers: this.headers}).toPromise()
    return tareas
  }
}
