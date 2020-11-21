import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { NgForm,FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  isInvalid: boolean = false;
  isError: boolean = false;
  usuarioForm: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private route: Router,private _usuarioService: UsuarioService) {
      this.usuarioForm = this.createFormGroup();
}


  createFormGroup(){
    return new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)])
      });
    }

    onResetForm(){
        this.usuarioForm.reset();
       }

  ngOnInit() {
  }
  onRegistrar(form: NgForm):void{
    if(this.usuarioForm.valid){
      const user: Usuario = this.usuarioForm.value;
      this._usuarioService.save(user.usuario,user.nombre,user.apellido,user.email,user.password)
      .then(() =>{ this.onResetForm();
                  this.route.navigate(['login']);
                  })
      .catch(() => {

        this.isError = true;
        setTimeout(() => this.isError = false, 4000)});
    }else{
      this.isInvalid = true
      setTimeout(() => this.isInvalid = false, 4000)
    }
  }

  get usuario(){
    return this.usuarioForm.get('usuario');
    }
    get nombre(){
      return this.usuarioForm.get('nombre');
    }
    get apellido(){
      return this.usuarioForm.get('apellido');
    }
    get password(){
      return this.usuarioForm.get('password');
    }
    get email(){
      return this.usuarioForm.get('email');
    }

}
