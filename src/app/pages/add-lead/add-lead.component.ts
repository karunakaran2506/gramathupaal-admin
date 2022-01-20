import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';
import { referrals } from 'src/app/shared/common';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss']
})
export class AddLeadComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addLeadForm: FormGroup;
  store = [];
  referrals = referrals;

  constructor(
    private apiservice: ApiService,
    private toastr : ToastrService,
    private router : Router
  ) { }

  ngOnInit() {

    this.addLeadForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl(''),
      modeofreferral: new FormControl('', Validators.required),
      status: new FormControl('Placed', Validators.required),
      comment: new FormControl(''),
      store: new FormControl('', Validators.required),
    })

    this.apiservice.listStores()
     .subscribe((data:any)=>{
       this.store = data.stores;
     })
  }

  onSubmit(value:any) {
    if (this.addLeadForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.addlead(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-lead')
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel(){
    this.formGroupDirective.resetForm();
  }

  successToast(message) {
    this.toastr.success(message);
  }

  errorToast(message) {
    this.toastr.error(message);
  }

}
