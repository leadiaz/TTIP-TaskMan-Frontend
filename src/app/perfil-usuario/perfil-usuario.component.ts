import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsuarioService} from '../services/usuario.service';
import {Usuario} from '../models/usuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  @ViewChild('buscador', {static: false}) buscador: ElementRef;
  usuario: Usuario;
  isInvalid = false;
  isError: boolean = false;

  constructor(public router: Router, private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    document.getElementById('buscador').style.visibility = 'hidden';
  }

  actualizarPerfil(form: NgForm) {
    if (form.valid) {
      this.usuarioService.actualizarPerfilUsuario(this.usuario)
        .catch(() => {
          this.isError = true;
          setTimeout(() => this.isError = false, 4000)
        });
    } else {
      this.isInvalid = true;
      setTimeout(() => this.isInvalid = false, 4000);
    }
  }

  public volverAlHome() {
    this.router.navigateByUrl('home');
  }
}
