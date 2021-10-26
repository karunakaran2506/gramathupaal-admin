import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiservice : ApiService, private router : Router) { }

  isLoggedin() {
    let result = localStorage.getItem('token');
      return result ? true : false;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}