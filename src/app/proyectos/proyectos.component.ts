import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { TareaService } from '../services/tarea.service';
import { MatDialog } from '@angular/material';
import { BuscarUsuarioComponent } from '../usuarios/buscar-usuario/buscar-usuario.component';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  idUrl:number;
  proyecto;
  creador:string;
  tareas;

  constructor(private route: Router, 
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService, 
              private tareaService : TareaService) { 
    this.proyecto = this.proyectoService.proyecto;
    this.tareas = this.proyectoService.tareas;
    this.proyectoService.proyecto$.subscribe(data => this.proyecto = data);
    this.proyectoService.tareas$.subscribe(data => this.tareas = data);
  	

  }

  ngOnInit() {}
  nuevoTarea():void{
  	this.route.navigateByUrl('/usuario/proyecto/'+this.proyecto.id+'/nueva-tarea');
  }
  view(id: number){
    this.tareaService.proyecto = this.proyecto
    console.log(this.proyecto)
    this.tareaService.setTareaActual(id);
    this.route.navigateByUrl('/usuario/proyecto/'+this.proyecto.id +'/tarea/'+id);
  }

  eliminarTarea(id:number){
    this.tareaService.delete(id);
  }
  agregarMiembro(){
    this.route.navigateByUrl('/proyecto/find-user');
    //let usuario;
    //usuario = this.usuarioService.getUserByUsername(user)

    //this.proyecto.miembros.push(usuario);
    //this.proyectoService.modificarProyecto(this.proyecto);
    

  }
}
