import { Component, OnInit } from '@angular/core';
import { UsuarioService } from'../services/usuario.service';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit {

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

logout(){
    this.usuarioService.logout();
  }
}
