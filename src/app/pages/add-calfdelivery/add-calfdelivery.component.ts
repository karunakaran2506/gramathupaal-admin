import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api/api.service';

@Component({
  selector: 'app-add-calfdelivery',
  templateUrl: './add-calfdelivery.component.html',
  styleUrls: ['./add-calfdelivery.component.scss']
})
export class AddCalfdeliveryComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  addCalfDelivery: FormGroup;
  store = [];
  cow = [];
  entrydate = new Date();

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addCalfDelivery = new FormGroup({
      cow: new FormControl('', Validators.required),
      store: new FormControl('', Validators.required),
      gender: new FormControl('male', Validators.required),
      weight: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      entrydate: new FormControl(new Date(), Validators.required)
    })

    this.apiservice.listStores()
      .subscribe((data: any) => {
        this.store = data.stores;
      })
  }

  onStoreChange(value: string) {
    this.apiservice.listCow({ store: value })
      .subscribe((data: any) => {
        this.cow = data.cow;
      })
  }

  oncancel() {
    this.formGroupDirective.resetForm();
  }

  onSubmit(value) {
    if (this.addCalfDelivery.status == 'INVALID') {
      this.toastr.error('Enter valid data');
    }
    else {
      this.apiservice.addCalfDelivery(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
            this.router.navigateByUrl('view-calf-delivery');
          }
          else {
            this.toastr.error(data.message);
          }
        })
    }
  }

}
