import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
	id_url:number;
  constructor(private route: Router, 
              private authService: AuthService, 
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.id_url= this.activatedRoute.snapshot.params.idt;
  }

}
