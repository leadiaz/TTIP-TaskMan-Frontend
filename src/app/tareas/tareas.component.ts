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
  @ViewChild('btnClose',{static: false}) btnClose: ElementRef;
  @ViewChild('btnCloseRol',{static: false}) btnCloseRol: ElementRef;
  @ViewChild('btnCloseMiembro',{static: false}) btnCloseMiembro: ElementRef;

  /** Para Modal de crear nueva tarea **/
  titulo = '';
  descripcion = '';

  rol = '';

  tarea: Tarea;
  usuario = '';
  usuarioSeleccionado;
  consulta: string = '';
  usuarioEncontrado;
  proyectoActual: Proyecto;
  rolesDelProyecto: Rol[];
  miembros: Set<Usuario>;
  isCheck = false;
  fechaEstimada:Date;
  lista:string[]=["Baja","Media","Alta"];
  seleccionado:string='';

  /**PopUp */
  public popoverTitle: string = 'Eliminar Tarea'
  public popoverMessage: string = '¿Esta seguro que desea eliminar esta tarea?'

  constructor(private route: Router,
              private tareaService: TareaService,
              private proyectoService: ProyectoService,
              private usuarioService: UsuarioService,
              private activatedRoute: ActivatedRoute) {
    this.miembros = new Set()
  }

  async ngOnInit() {
    await this.proyectoService.getProyecto(this.activatedRoute.snapshot.params.id)
      .subscribe(data => {
        this.proyectoActual = Proyecto.fromJson(data);
        this.rolesDelProyecto = this.proyectoActual.roles
        // this.miembros = new Set(this.rolesDelProyecto.map(rol => {
        //   if(rol.usuarioAsignado){
        //     return rol.usuarioAsignado
        //   }
        // }))
        this.rolesDelProyecto.forEach(rol => {
          if (rol.usuarioAsignado) {
            this.miembros.add(rol.usuarioAsignado)
          }
        })
      })

  }

  view(id) {
    this.tarea = this.proyectoActual.tareas.find(t => t.id === id)
  }

  onCreate() {
    if(this.fechaEstimada && this.seleccionado != ''){
      this.tareaService.crearTareaCompleja(this.titulo, this.descripcion,this.convertToNumberPrioridad(this.seleccionado),this.fechaEstimada, this.activatedRoute.snapshot.params.id).subscribe(data => this.proyectoActual.tareas.push(data))
    }else{
      this.tareaService.crearTarea(this.titulo, this.descripcion, this.activatedRoute.snapshot.params.id).subscribe(data => this.proyectoActual.tareas.push(data))
    }
    this.btnClose.nativeElement.click();
    this.limpiarCampos();
  }
  limpiarCampos() {
    this.titulo = '';
    this.descripcion = '';
    this.rol = '';
    this.usuario = '';
  }

  eliminar(id) {
    const idPr = this.proyectoActual.id;
    this.tareaService.delete(idPr, id).then(() => {
      this.proyectoActual.tareas = this.proyectoActual.tareas.filter(tarea => tarea.id != id)
    });

  }

  asignarUsuario(usuario,id) {
    this.tarea = this.proyectoActual.tareas.find(t => t.id === id)
    this.tarea.asignado = usuario;
    this.tareaService.update(this.tarea)
  }

  agregarMiembro() {
    this.usuarioService.getUserByUsername(this.usuario).//cambiar busqueda por email
    subscribe(data => {
      this.proyectoActual.roles.push(data);
      this.proyectoService.modificarProyecto(this.proyectoActual)
    }, err => {
      alert("usuario no encontrado");
    });
    this.btnCloseMiembro.nativeElement.click();

  }

  buscar() {

    const tar = this.proyectoActual.tareas.filter(tarea => tarea.titulo.includes(this.consulta));
    this.proyectoActual.tareas = tar;
    console.log(tar);
  }

  agregarRol() {
    const idPr = this.activatedRoute.snapshot.params.id;
    this.proyectoService.agregarRol(this.rol, idPr).then(data => this.proyectoActual = Proyecto.fromJson(data))
    this.btnCloseRol.nativeElement.click()
  }

  expandirFormulario(){
    this.isCheck = !this.isCheck
    if(this.isCheck){
      document.getElementById('tareaCompleja').style.display = 'block'
    }else{
      document.getElementById('tareaCompleja').style.display = 'none'
    }

  }
  private convertToNumberPrioridad(prioridad){
    switch (prioridad){
      case 'Baja':
        return 0
        break
      case 'Media':
        return 1;
        break;
      case 'Alta':
        return 2;
        break
    }


  }
}
