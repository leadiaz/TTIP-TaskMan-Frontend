import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Tarea } from '../models/tarea';
import { TareaService } from '../services/tarea.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  id_url:number;
  tarea;
  constructor(private route: Router, 
              private authService: AuthService,
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

}
