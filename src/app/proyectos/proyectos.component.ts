import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../models/proyecto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { TareaService } from '../services/tarea.service';
import { MatDialog } from '@angular/material';
import { BuscarUsuarioComponent } from '../usuarios/buscar-usuario/buscar-usuario.component';
import { $ } from 'protractor';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  @ViewChild('btnClose', {static: false}) closeBtn: ElementRef;
  idUrl:number;
  proyectos:Proyecto[];
  creador:string;
  tareas;

  proyecto = "";

  public popoverTitle: string = 'Eliminar Proyecto'
  public popoverMessage: string = '¿Esta seguro que desea eliminar este proyecto?'
  public confirmText: string = 'Confirmar';
  public cancelText: string = 'Cancelar';

  constructor(private route: Router, 
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService, 
              private tareaService : TareaService) { 
    

  }

  ngOnInit() {
    this.usuarioService.getProyectosByUserID(parseInt(localStorage.getItem('usuarioID'))).then(data =>{
      this.proyectos = data.map( proyecto => Proyecto.fromJson(proyecto))
      this.usuarioService.proyectos$.subscribe(data => this.proyectos = data.map( proyecto => Proyecto.fromJson(proyecto)))
    } );
  }
  view(id: number){
    this.route.navigateByUrl('/proyecto/'+id);

  }
  
  onCreate(){
    //aca hace la peticion de post
    this.proyectoService.crearProyecto(this.proyecto);
    this.closeBtn.nativeElement.click();
    this.proyecto = '';
    this.ngOnInit()
  }
  eliminar(id){
    this.proyectoService.delete(id).then(()=> {
      this.proyectos = this.proyectos.filter(proyecto => proyecto.id != id);
      this.usuarioService.proyectosActuales = this.proyectos;
    })
  }
  agregarMiembro(){
    // this.route.navigateByUrl('/proyecto/find-user');
    //let usuario;
    //usuario = this.usuarioService.getUserByUsername(user)

    //this.proyecto.miembros.push(usuario);
    //this.proyectoService.modificarProyecto(this.proyecto);
  }
}
