import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../services/usuario.service";
import {Proyecto} from "../models/proyecto";
import {Tarea} from "../models/tarea";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  private proyectos: any;
  private tareas: any;

  constructor(private _route: ActivatedRoute, private _router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this._route.params.subscribe( params => {
      const search = params['search'];
      this._usuarioService.search(search).then((data) => {
        this.proyectos = data.proyectos.map(proyecto => Proyecto.fromJson(proyecto) );
        this.tareas = data.tareas.map(tarea => Tarea.fromJSON(tarea)) ;
      })
    })
  }
  view(id: number){
    this._router.navigateByUrl('/proyecto/'+id);

  }

}
