import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { map } from 'rxjs/operators';


import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'src/config/config';
import { Rol } from '../models/rol';

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
  proyectoActual : Proyecto;
  rolesDelProyecto: Rol[];
  miembros: Set<Usuario>;

  constructor(private usuarioService: UsuarioService,public _http:HttpClient) {
  	this.url_api= URL_SERVICIOS;
  	this.miembros = new Set();
  }
  	headers: HttpHeaders = new HttpHeaders({
		"Content-Type": "application/json"
		});

  getProyecto(id:number){
    const proyecto =  this._http.get<Proyecto>(`${this.url_api}/proyecto/${id}`)
        proyecto.subscribe(data => {
                     this.proyectoActual = Proyecto.fromJson(data);
                     this.rolesDelProyecto = this.proyectoActual.roles
                     this.miembros = this.obtenerMiembrosDeUnProyecto(this.proyectoActual);
          });
    return proyecto
  }

  actualizarMiembrosDelProyecto(){
    this.rolesDelProyecto.forEach(rol => {
              if (rol.usuarioAsignado) {
                this.miembros.add(rol.usuarioAsignado)
              }
            })
    }

    public obtenerMiembrosDeUnProyecto( proyecto: Proyecto){
      let miembrosProyect: Set<Usuario>  = new Set();
      proyecto.roles.forEach(rol => {
                  if (rol.usuarioAsignado) {
                    miembrosProyect.add(rol.usuarioAsignado)
                  }
                })
       return miembrosProyect;
      }

  crearProyecto(nombre: string){
    console.log(nombre)
    const url= this.url_api+'/proyecto/'+this.usuarioService.usuario.id;
    let p = this._http.post<Proyecto>(url, {nombre: nombre}, {headers: this.headers}).
    pipe(map(data =>data));

    return p.subscribe(data => this.usuarioService.agregarProyecto(data));
  }
  modificarProyecto(proyecto: Proyecto,usuarioNameEmail: String){
    console.log("modificar")

    const url= this.url_api+'/proyecto/'+ usuarioNameEmail
    console.log(url)
    this.proyecto = proyecto;
    this.proyectoSubject.next(this.proyecto);
    console.log(this.proyecto)
    return  this._http.put(url, proyecto, {headers: this.headers}).pipe(map(data => data));

    }

   delete(id:number){
    const url = this.url_api+`/proyecto/${id}`
    return this._http.delete(url, {headers: this.headers}).toPromise();
  }
  setProyectoActual(id:number){
    this.getProyecto(id).subscribe(data => {
      this.proyecto = Proyecto.fromJson(data);
      this.tareas = this.proyecto.tareas;
      this.proyectoSubject.next(this.proyecto);
      this.tareasSubject.next(this.tareas);
    })
    //

  }
  /*agregarMiembro(usuario){
    this.proyecto.miembros.push(usuario)
    this.proyectoSubject.next(this.proyecto)
    this.modificarProyecto(this.proyecto)
  }*/
  agregarTarea(tarea){
    this.tareas.push(tarea);
    this.tareasSubject.next(this.tareas);
  }
  agregarRol(nuevoRol, idProyecto) {
    const url = this.url_api + '/rol/'+idProyecto;
    return this._http.post<Rol>(url, {tipoRol: nuevoRol, usuarioAsignado: undefined}, {headers: this.headers}).
    pipe(map(data =>data)).toPromise()
  }

}
