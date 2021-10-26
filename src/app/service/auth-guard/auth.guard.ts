import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authservice: AuthService,
    public router: Router
  ) { }

  canActivate(){
    let result = this.authservice.isLoggedin();

    if(result){
      return true;
    }
    else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
