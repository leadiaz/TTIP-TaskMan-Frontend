import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { Router, RouterModule, CanActivate } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private _authService: AuthService) { }
  user: Login = {username:'', password:''};

  ngOnInit() {
  }
  onIngresar():void{
  	console.log(this.user.username);
  	this._authService.login(this.user.username, this.user.password);//}
	//his._authService.login(this.user.usuario, this.user.password);
  	//subscribe(data => data );
      this.route.navigateByUrl('/home');
  }

  registrar():void{
    this.route.navigateByUrl('/registrar');
  }
}
