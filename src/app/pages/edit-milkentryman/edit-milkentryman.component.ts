import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-edit-milkentryman',
  templateUrl: './edit-milkentryman.component.html',
  styleUrls: ['./edit-milkentryman.component.scss']
})
export class EditMilkentrymanComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  editUserForm: FormGroup;
  storeSelected: any;
  store = [];
  milkentryman: any;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    this.milkentryman = this.apiservice.milkentrymanSelected;

    this.editUserForm = new FormGroup({
      milkentryman: new FormControl(this.milkentryman._id, Validators.required),
      name: new FormControl(this.milkentryman.name, Validators.required),
      phone: new FormControl(this.milkentryman.phone, Validators.required),
      email: new FormControl(this.milkentryman.email, Validators.required),
      password: new FormControl(''),
      store: new FormControl(this.milkentryman.store, Validators.required)
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.storeSelected = data.stores[0]._id;
        this.store = data.stores;
      })
  }

  onSubmit(value:any) {
    if (this.editUserForm.status === 'INVALID') {
      this.errorToast('Enter valid data');
    }
    else {

      this.apiservice.editMilkentryman(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.successToast(data.message);
            this.router.navigateByUrl('view-milkentryman');
          }
          else {
            this.errorToast(data.message);
          }
        })
    }
  }

  oncancel() {
    this.router.navigateByUrl('view-milkentryman');
  }

  successToast(message: string) {
    this.toastr.success(message);
  }

  errorToast(message: string) {
    this.toastr.error(message);
  }

}
