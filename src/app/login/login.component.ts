import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private apiservice: ApiService, private toastr : ToastrService) { }

  ngOnInit(){

    this.loginForm = new FormGroup({
      phone : new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required
      ]),
      password : new FormControl('', [
        Validators.required
      ])
    })
  }

  validation_messages = {
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'minLength', message: 'Please enter valid phone number' },
      { type: 'maxLength', message: 'Please enter valid phone number' }
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ]
  }

  onSubmit(value) {
    if(this.loginForm.status == 'VALID'){
      this.apiservice.adminLogin(value)
      .subscribe((data: any) => {
        console.log(data);
        if(data.success) {
          localStorage.setItem('token', data.token);
          this.openpage('/dashboard');
        }
        else {
          this.toastr.error(data.message);
        }
      })
    }
  }
  openpage(page) {
    this.router.navigateByUrl(page);
  }

}
