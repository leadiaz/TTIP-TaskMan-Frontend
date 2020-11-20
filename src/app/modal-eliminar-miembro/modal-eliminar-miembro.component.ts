import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';
import {Usuario} from '../models/usuario';
import {Proyecto} from '../models/proyecto';

@Component({
  selector: 'app-modal-eliminar-miembro',
  templateUrl: './modal-eliminar-miembro.component.html',
  styleUrls: ['./modal-eliminar-miembro.component.css']
})
export class ModalEliminarMiembroComponent implements OnInit {
 @ViewChild('btnCloseMiembro',{static: false}) btnCloseMiembro: ElementRef;
   isCheck: boolean = false;
   isError: boolean = false;
  constructor(private route: Router, private proyectoService: ProyectoService) { }

  ngOnInit() {
  }


  eliminarMiembroDeUnProyecto(usuarioObject: Usuario) {

    let response = this.proyectoService.modificarProyecto( this.proyectoService.proyectoActual,usuarioObject.usuario,0)
    response.subscribe(data => {let proyectoActualizado = Proyecto.fromJson(data);
                                this.proyectoService.rolesDelProyecto = proyectoActualizado.rols
                                this.proyectoService.miembros = this.proyectoService.obtenerMiembrosDeUnProyecto(proyectoActualizado);
                                //this.btnCloseMiembro.nativeElement.click();
                                this.isCheck = true;
                                 setTimeout(() => this.isCheck = false, 4300)
                                },
                        err => {
                                console.log(err);
                            });
  }
}
