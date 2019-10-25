import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarea } from '../models/tarea';
import { map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/config/config';
import { ProyectoService } from './proyecto.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private url_api: string;
  tareaActual;
  private tareaSubject = new Subject<any>();
  tarea$ = this.tareaSubject.asObservable();
  constructor(private proyectoService: ProyectoService, private _http: HttpClient) { 
    this.url_api = URL_SERVICIOS;
  }
  headers: HttpHeaders = new HttpHeaders({
  	"Content-Type": "application/json"
  	});

  crearTarea(titulo: string, descripcion:string, id: number){
    const url=this.url_api+'/tarea/'+id;
    let t =  this._http.post<Tarea>(url, {
      titulo: titulo,
      descripcion: descripcion
      }, {headers: this.headers}).pipe(map(data =>data));
    t.subscribe(data => this.proyectoService.agregarTarea(data))
  }
  delete(id : number){
    const url = this.url_api+`/tarea/${id}`;
    return this._http.delete(url,{headers: this.headers});
  }
  setTareaActual(id:number){
    this.tareaActual = this.proyectoService.tareas.find(t => t.id == id);
    this.tareaSubject.next(this.tareaActual);
  }
}
