import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { map } from 'rxjs/operators';
import {Tarea} from '../models/tarea';


import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from 'src/config/config';
import { Rol } from '../models/rol';

export interface IProyectoService {
  getProyectoAsync(id: number): Promise<Proyecto>
}

@Injectable({
  providedIn: 'root'
})
export class ProyectoService implements IProyectoService {
  public url_api:string;

  private proyectoSubject = new Subject<any>();
  proyecto$ = this.proyectoSubject.asObservable()

  private tareasSubject = new Subject<any>();
  tareas$ = this.tareasSubject.asObservable();

  tareasAMostrar: Tarea[];
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
                     this.rolesDelProyecto = this.proyectoActual.rols
                     this.miembros = this.obtenerMiembrosDeUnProyecto(this.proyectoActual);
                     this.tareasAMostrar = this.filtrarTareas(this.proyectoActual.tareas);
          });
    return proyecto
  }

  filtrarTareas( tareasArray: Tarea[]): Tarea[]{
  /*filtro las tareas y asi solo muestro todas aquelos con estados diferentes a Cancelado o terminado.*/
  return tareasArray.filter(t => t.estado != "Cancelada" && t.estado != "Terminada" )
  }
   async getProyectoAsync(id:number){
      const proyecto =  await this._http.get<Proyecto>(`${this.url_api}/proyecto/${id}`).toPromise()
      this.proyectoActual = Proyecto.fromJson(proyecto);
      this.rolesDelProyecto = this.proyectoActual.rols;
      this.miembros = this.obtenerMiembrosDeUnProyecto(this.proyectoActual);
      this.tareasAMostrar = this.filtrarTareas(this.proyectoActual.tareas);
      return this.proyectoActual
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
      proyecto.rols.forEach(rol => {
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
  modificarProyecto(proyecto: Proyecto,usuarioNameEmail: String, eliminarOAgregar:number){
  /* eliminarOAgregar: este parametro sirve para determinar si se elimina o  agrega el usuario al proyecto en cuestion.*/
    console.log("modificar")

    const url= this.url_api+'/proyecto/'+ usuarioNameEmail+'?eliminarOrAgregarUser='+eliminarOAgregar
    console.log(url)
    this.proyecto = proyecto;
    this.proyectoSubject.next(this.proyecto);
    proyecto.tareas.forEach( tarea => { tarea.mejorarNombreEstadoParaBackEnd()});
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

  refaccionarEstadoDeTareas(proyecto: Proyecto){
  let tareas:Tarea[] = proyecto.tareas;

  tareas.map(tarea => { tarea.estado = this.configurarEstado(tarea.estado);
                     });
  proyecto.tareas = tareas;
  return proyecto;
  }

  configurarEstado(estado: String){
  switch (estado) {
        case 'Cancelada':
          return 'CANCELADA';
        case 'Terminada':
          return 'TERMINADA';
        case 'Creada':
          return 'CREADA';
        case 'En proceso':
          return 'EN_PROCESO';
        case 'Critica':
          return 'CRITICA';
      }
  }
  async getAllProyectos() {
    const url = this.url_api + '/proyectos';
    return await this._http.get<Proyecto []>(url, {headers: this.headers}).toPromise().then(proyectos => {
      return proyectos.map(proyecto => Proyecto.fromJson(proyecto))
    });
  }

}
