import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  isInvalid: boolean = false;
  isError: boolean = false;
  
  constructor(private route: Router,private _usuarioService: UsuarioService) { }
  private user:Usuario = {
    id: null,
  	usuario: "",
  	nombre:"",
  	apellido:"",
  	password: "",
  	email: ""
  };

  ngOnInit() {
  }
  onRegistrar(form: NgForm):void{
    if(form.valid){
      this._usuarioService.save(this.user.usuario,this.user.nombre,this.user.apellido,this.user.email,this.user.password)
      .then(data => this._usuarioService.login(data.usuario, data.password))
      .catch(() => {
        this.isError = true;
        setTimeout(() => this.isError = false, 4000)});
    }else{
      this.isInvalid = true
      setTimeout(() => this.isInvalid = false, 4000)
    }
  }

}
