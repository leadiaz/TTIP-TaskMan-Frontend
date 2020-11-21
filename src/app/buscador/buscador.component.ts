import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../services/usuario.service";

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
        this.proyectos = data.proyectos;
        this.tareas = data.tareas;
      })
    })
  }
  view(id: number){
    this._router.navigateByUrl('/proyecto/'+id);

  }

}
