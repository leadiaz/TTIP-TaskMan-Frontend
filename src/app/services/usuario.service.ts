import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/config/config';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto';
import { AngularFireAuth } from '@angular/fire/auth'
import { Tarea } from '../models/tarea';


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


  constructor(public _http:HttpClient, private route: Router, private authFire: AngularFireAuth) { 
  	this.url = URL_SERVICIOS;
  }
  headers: HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json"
  })

  login(usernameOEmail: string, password: string){

    return new Promise((resolve, reject) =>{
      this.getLogginUser(usernameOEmail, password).then(
        userData => {
          resolve(userData);
          this.usuario = new Usuario(userData.id, 
                                    userData.usuario,
                                    userData.nombre,
                                    userData.apellido,
                                    userData.email,
                                    userData.password,
                                    userData.proyecto);
          this.proyectosActuales = this.usuario.proyecto;
          this.userSubject.next(this.usuario);
          this.proyectosSubject.next(this.proyectosActuales);
          this.route.navigateByUrl('/home');
          //this.getTareasAsignadasAUsuario(data.id).subscribe(
          //  dataT => {t => this.tareas = t;
          //            this.tareasSubject.next(this.tareas)}
          //);
        }).catch(err => {
          alert(err)
        }),  
        err => reject(err)});
    
  }
  getLogginUser(usernameOEmail: string, password: string) {
    const url_api = this.url+'/login';
  	return this._http.post<Usuario>(url_api, {
      userOrEmail: usernameOEmail, 
      password: password
      },{headers: this.headers})
  	.pipe(map(data => data )).toPromise();
  }

  logout(){
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
  register(email: string, password:string ){
    return new Promise((resolve, reject) => {
      this.authFire.auth.createUserWithEmailAndPassword(email, password).
    then(userData => resolve(userData),
    err => reject(err));
    })
  }

  save(usuario: string, nombre: string,apellido: string, email: string, password:string ):Observable<Usuario>{
  	const url_api = this.url+'/usuario';
  	return this._http.post<Usuario>(url_api, {
      usuario: usuario,
      nombre: nombre,
      apellido: apellido,
      email: email, 
      password: password
      },{headers: this.headers})
  	.pipe(map(data => data ));
  }

  agregarProyecto(p){
    this.proyectosActuales.push(p);
    this.proyectosSubject.next(this.proyectosActuales);
  }

  update(usuario){
    const url_api = this.url + '/usuario/' +usuario.id;
    return this._http.put(url_api, usuario, {headers: this.headers}).pipe(map(data => console.log(data)));
  }
  getTareasAsignadasAUsuario(id: number){
    const tareas =  this._http.get<Tarea []>(URL_SERVICIOS+'/tareas/'+ id,{headers: this.headers})
    console.log(tareas)
    return tareas
  }
}