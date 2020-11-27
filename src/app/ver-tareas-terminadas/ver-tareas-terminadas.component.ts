import { Component, OnInit } from '@angular/core';
import { TareasComponent } from '../tareas/tareas.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ProyectoService} from '../services/proyecto.service';
import {UsuarioService} from '../services/usuario.service';
import {Tarea} from '../models/tarea';

@Component({
  selector: 'app-ver-tareas-terminadas',
  templateUrl: './ver-tareas-terminadas.component.html',
  styleUrls: ['./ver-tareas-terminadas.component.css']
})
export class VerTareasTerminadasComponent implements OnInit {

   tareas: Tarea[];

  constructor( public router: Router,private proyectoService: ProyectoService,private usuarioService: UsuarioService) { }

  ngOnInit() {
  if(this.proyectoService.proyectoActual != undefined){
    this.tareas = this.proyectoService.proyectoActual.tareas.filter(t => t.estado === "Cancelada" || t.estado === "Terminada" )
  }
  }

 public volverAlHome() {
 const id = this.proyectoService.proyectoActual.id;
    this.router.navigateByUrl('/proyecto/'+id);
  }
}
