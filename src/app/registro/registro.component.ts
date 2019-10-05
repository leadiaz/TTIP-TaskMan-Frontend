import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private route: Router,private _auth: AuthService) { }
  private user:Usuario = {
  	usuario: "",
  	nombre:"",
  	apellido:"",
  	password: "",
  	email: "",
  	proyectos:null	
  };

  ngOnInit() {
  }
  onRegistrar():void{
  	console.log("lanzo evento");
  	this._auth.registrar(this.user.usuario,this.user.nombre,this.user.apellido,this.user.email,this.user.password)
  	.subscribe(data =>console.log(data));
    this.route.navigateByUrl('/login');


  }

}
