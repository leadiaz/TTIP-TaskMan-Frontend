import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';

import {TareaService} from '../services/tarea.service';
import {Proyecto} from '../models/proyecto';
import {Tarea} from '../models/tarea';

@Component({
  selector: 'app-modal-asignar-usuario',
  templateUrl: './modal-asignar-usuario.component.html',
  styleUrls: ['./modal-asignar-usuario.component.css']
})
export class ModalAsignarUsuarioComponent implements OnInit {
  @ViewChild('btnCloseMiembro',{static: false}) btnCloseMiembro: ElementRef;
  isCheck = false;
  isError: boolean = false;
  usuario = '';
  constructor(private route: Router,
              private proyectoService: ProyectoService) { }

  ngOnInit() {
  }


  agregarMiembro() {
    let pr = this.proyectoService.refaccionarEstadoDeTareas(this.proyectoService.proyectoActual);
    let response = this.proyectoService.modificarProyecto( pr,this.usuario,1)
    response.subscribe(data => {let proyectoActualizado = Proyecto.fromJson(data);
                                this.proyectoService.getProyectoAsync(proyectoActualizado.id)
                                this.btnCloseMiembro.nativeElement.click();
                                },
                        err => {
                                this.isError = true;
                                setTimeout(() => this.isError = false, 4000)
                                this.proyectoService.getProyectoAsync(pr.id);
                            });
  }

}
