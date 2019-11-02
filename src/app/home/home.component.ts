import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UsuarioService } from'../services/usuario.service';
import { ProyectoService } from '../services/proyecto.service';
import { TareaService } from '../services/tarea.service';
import { map } from 'rxjs/operators';



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
    this.usuarioService.proyectos$.subscribe(res => {this.proyectos = res;
                                                    console.log(res)});
    this.usuarioService.usuario$.subscribe(res => this.usuario = res)
  
    }

  public app_name = "Home";

  async ngOnInit() { 
    console.log("onInit")
     await this.usuarioService.getTareasAsignadasAUsuario(this.usuarioService.usuario.id)
     .subscribe(data => {console.log(data);
       this.misTareas = data;
                console.log(this.misTareas)})

  }
  logout(){
    this.usuarioService.logout();
  }
  nuevoProyecto():void{
  	console.log("nuevo-proyecto")
  	this.route.navigateByUrl('/nuevo-proyecto');
  }
  view(id:number){
    this.tarea = this.misTareas.find(t => t.id === id)
  }
  terminar(){
    this.tarea.estado = "TERMINADA"
    this.tareaService.update(this.tarea)
    this.tarea = undefined
  }
  cancelar(){
    this.tarea.estado = "CANCELADA";
    this.tarea.asignado = undefined
    this.tareaService.update(this.tarea)
    this.tarea = undefined;
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
