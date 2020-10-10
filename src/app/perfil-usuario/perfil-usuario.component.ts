import { Component, OnInit } from '@angular/core';
import { UsuarioService } from'../services/usuario.service';
import { Usuario } from '../models/usuario';
import{ FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario;

  constructor( public router: Router,private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;

    }
  ngOnInit() {
    console.log(this.usuario);
    }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfilUsuario(this.usuario);
  }
 public volverAlHome(){
       this.router.navigateByUrl('home');
      }
}
