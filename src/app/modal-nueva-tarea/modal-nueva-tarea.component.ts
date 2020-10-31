import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {Tarea} from '../models/tarea';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';

import {TareaService} from '../services/tarea.service';

@Component({
  selector: 'app-modal-nueva-tarea',
  templateUrl: './modal-nueva-tarea.component.html',
  styleUrls: ['./modal-nueva-tarea.component.css']
})
export class ModalNuevaTareaComponent implements OnInit {
  @ViewChild('btnClose',{static: false}) btnClose: ElementRef;
  @ViewChild('btnCloseRol',{static: false}) btnCloseRol: ElementRef;
  @ViewChild('btnCloseMiembro',{static: false}) btnCloseMiembro: ElementRef;

  /** Para Modal de crear nueva tarea **/
  titulo = '';
  descripcion = '';
  rol = '';
  tarea: Tarea;
  isCheck = false;
  fechaEstimada:Date;
  lista:string[]=["Baja","Media","Alta"];
  seleccionado:string='';
  isError: boolean = false;
  constructor(private tareaService: TareaService,
              private proyectoService: ProyectoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }


 onCreate() {
     if(this.fechaEstimada && this.seleccionado != ''){
       this.tareaService.crearTareaCompleja(this.titulo, this.descripcion,this.convertToNumberPrioridad(this.seleccionado),this.fechaEstimada, this.activatedRoute.snapshot.params.id).subscribe(data =>  this.proyectoService.proyectoActual.tareas.push(data))
     }else{
       this.tareaService.crearTarea(this.titulo, this.descripcion, this.activatedRoute.snapshot.params.id).subscribe(data => this.proyectoService.proyectoActual.tareas.push(data))
     }
     this.btnClose.nativeElement.click();
     this.limpiarCampos();
   }

  limpiarCampos() {
    this.titulo = '';
    this.descripcion = '';
    this.rol = '';
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
