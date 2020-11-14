import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(){
    if(localStorage.getItem('EstaLogeado')){
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
