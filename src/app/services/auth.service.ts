import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea';
import { ProyectoInterface } from '../models/proyectoInterface';
import { UsuarioService } from './usuario.service';
import { TareasComponent } from '../tareas/tareas.component';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username:string;
  public id : number = null;
  public usuario_logueado:Usuario
  public proyectos: Array<Proyecto> = new Array<Proyecto>();

  constructor(private _http: HttpClient, private _usuarioService:UsuarioService) { }
  headers: HttpHeaders = new HttpHeaders({
  	"Content-Type": "application/json"
  	});  
 
  setId(id:number){

    this.id = id;
    console.log(this.id)
  }
  setProyecto(p:Array<Proyecto>){
    console.log(p)
    p.forEach(p => this.proyectos.push(p));
    localStorage.setItem("Proyectos", JSON.stringify(this.proyectos))
  }
  actualizar(usuario: Usuario){
    console.log("actualizar");
    let id_user = JSON.parse(localStorage.getItem("usuario actual"))['id']
    const url = URL_SERVICIOS +'/usuario/';
    let r =this._http.put<Usuario>(url, usuario, {headers: this.headers})
      .pipe(map(data =>{
        this.proyectos = data.proyecto;
      }));

    console.log(r);
    return r;
  }
}
