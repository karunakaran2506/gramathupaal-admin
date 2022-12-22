import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-milkentryman',
  templateUrl: './add-milkentryman.component.html',
  styleUrls: ['./add-milkentryman.component.scss']
})
export class AddMilkentrymanComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addUserForm: FormGroup;
  storeSelected: any;
  files: any;
  store = [];
  imageSrc: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required)
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  onSubmit(value) {
    if (this.addUserForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.createMilkentryman(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-milkentryman')
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  successToast(message: string) {
    this.toastr.success(message);
  }

  errorToast(message: string) {
    this.toastr.error(message);
  }

}
