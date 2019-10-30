import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../../models/tarea';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.css']
})
export class NuevaTareaComponent implements OnInit {

  constructor(private route: Router,
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute,
              private tareaService: TareaService) { }
  titulo:string = '';
  descripcion:string= '';
  idUrl:number;

  ngOnInit() {
  	this.idUrl= this.activatedRoute.snapshot.params.id;
  }

  onCreate(){
  	this.tareaService.crearTarea(this.titulo, this.descripcion, this.idUrl);
  	this.route.navigateByUrl('/home');

  }

}
