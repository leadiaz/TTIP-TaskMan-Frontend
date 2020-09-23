import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../models/tarea';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/config/config';
import { ProyectoService } from './proyecto.service';
import { Subject } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  proyecto;
  private url_api: string;
  tareaActual;
  private tareaSubject = new Subject<any>();
  tarea$ = this.tareaSubject.asObservable();

  private tareasSubject = new Subject<any>();
  tareas$ = this.tareasSubject.asObservable();
  tareas;
  constructor(private proyectoService: ProyectoService, private _http: HttpClient, private usuarioService: UsuarioService) {
    this.url_api = URL_SERVICIOS;
  }
  headers: HttpHeaders = new HttpHeaders({
  	"Content-Type": "application/json"
  	});

  crearTarea(titulo: string, descripcion:string, id: number){
    const url=this.url_api+'/tarea/'+id;
    const t =  this._http.post<Tarea>(url, {
      titulo: titulo,
      descripcion: descripcion
      }, {headers: this.headers}).pipe(map(data =>data));
    //t.subscribe(data => this.proyectoService.agregarTarea(data))
    return t
  }
  async update(tarea){
    const task = await this._http.put(URL_SERVICIOS+'/tarea/'+tarea.id, tarea,{headers: this.headers}).toPromise()
    return task
  }
  async delete(id : number, idPr: number){
    const url =  this.url_api+`/tarea/${idPr}/${id}`;
    await this._http.delete(url,{headers: this.headers});
  }
  setTareaActual(id:number){
    this.tareaActual = this.proyectoService.tareas.find(t => t.id == id);
    this.tareaSubject.next(this.tareaActual);
  }
   getTareas(){
    return this._http.get<Tarea []>(URL_SERVICIOS+'/tareas', {headers: this.headers})
  }

}
