import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Proyecto } from '../../models/proyecto';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  constructor(private _authService:  AuthService) { }

  private proyecto: Proyecto ={
  	nombre:"",
  	descripcion:  "",
  	tareas: null 
  }

  ngOnInit() {
  }

  onCreate():void{
  	this._authService.crearProyecto(this.proyecto).
  	subscribe(data => data );
  }

}
