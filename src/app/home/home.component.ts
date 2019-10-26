import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UsuarioService } from'../services/usuario.service';
import { ProyectoService } from '../services/proyecto.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usuario;
  
  public proyectos = new Array<any>();
  public idUsuario:number;

  constructor(private route: Router,  
              private usuarioService: UsuarioService,
              private proyectoService: ProyectoService){ 
    this.usuario = this.usuarioService.usuario;
    this.usuarioService.proyectos$.subscribe(data => {
      data.forEach( proyecto => {
        this.proyectoService.getProyecto(proyecto).subscribe(res => this.proyectos.push(res))
      })
    });
    this.usuarioService.usuario$.subscribe(res => this.usuario = res)
    }

  public app_name = "Home";

  ngOnInit() {  
  }

  nuevoProyecto():void{
  	console.log("nuevo-proyecto")
  	this.route.navigateByUrl('/nuevo-proyecto');
  }
  view(id:number){
    this.proyectoService.setProyectoActual(id)
    this.route.navigateByUrl('/proyecto/'+id);
  }
/*
  delete(id : number){
    let proyecto = this.proyectos.find(p => p.id == id);
    proyecto.tareas.forEach(t => this.tareaService.delete(t.id));
    this.proyectos = this.proyectos.filter(p => p.id != proyecto.id);
    this.proyectoService.delete(id);
  }
*/
  /*buscarTarea(tarea: string){
    return this.tareas.find(t => t.titulo == tarea);
  }*/
  

}
