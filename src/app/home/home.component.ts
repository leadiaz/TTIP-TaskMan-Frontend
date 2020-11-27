import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UsuarioService } from'../services/usuario.service';
import { ProyectoService } from '../services/proyecto.service';
import { TareaService } from '../services/tarea.service';
import { map } from 'rxjs/operators';
import { Tarea } from '../models/tarea';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario;

  tarea ;
  public proyectos;
  misTareas:Array<any>;
  public idUsuario:number;

  constructor(private route: Router,
              private usuarioService: UsuarioService,
              private proyectoService: ProyectoService,
              private tareaService: TareaService){
    this.usuario = this.usuarioService.usuario;

    this.proyectos = this.usuarioService.proyectosActuales;
    this.usuarioService.proyectos$.subscribe(res => {this.proyectos = res});
    this.usuarioService.usuario$.subscribe(res => this.usuario = res)

    }

  public app_name = "Home";

  async ngOnInit() {
     await this.usuarioService.getTareasAsignadasAUsuario(this.usuarioService.usuario.id)
     .then(data => {
       this.misTareas = data.map(tarea => Tarea.fromJSON(tarea));
      })

  }
  logout(){
    this.usuarioService.logout();
  }
  view(id:number){
    this.tarea = this.misTareas.find(t => t.id === id)
  }
  async terminar(id:number){
    this.filtrarTarea(id);
    this.tarea.estado = "Terminada"
    await this.tareaService.updateEstado(this.tarea)
    this.tarea = undefined
  }
  cancelar(id:number){
    this.filtrarTarea(id);
    this.tarea.estado = "Cancelada";
    this.tarea.asignado = undefined
    this.tareaService.updateEstado(this.tarea)
    this.tarea = undefined;
  }

  filtrarTarea(id:number){
   this.tarea = this.misTareas.find(t => t.id === id)
  }

  misTareasEnProceso(){
    return this.misTareas.filter(t => t.estado === "EN_PROCESO")
  }

/*
  delete(id : number){
    let proyecto = this.proyectos.find(p => p.id == id);
    proyecto.tareas.forEach(t => this.tareaService.delete(t.id));
    this.proyectos = this.proyectos.filter(p => p.id != proyecto.id);
    this.proyectoService.delete(id);
  }
*/
  /*buscarTarea(tarea: string){
    return this.tareas.find(t => t.titulo == tarea);
  }*/


}
