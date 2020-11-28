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
  isCheck: boolean = false;
  isCheckContrasenha: boolean = false;
  isErrorContrasenhaNotIgual: boolean = false;
  isErrorContrasenhaActualNotIgual: boolean = false;
  isErrorFaltanCompletarCampos: boolean = false;
  passwordActual  = '';
  passwordNew  = '';
  passwordNewRep = '';

  constructor(public router: Router, private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    document.getElementById('buscador').style.visibility = 'hidden';
  }

  actualizarPerfil(form: NgForm) {
    if (form.valid) {
      this.usuarioService.actualizarPerfilUsuario(this.usuario)
        .then(() =>{ this.isCheck = true;
                  setTimeout(() => this.isCheck = false, 4000);
                  })
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

  public actualizarContrasenha(){
  const hayerrores = this.gestionarerrrores();
  if(!hayerrores){
  this.usuario.password = this.passwordNew;
  this.usuarioService.actualizarPerfilUsuario(this.usuario)
  .then(() =>{ this.isCheckContrasenha = true;
               this.passwordActual  = '';
               this.passwordNew  = '';
               this.passwordNewRep = ''
               setTimeout(() => this.isCheckContrasenha = false, 4000);
                    })
  }

  }

  private gestionarerrrores(){
  let res : Boolean = false;
  if( this.passwordNew !=this.passwordNewRep){
        this.isErrorContrasenhaNotIgual = true;
        setTimeout(() => this.isErrorContrasenhaNotIgual = false, 4000);
        res = true;
    }else if( this.passwordActual != this.usuario.password){
       this.isErrorContrasenhaActualNotIgual = true;
       setTimeout(() => this.isErrorContrasenhaActualNotIgual = false, 4000);
       res = true;
    }
    else if( this.passwordActual  === ''|| this.passwordNewRep  === ''|| this.passwordNew === ''){
           this.isErrorFaltanCompletarCampos = true;
           setTimeout(() => this.isErrorFaltanCompletarCampos = false, 4000);
           res = true;
        }
    return  res;
  }

}
