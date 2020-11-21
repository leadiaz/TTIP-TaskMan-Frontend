import { Component, OnInit } from '@angular/core';
import { UsuarioService } from'../services/usuario.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {
  aBuscar = '';

  constructor( private usuarioService: UsuarioService, private _router: Router) { }

  ngOnInit() {
  }

logout(){
    this.usuarioService.logout();
  }

  async  buscar(){
    await this._router.navigateByUrl('buscar/'+this.aBuscar);
    this.aBuscar = '';
  }
}
