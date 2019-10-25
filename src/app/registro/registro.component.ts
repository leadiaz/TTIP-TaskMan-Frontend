import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private route: Router,private _usuarioService: UsuarioService) { }
  private user:Usuario = {
    id: null,
  	usuario: "",
  	nombre:"",
  	apellido:"",
  	password: "",
  	email: "",
  	proyecto:null	
  };

  ngOnInit() {
  }
  onRegistrar():void{
  	this._usuarioService.save(this.user.usuario,this.user.nombre,this.user.apellido,this.user.email,this.user.password)
  	.subscribe(data =>console.log(data));
    this.route.navigateByUrl('/login');
  }

}
