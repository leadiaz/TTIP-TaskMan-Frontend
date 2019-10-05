import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProyectoInterface } from '../../models/proyectoInterface';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {

  constructor(private _authService:AuthService, private route:Router) { }

  private proyecto: ProyectoInterface ={

  	nombre: ''
  };

  ngOnInit() {
    
  }

  onCreate():void{
    console.log("onCreate");
    console.log(this.proyecto.nombre);
  	this._authService.crearProyecto(this.proyecto).subscribe(data=>data);
    this.route.navigateByUrl('/home');
  }

}
