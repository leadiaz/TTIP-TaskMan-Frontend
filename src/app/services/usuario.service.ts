import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/config/config';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Proyecto } from '../models/proyecto';
import { AngularFireAuth } from '@angular/fire/auth'
 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	public url:string;
  public proyectosActuales;
  private proyectosSubject = new Subject<any>();
  public proyectos$ = this.proyectosSubject.asObservable();
  private userSubject = new Subject<any>();
  usuario$ = this.userSubject.asObservable();
  usuario;



  constructor(public _http:HttpClient, private route: Router, private authFire: AngularFireAuth) { 
  	this.url = URL_SERVICIOS;
  }
  headers: HttpHeaders = new HttpHeaders({
  "Content-Type": "application/json"
  })

  login(username: string, password: string){

    return new Promise((resolve, reject) =>{
      this.authFire.auth.signInWithEmailAndPassword(username, password)
      .then(userData => {resolve(userData);
        this.getUserByUsername(username).subscribe(res => {
          this.usuario = res;
          this.proyectosActuales = res.proyecto;
          this.userSubject.next(this.usuario);
          this.proyectosSubject.next(this.proyectosActuales);
        }),
      err => reject(err)});
    
      console.log(this.proyectosActuales)
    });
    
  }

  logout(){
    return this.authFire.auth.signOut().then((data) => this.route.navigateByUrl('login'))
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

  agregarProyecto(p: Proyecto){
    this.proyectosActuales.push(p);
    this.proyectosSubject.next(this.proyectosActuales);
  }

  update(usuario){
    console.log("update");
    console.log(usuario)
    const url_api = this.url + '/usuario/' +usuario.id;
    console.log(url_api);
    return this._http.put(url_api, usuario, {headers: this.headers}).pipe(map(data => console.log(data)));
  }
}