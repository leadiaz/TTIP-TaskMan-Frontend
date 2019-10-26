import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  public url_api:string;
  
  private proyectoSubject = new Subject<any>();
  proyecto$ = this.proyectoSubject.asObservable()

  private tareasSubject = new Subject<any>();
  tareas$ = this.tareasSubject.asObservable();

  tareas;
  proyecto;
  
  constructor(private usuarioService: UsuarioService,public _http:HttpClient) {  	
  	this.url_api= URL_SERVICIOS;
  }
  	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
		});

  getProyecto(id:number):Observable<Proyecto>{
  	return this._http.get<Proyecto>(`${this.url_api}/proyecto/${id}`).pipe(map(data => data));
  }

  crearProyecto(nombre: string){
    const url= this.url_api+'/proyecto/'+this.usuarioService.usuario.id;
    let p = this._http.post<Proyecto>(url, {nombre: nombre}, {headers: this.headers}).
    pipe(map(data =>data)); 

    return p.subscribe(data => this.usuarioService.agregarProyecto(data.id));
  }  
  modificarProyecto(proyecto: Proyecto){
    console.log("modificar")

    const url= this.url_api+'/user/proyecto/'+ this.proyecto.id
    console.log(url)
    this.proyecto = proyecto;
    this.proyectoSubject.next(this.proyecto);
    console.log(this.proyecto) 
    let p = this._http.put(url, proyecto, {headers: this.headers}).pipe(map(data => data));
    p.subscribe(data => console.log(data))
    }
  delete(id:number){
    const url = this.url_api+`/proyecto/${id}`
    return this._http.delete(url, {headers: this.headers});
  }
  setProyectoActual(id:number){
    this.getProyecto(id).subscribe(data => {
      this.proyecto = data;
      this.tareas = this.proyecto.tareas;
      this.proyectoSubject.next(this.proyecto);
      this.tareasSubject.next(this.tareas);
      console.log(this.proyecto);
    })
    //

  }
  agregarMiembro(usuario){
    this.proyecto.miembros.push(usuario)
    this.proyectoSubject.next(this.proyecto)
    this.modificarProyecto(this.proyecto)
  }
  agregarTarea(tarea){
    this.tareas.push(tarea);
    this.tareasSubject.next(this.tareas);
  }

}
