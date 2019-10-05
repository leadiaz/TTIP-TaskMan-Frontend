import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Proyecto } from '../models/proyecto';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


import {MatCardModule} from '@angular/material/card'; 
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UsuarioService } from'../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, 
              private authService: AuthService, 
              private usuarioService: UsuarioService){}

  public app_name = "Home";
  usuario_logueado:Observable<any>
  private proyectos:Array<Proyecto>;

  ngOnInit() {
    if(this.usuario_logueado !== undefined ){
      this.recargar(this.authService.username)

    }else
      this.recargar(JSON.parse(localStorage.getItem("usuario actual"))['usuario']);    
  }
  recargar(user:string){
    console.log("home: "+ user);
      this.usuario_logueado=this.usuarioService.getUserByUsername(
                            user).
                          pipe(map(data =>data));
      this.usuario_logueado.
                          subscribe(data => this.proyectos = (data.proyecto));
  }
  nuevoProyecto():void{
  	console.log("nuevo-proyecto")
  	this.route.navigateByUrl('/nuevo-proyecto');
  }
  view(id:number){
    this.route.navigateByUrl('/usuario/proyecto/'+id);
  }
  

}
