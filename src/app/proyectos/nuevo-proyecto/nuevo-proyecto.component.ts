import { Component, OnInit } from '@angular/core';
import { ProyectoInterface } from '../../models/proyectoInterface';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  constructor(private _proyectoService: ProyectoService, private route:Router) { }

  nombre : string = '';

  ngOnInit() {}

  onCreate():void{
    console.log("onCreate");
    console.log(this.nombre);
  	this._proyectoService.crearProyecto(this.nombre);
    this.route.navigateByUrl('/home');
  }

}
