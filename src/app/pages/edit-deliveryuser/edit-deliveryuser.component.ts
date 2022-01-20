import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-deliveryuser',
  templateUrl: './edit-deliveryuser.component.html',
  styleUrls: ['./edit-deliveryuser.component.scss']
})
export class EditDeliveryuserComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editUserForm: FormGroup;
  storeSelected: any;
  store = [];
  deliveryuser: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.deliveryuser = this.apiservice.deliveryuserSelected;

    this.editUserForm = new FormGroup({
      deliveryuser: new FormControl(this.deliveryuser._id, Validators.required),
      name: new FormControl(this.deliveryuser.name, Validators.required),
      phone: new FormControl(this.deliveryuser.phone, Validators.required),
      email: new FormControl(this.deliveryuser.email, Validators.required),
      password: new FormControl(''),
      adhar: new FormControl(this.deliveryuser.adhar, Validators.required),
      store: new FormControl(this.deliveryuser.store, Validators.required)
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  onSubmit(value:any) {
    if (this.editUserForm.status == 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.editDeliveryUser(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-deliveryman');
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('view-deliveryman');
  }

  successToast(message: string) {
    this.toastr.success(message);
  }

  errorToast(message: string) {
    this.toastr.error(message);
  }

}
