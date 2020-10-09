import { Component, OnInit } from '@angular/core';
import { UsuarioService } from'../services/usuario.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
 public usuario: Usuario;
  constructor( private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
    }

  ngOnInit() {
    console.log(this.usuario);
    }

}
