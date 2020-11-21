import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';

import {TareaService} from '../services/tarea.service';
import {Proyecto} from '../models/proyecto';
import {Tarea} from '../models/tarea';
import {UsuarioService} from '../services/usuario.service';
import {Rol} from '../models/rol';
import {Usuario} from '../models/usuario';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tarea: Tarea;
  usuario = '';
  usuarioSeleccionado;
  consulta: string = '';
  usuarioEncontrado;
  proyectoActual: Proyecto;
  isCheck = false;

  isError: boolean = false;

  /**PopUp */
  public popoverTitle: string = 'Eliminar Tarea'
  public popoverMessage: string = '¿Esta seguro que desea eliminar esta tarea?'

  constructor(private route: Router,
              private tareaService: TareaService,
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) {
  }

   async ngOnInit() {
       await this.proyectoService.getProyectoAsync(this.activatedRoute.snapshot.params.id)
     }


  eliminar(id) {
    const idPr = this.proyectoService.proyectoActual.id;
    this.tareaService.delete(idPr, id).then(() => {
      this.proyectoService.proyectoActual.tareas = this.proyectoService.proyectoActual.tareas.filter(tarea => tarea.id != id)
    });

  }

  getTareas(){
  return this.proyectoService.proyectoActual.tareas;
  }

  asignarUsuario(usuario, id) {
    this.tarea = this.proyectoService.proyectoActual.tareas.find(t => t.id === id)
    this.tarea.asignado = usuario;
    this.tarea.estado = 'En proceso';
    this.tareaService.update(this.tarea).then(()=>{
      this.proyectoService.getProyecto(this.proyectoService.proyectoActual.id)
        .subscribe((data) => {
          this.proyectoService.proyectoActual = Proyecto.fromJson(data)
        })
    })
  }


  buscar() {

    const tar = this.proyectoActual.tareas.filter(tarea => tarea.titulo.includes(this.consulta));
    this.proyectoActual.tareas = tar;
    console.log(tar);
  }
}
