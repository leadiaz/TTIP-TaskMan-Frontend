import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';

import { TareaService } from '../services/tarea.service';
import { Proyecto } from '../models/proyecto';
import { Tarea } from '../models/tarea';
import { UsuarioService } from '../services/usuario.service';
import { Rol } from '../models/rol';




@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  /** Para Modal de crear nueva tarea **/
  titulo= '';
  descripcion = '';

  rol='';

  tarea: Tarea;
  usuario = '';
  usuarioSeleccionado;
  consulta:string = '';
  usuarioEncontrado;
  proyectoActual: Proyecto;
  constructor(private route: Router,
              private tareaService: TareaService,
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) {

  }

  async ngOnInit() {
    await this.proyectoService.getProyecto(this.activatedRoute.snapshot.params.id)
      .subscribe(data => this.proyectoActual = data)

  }
  view(id){
    this.tarea = this.proyectoActual.tareas.find(t => t.id === id)
  }

  onCreate(){
    this.tareaService.crearTarea(this.titulo, this.descripcion, this.activatedRoute.snapshot.params.id).subscribe(data => this.proyectoActual.tareas.push(data))
  }
  eliminar(id){
    const idPr = this.proyectoActual.id;
    this.tareaService.delete(idPr, id).then( () => {
      this.proyectoActual.tareas = this.proyectoActual.tareas.filter(tarea => tarea.id != id)
    });

  }
  asignarUsuario(usuario){
    this.tarea.asignado = usuario;
    this.tareaService.update(this.tarea)
  }

  agregarMiembro(){
    this.usuarioService.getUserByUsername(this.usuario).//cambiar busqueda por email
      subscribe(data => {
        this.proyectoActual.roles.push(data);
        this.proyectoService.modificarProyecto(this.proyectoActual)
      } , err => {
        alert("usuario no encontrado");
      });

    }

    buscar(){

    const tar = this.proyectoActual.tareas.filter(tarea => tarea.titulo.includes(this.consulta));
    this.proyectoActual.tareas = tar;
    console.log(tar);
    }

    agregarRol(){
      this.proyectoService.agregarRol(this.rol).then(data => this.proyectoActual = Proyecto.fromJson(data))
    }
}
