import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
	idUrl:number
  constructor(private route: Router, 
              private authService: AuthService, 
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute,
              private usuarioService: UsuarioService) { 
  	

  }

  proyecto: Observable<Proyecto>
  creador:string;
  private task:Array<any>

  ngOnInit() {
  	//this.id.subscribe(data => console.log(data))
  	//this.proyectoService.getProyecto(this.)
  	this.idUrl= this.activatedRoute.snapshot.params.id;
  	this.proyecto=this.proyectoService.getProyecto(this.idUrl).pipe(map(data=>data));
  	this.proyecto.subscribe(data => localStorage.setItem("proyecto actual", JSON.stringify(data)));

    this.task= JSON.parse(localStorage.getItem("proyecto actual"))['tareas']

    console.log(this.task)
  }
  nuevoTarea():void{
  	this.route.navigateByUrl('/usuario/proyecto/'+this.idUrl+'/nueva-tarea');
  }
  view(id: number){
    this.route.navigateByUrl('/usuario/proyecto/'+this.idUrl+'/tarea/'+id)
  }

  eliminarTarea(id:number){
    this.authService.eliminarTarea(id,this.idUrl);
  }
  agregarMiembro(user: string){
    this.usuarioService.getUserByUsername(user).subscribe(data => {
      this.proyecto.subscribe(res => res.miembros.push(data))
      });
    this.authService.modificarProyecto(this.proyecto)

   // this.authService.update(user);
    

  }
}
