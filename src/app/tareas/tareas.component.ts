import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Tarea } from '../models/tarea';
import { TareaService } from '../services/tarea.service';
import { tick } from '@angular/core/testing';



@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  id_url:number;
  tarea;
  usuario = '';
  usuarioSeleccionado;
  constructor(private route: Router, 
              private tareaService: TareaService,
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute) {
    this.tarea = this.tareaService.tareaActual;
    this.tareaService.tarea$.subscribe(result => this.tarea = result);

  }

  ngOnInit() {
  }

  eliminar(){
    
  }
  asignarUsuario(usuario){
    this.tarea.asignado = usuario;
    this.tareaService.update(this.tarea)
  }
  buscar(){
    console.log(this.tareaService.proyecto.miembros)
    let user = this.tareaService.proyecto.miembros.find(user => user.email == this.usuario)
    console.log(user)
    if (user == undefined){
      alert("usuario no encontrado");
    }else{
      this.asignarUsuario(user)
    }
  }

}
