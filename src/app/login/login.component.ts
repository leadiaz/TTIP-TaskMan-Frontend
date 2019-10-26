import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { Router, RouterModule, CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private _usuarioService: UsuarioService) { }
  user: Login = {username:'', password:''};

  ngOnInit() {
  }
  onIngresar():void{
    console.log(this.user.username);
    if (! this.user.username || !this.user.password  ){
        alert("completar los campos")
    }else{
      this._usuarioService.login(this.user.username, this.user.password)
      .then((res) => {
        this.route.navigateByUrl('/home');
      }).catch(err => console.log('err', err));
      
    }
  	
  }

logout(){
  this._usuarioService.logout
}
  

  registrar():void{
    this.route.navigateByUrl('/registrar');
  }
}
