import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.css']
})
export class NuevaTareaComponent implements OnInit {

  constructor(private route: Router, 
              private authService: AuthService, 
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute) { }
  titulo:string = '';
  descripcion:string= '';
  idUrl:number;

  ngOnInit() {
  	this.idUrl= this.activatedRoute.snapshot.params.id;
  }

  onCreate(){
  	this.authService.crearTarea(this.titulo, this.descripcion, this.idUrl).subscribe(data => data);
  	this.route.navigateByUrl('/home');

  }

}
