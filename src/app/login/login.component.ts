import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { Router, RouterModule, CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private route: Router, private _usuarioService: UsuarioService) { }
  user: Login = {username:'', password:''};
  isError = false;
  isInvalid= false;
  private ESTA_LOGUEADO = 'EstaLogueado'
  ngOnInit() {
  }
  onIngresar(form: NgForm):void{
    if(form.valid){
      console.log(this.user.username, this.user.password)
      this._usuarioService.login(this.user.username, this.user.password)
        .then(() => {
          localStorage.setItem(this.ESTA_LOGUEADO, 'true')
          this.route.navigateByUrl('/home');
          this.isError = false
        })
        .catch(()=>{
          this.isError =true;
          setTimeout(() => this.isError = false, 4000)
      })
    }else{
      this.isInvalid = true
      setTimeout(() => this.isInvalid = false, 4000)
    }
  	
  }

logout(){
  localStorage.removeItem(this.ESTA_LOGUEADO)
  this._usuarioService.logout
}
  

  registrar():void{
    this.route.navigateByUrl('/registrar');
  }
}
