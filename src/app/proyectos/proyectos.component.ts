import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
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
  proyectos;
  creador:string;
  tareas;

  proyecto = "";

  constructor(private route: Router, 
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService, 
              private tareaService : TareaService) { 
    this.proyectos = this.usuarioService.proyectosActuales;
    this.usuarioService.proyectos$.subscribe(data => {this.proyectos = data; console.log(data)});

  }

  ngOnInit() {
    
  }
  view(id: number){
    this.route.navigateByUrl('/proyecto/'+id);
  }
  onCreate(){
    //aca hace la peticion de post
    this.proyectoService.crearProyecto(this.proyecto)
  }
  agregarMiembro(){
    // this.route.navigateByUrl('/proyecto/find-user');
    //let usuario;
    //usuario = this.usuarioService.getUserByUsername(user)

    //this.proyecto.miembros.push(usuario);
    //this.proyectoService.modificarProyecto(this.proyecto);
    

  }
}
